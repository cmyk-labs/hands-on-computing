"""在独立 Python 子进程中运行教学测试并检查实际报告。"""

import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile


def run_pytest(
    targets: list[str],
    expected_passed: int,
    expected_failed: int = 0,
) -> str:
    """运行指定测试，精确检查退出状态及末行通过和失败数量。"""
    # 1. 只在子进程中调整测试运行条件，保留其余环境。
    lesson_dir = Path(__file__).resolve().parent
    environment = os.environ.copy()
    environment["PYTHONDONTWRITEBYTECODE"] = "1"
    environment["PYTHONIOENCODING"] = "utf-8"
    environment["PYTEST_DISABLE_PLUGIN_AUTOLOAD"] = "1"
    environment["PYTEST_ADDOPTS"] = ""
    environment.pop("PYTEST_PLUGINS", None)

    # 2. 每次使用私有测试配置和临时文件位置，退出后统一清理。
    with tempfile.TemporaryDirectory() as folder:
        runtime = Path(folder)
        config_path = runtime / "pytest.ini"
        config_path.write_text("[pytest]\n", encoding="utf-8")
        result = subprocess.run(
            [
                sys.executable, "-B", "-m", "pytest", "-q",
                "-p", "no:cacheprovider", "--color=no", "--tb=short",
                "-c", str(config_path), "--rootdir", str(lesson_dir),
                "--basetemp", str(runtime / "pytest-tmp"), *targets,
            ],
            cwd=lesson_dir,
            env=environment,
            shell=False,
            capture_output=True,
            encoding="utf-8",
            check=False,
            timeout=30,
        )

    # 3. 预期失败只能接受状态 1 和约定数量，其他错误均阻止继续。
    expected_status = 1 if expected_failed else 0
    output = result.stdout + result.stderr
    if result.returncode != expected_status:
        raise AssertionError(f"pytest 状态不符合约定：\n{output}")
    summary = result.stdout.strip().splitlines()[-1]
    counts = {
        status: int(count)
        for count, status in re.findall(r"(\d+) ([a-z]+)", summary)
    }
    expected = {}
    if expected_passed:
        expected["passed"] = expected_passed
    if expected_failed:
        expected["failed"] = expected_failed
    if counts != expected:
        raise AssertionError(f"pytest 测试数量不符合约定：\n{output}")
    return output
