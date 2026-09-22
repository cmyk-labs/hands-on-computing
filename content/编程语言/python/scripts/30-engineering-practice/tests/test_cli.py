"""所属章节：30-综合工程实践
演示知识点：CLI 成功输出、失败不输出残缺 JSON、配置优先级与无效配置边界的测试
运行命令：PYTHONPATH=scripts/30-engineering-practice/src python -m pytest -q scripts/30-engineering-practice/tests/test_cli.py（工作目录 content/编程语言/python）
期望结果：17 项测试通过
"""

import json
from pathlib import Path

import pytest


def test_default_json_result(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    """成功时只把完整 JSON 写到标准输出。"""
    from study_file_report.cli import main

    path = tmp_path / "notes.txt"
    path.write_bytes(b"one two\n")
    assert main([str(path)]) == 0
    captured = capsys.readouterr()
    assert json.loads(captured.out) == [
        {"path": str(path), "lines": 1, "words": 2, "characters": 8}
    ]
    assert captured.err == ""


@pytest.mark.parametrize(
    "level", ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
)
def test_failure_has_no_partial_json(
    tmp_path: Path, capsys: pytest.CaptureFixture[str], level: str
) -> None:
    """任一输入失败时保留诊断，不输出残缺的结果数组。"""
    from study_file_report.cli import main

    good = tmp_path / "good.txt"
    good.write_text("ok", encoding="utf-8")
    bad = tmp_path / "bad.txt"
    bad.write_bytes(b"\xff")
    assert (
        main([str(good), str(bad), "--workers", "2", "--log-level", level]) == 1
    )
    captured = capsys.readouterr()
    assert captured.out == ""
    assert "bad.txt" in captured.err


def test_cli_overrides_config(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    """显式 CLI 选项应覆盖合法配置，重复调用不累计日志处理器。"""
    from study_file_report.cli import main

    path = tmp_path / "notes.txt"
    path.write_text("one", encoding="utf-8")
    config = tmp_path / "settings.toml"
    config.write_text(
        '[analysis]\nworkers = 2\nlog_level = "ERROR"\n',
        encoding="utf-8",
    )
    # 文件给出 workers=2、ERROR；命令行明确覆盖为 1、INFO。
    arguments = [
        str(path),
        "--config",
        str(config),
        "--workers",
        "1",
        "--log-level",
        "INFO",
    ]
    # 连续调用两次，每次仍只有一条日志，说明处理器没有累积。
    for _ in range(2):
        assert main(arguments) == 0
        captured = capsys.readouterr()
        assert len(json.loads(captured.out)) == 1
        assert len(captured.err.splitlines()) == 1
        assert "workers=1" in captured.err


@pytest.mark.parametrize(
    "config_text",
    [
        "[analysis]\nworkers = 0",
        "[analysis]\nworkers = true",
        '[analysis]\nworkers = "2"',
        '[analysis]\nlog_level = "LOUD"',
        "[analysis]\nunrecognized = 1",
        "[unknown]\nworkers = 1",
        "analysis = 1",
        "[analysis",
    ],
)
def test_invalid_config(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
    config_text: str,
) -> None:
    """无效配置不能静默回退为默认值。"""
    from study_file_report.cli import main

    config = tmp_path / "settings.toml"
    config.write_text(config_text, encoding="utf-8")
    assert main(["unused.txt", "--config", str(config)]) == 1
    captured = capsys.readouterr()
    assert captured.out == ""
    assert captured.err


def test_invalid_cli_option_has_argparse_status(
    capsys: pytest.CaptureFixture[str],
) -> None:
    """参数解析错误与输入处理错误使用不同退出状态。"""
    from study_file_report.cli import main

    with pytest.raises(SystemExit) as caught:
        main(["notes.txt", "--workers", "many"])
    assert caught.value.code == 2
    assert capsys.readouterr().out == ""


def test_nonpositive_cli_workers(
    capsys: pytest.CaptureFixture[str],
) -> None:
    """整数语法合法仍需检查正数范围。"""
    from study_file_report.cli import main

    assert main(["unused.txt", "--workers", "0"]) == 1
    captured = capsys.readouterr()
    assert captured.out == ""
    assert captured.err
