"""所属章节：24-自动化测试
演示知识点：tmp_path 临时文件与 capsys 捕获输出，检查真实文件读取到报告的组合行为
运行命令：PYTHONPATH=scripts/24-automated-testing python -m pytest -q scripts/24-automated-testing/tests/test_files.py（工作目录 content/编程语言/python）
期望结果：4 项测试通过
"""

from pathlib import Path

import pytest

import record_io
import study_report


def test_read_minutes(tmp_path: Path) -> None:
    """空行被跳过，其余分钟数按文件顺序读取。"""
    path = tmp_path / "minutes.txt"
    path.write_text("10\n\n20\n", encoding="utf-8")
    assert record_io.read_minutes(path) == [10, 20]


def test_missing_file(tmp_path: Path) -> None:
    """不存在的输入文件保留准确的文件异常。"""
    with pytest.raises(FileNotFoundError) as error:
        record_io.read_minutes(tmp_path / "missing.txt")
    assert error.type is FileNotFoundError


def test_print_total(capsys: pytest.CaptureFixture[str]) -> None:
    """检查完整正文、换行和没有错误输出的约定。"""
    study_report.print_total([10, 20])
    captured = capsys.readouterr()
    assert captured.out == "合计 30 分钟\n"
    assert captured.err == ""
    assert capsys.readouterr().out == ""


def test_report_integration(tmp_path: Path) -> None:
    """将真实文件读取、校验、求和和格式化连接起来检查。"""
    path = tmp_path / "minutes.txt"
    path.write_text("12\n18\n", encoding="utf-8")
    assert study_report.report_from_file(path) == "合计 30 分钟"
