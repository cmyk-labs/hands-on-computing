"""只替换文件读取边界，验证名称查找位置与接口签名。"""

from pathlib import Path
from unittest import mock

import pytest

import study_report


def test_patch_lookup(tmp_path: Path) -> None:
    """在使用方替换读取函数，同时保留真实求和与格式化。"""
    path = tmp_path / "unused.txt"
    original = study_report.read_minutes
    with mock.patch("study_report.read_minutes", autospec=True) as reader:
        reader.return_value = [12, 18]
        assert study_report.report_from_file(path) == "合计 30 分钟"
        reader.assert_called_once_with(path)
    assert study_report.read_minutes is original


def test_patch_definition_misses(tmp_path: Path) -> None:
    """替换定义方不改变使用方已经导入的名称。"""
    path = tmp_path / "minutes.txt"
    path.write_text("8\n", encoding="utf-8")
    with mock.patch("record_io.read_minutes", autospec=True) as reader:
        reader.return_value = [500]
        assert study_report.report_from_file(path) == "合计 8 分钟"
        reader.assert_not_called()


def test_autospec_signature() -> None:
    """省略必需路径参数时，替身也应拒绝错误的调用方式。"""
    with mock.patch("study_report.read_minutes", autospec=True) as reader:
        with pytest.raises(TypeError) as error:
            reader()
        assert error.type is TypeError
        reader.assert_not_called()


def test_read_error_propagates(tmp_path: Path) -> None:
    """文件读取失败不能变成看似有效的空报告。"""
    path = tmp_path / "unused.txt"
    with mock.patch("study_report.read_minutes", autospec=True) as reader:
        reader.side_effect = OSError("读取中断")
        with pytest.raises(OSError, match="^读取中断$") as error:
            study_report.report_from_file(path)
        assert error.type is OSError
        reader.assert_called_once_with(path)
