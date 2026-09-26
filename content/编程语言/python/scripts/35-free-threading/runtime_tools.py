"""所属章节：35-自由线程实践
演示知识点：下载并校验固定版本 NuGet 运行包、提取运行目录与实验子进程的启动和清理
运行命令：python -m pytest -q scripts/35-free-threading/tests/test_runtime_tools.py（工作目录 content/编程语言/python）
期望结果：2 项测试通过，解压检查使用内存归档、不联网
"""

import hashlib
import io
import json
import subprocess
import sys
import zipfile
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import urlopen


def extract_runtime(payload: bytes, expected_sha256: str, target: Path) -> Path:
    """核对固定版本包内容，只提取运行所需的 tools 目录。"""
    assert hashlib.sha256(payload).hexdigest() == expected_sha256
    with zipfile.ZipFile(io.BytesIO(payload)) as archive:
        members = [name for name in archive.namelist() if name.startswith("tools/")]
        archive.extractall(target, members=members)
    return target / "tools/python.exe"


@contextmanager
def temporary_runtimes() -> Iterator[dict[str, Path]]:
    """下载两个固定版本包，在 with 结束时清理解释器与所有运行文件。"""
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
        # 两个构建使用同一版本，各自展开到独立目录，不改变系统解释器配置。
        for label, (package, digest) in packages.items():
            url = (
                "https://api.nuget.org/v3-flatcontainer/"
                f"{package}/3.14.7/{package}.3.14.7.nupkg"
            )
            with urlopen(url, timeout=45) as response:
                payload = response.read()
            runtimes[label] = extract_runtime(payload, digest, root / label)
        # 调用方在 with 内启动实验；离开 with 后解释器文件一起清理。
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
    # 退出失败由 check=True 传播；诊断原样显示，不把警告等同于失败。
    # 无诊断时不显示文本；存在兼容警告时原样写入宿主 stderr。
    print(completed.stderr, end="", file=sys.stderr)
    return json.loads(completed.stdout)
