"""所属章节：24-自动化测试
演示知识点：parametrize 对有效边界和无效输入分别参数化成独立用例
运行命令：PYTHONPATH=scripts/24-automated-testing python -m pytest -q scripts/24-automated-testing/tests/test_parameters.py（工作目录 content/编程语言/python）
期望结果：8 项测试通过（4 组正常输入与 4 组拒绝输入）
"""

import pytest

import study_records


@pytest.mark.parametrize(
    "minutes, expected",
    [([], 0), ([0], 0), ([25, 5], 30), ([1440], 1440)],
    ids=["empty", "zero", "two-records", "upper-bound"],
)
def test_valid_minutes(minutes: list[int], expected: int) -> None:
    """每组输入与独立写出的业务期望对应。"""
    assert study_records.total_minutes(minutes) == expected


@pytest.mark.parametrize("value", [-1, 1441, True, "10"])
def test_invalid_minutes(value: object) -> None:
    """越界整数、布尔值和字符串均不是合法记录。"""
    with pytest.raises(ValueError) as error:
        study_records.total_minutes([value])
    assert error.type is ValueError
