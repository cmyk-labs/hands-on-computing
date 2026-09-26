"""所属章节：24-自动化测试
演示知识点：parametrize 对正常输入与原生异常反例分别参数化成独立用例
运行命令：python -m pytest -q tests/test_parameters.py（工作目录 content/编程语言/python/scripts/24-automated-testing）
期望结果：6 项测试通过（4 组正常输入与 2 组原生异常反例）
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


@pytest.mark.parametrize("value", ["bad", None])
def test_invalid_minutes(value: object) -> None:
    """字符串和 None 无法参与本例整数求和。"""
    with pytest.raises(TypeError) as error:
        study_records.total_minutes([value])
    assert error.type is TypeError
