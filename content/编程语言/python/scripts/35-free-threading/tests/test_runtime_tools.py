"""所属章节：35-自由线程实践
演示知识点：固定运行包内容与仅提取 tools 目录的检查
运行命令：python -m pytest -q scripts/35-free-threading/tests/test_runtime_tools.py（工作目录 content/编程语言/python）
期望结果：2 项测试通过
"""

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

    # 归档中故意混入包元数据，检查提取结果只保留运行目录。
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
    with pytest.raises(AssertionError):
        extract_runtime(b"changed", "0" * 64, target)
    assert not target.exists()
