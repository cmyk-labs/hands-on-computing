"""所属章节：35-自由线程实践
演示知识点：下载并校验固定版本 NuGet 运行包、受控解压与实验子进程的启动和清理
运行命令：PYTHONPATH=scripts/35-free-threading python -m pytest -q scripts/35-free-threading/tests/test_runtime_tools.py（工作目录 content/编程语言/python）
期望结果：5 项测试通过，解压检查使用内存归档、不联网
"""

import hashlib
import io
import json
import platform
import subprocess
import zipfile
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path, PurePosixPath
from tempfile import TemporaryDirectory
from urllib.request import urlopen


def extract_runtime(payload: bytes, expected_sha256: str, target: Path) -> Path:
    """核对下载内容并检查全部路径后，提取运行所需 tools 目录。"""
    if hashlib.sha256(payload).hexdigest() != expected_sha256:
        raise ValueError("运行包 SHA-256 与本章固定值不符")
    if target.exists():
        raise FileExistsError(f"运行目录必须尚不存在：{target}")
    target = target.resolve()
    with zipfile.ZipFile(io.BytesIO(payload)) as archive:
        members = []
        for member in archive.infolist():
            relative = PurePosixPath(member.filename)
            if (
                relative.is_absolute()
                or ".." in relative.parts
                or "\\" in member.filename
                or ":" in member.filename
            ):
                raise ValueError(f"运行包包含不允许的路径：{member.filename}")
            if relative.parts and relative.parts[0] == "tools":
                destination = (target / member.filename).resolve()
                if not destination.is_relative_to(target):
                    raise ValueError(f"运行包路径越界：{member.filename}")
                members.append(member)
        names = {member.filename for member in members}
        if "tools/python.exe" not in names:
            raise ValueError("运行包缺少 tools/python.exe")
        target.mkdir()
        archive.extractall(target, members=members)
    return target / "tools/python.exe"


@contextmanager
def temporary_runtimes() -> Iterator[dict[str, Path]]:
    """下载两个固定版本包，在 with 结束时清理解释器与所有运行文件。"""
    if platform.system() != "Windows" or platform.machine() != "AMD64":
        raise RuntimeError("本章运行包需要 Windows x64")
    packages = {
        "regular": (
            "python",
            "46a4da5529a92d18ff894911f6e6033a8253198d705b8161bf28c9123c87d46b",
        ),
        "free_threaded": (
            "python-freethreaded",
            "46b9421a69f36259e56b6375376208320b5701647ec1d158d8936b46be7d38ee",
        ),
    }
    with TemporaryDirectory(prefix="python35-") as directory:
        root = Path(directory)
        runtimes = {}
        for label, (package, digest) in packages.items():
            url = (
                "https://api.nuget.org/v3-flatcontainer/"
                f"{package}/3.14.7/{package}.3.14.7.nupkg"
            )
            with urlopen(url, timeout=45) as response:
                payload = response.read()
            runtimes[label] = extract_runtime(payload, digest, root / label)
        yield runtimes


def run_experiment(
    executable: Path,
    *,
    enable_gil: bool = False,
    scenario: str = "all",
    items_per_job: int = 100000,
    repeats: int = 3,
) -> dict[str, object]:
    """启动新解释器，收集有限实验的结果并检查退出状态。"""
    script = Path(__file__).with_name("experiment.py").resolve()
    # -I 忽略调用方的 Python 路径等环境配置；-S 不加载第三方 site 包。
    command = [str(executable), "-I", "-B", "-S", "-X", "utf8"]
    if enable_gil:
        command.extend(["-X", "gil=1"])
    command.extend(
        [
            str(script),
            "--scenario",
            scenario,
            "--items-per-job",
            str(items_per_job),
            "--repeats",
            str(repeats),
        ]
    )
    completed = subprocess.run(
        command,
        cwd=executable.parent,
        capture_output=True,
        encoding="utf-8",
        check=True,
        timeout=90,
    )
    if completed.stderr:
        raise RuntimeError(f"实验进程产生诊断：{completed.stderr}")
    return json.loads(completed.stdout)
