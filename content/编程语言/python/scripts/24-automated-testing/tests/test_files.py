"""在每个测试的临时目录中读取文件并检查真实输出。"""

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
