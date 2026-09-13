"""检查运行包解压的完整性与目标目录边界。"""

import hashlib
import io
import zipfile
from pathlib import Path

import pytest


def package_bytes(files: dict[str, bytes]) -> bytes:
    """用小型内存归档提供不执行的解压输入。"""
    stream = io.BytesIO()
    with zipfile.ZipFile(stream, "w") as archive:
        for name, content in files.items():
            archive.writestr(name, content)
    return stream.getvalue()


def test_extracts_only_expected_runtime_tree(tmp_path: Path) -> None:
    """保留运行文件内容，包元数据不进入可执行目录。"""
    from runtime_tools import extract_runtime

    payload = package_bytes(
        {
            "tools/python.exe": b"not executed",
            "tools/Lib/example.py": b"value = 3",
            "package.nuspec": b"metadata",
        }
    )
    target = tmp_path / "runtime"
    executable = extract_runtime(
        payload, hashlib.sha256(payload).hexdigest(), target
    )
    assert executable == target / "tools/python.exe"
    assert executable.read_bytes() == b"not executed"
    assert (target / "tools/Lib/example.py").read_bytes() == b"value = 3"
    assert not (target / "package.nuspec").exists()


def test_rejects_wrong_digest_before_writing(tmp_path: Path) -> None:
    """归档内容变化时停止，不创建运行目录。"""
    from runtime_tools import extract_runtime

    target = tmp_path / "runtime"
    with pytest.raises(ValueError, match="SHA-256"):
        extract_runtime(b"changed", "0" * 64, target)
    assert not target.exists()


@pytest.mark.parametrize(
    "member",
    [
        "tools/../../escape.txt",
        "tools/../escape.txt",
        "tools\\..\\escape.txt",
    ],
)
def test_rejects_noncanonical_paths(tmp_path: Path, member: str) -> None:
    """解压前检查全部条目，拒绝越界或有歧义的路径。"""
    from runtime_tools import extract_runtime

    payload = package_bytes(
        {"tools/python.exe": b"not executed", member: b"escape"}
    )
    target = tmp_path / "runtime"
    with pytest.raises(ValueError, match="路径"):
        extract_runtime(payload, hashlib.sha256(payload).hexdigest(), target)
    assert not target.exists()
    assert not (tmp_path / "escape.txt").exists()
