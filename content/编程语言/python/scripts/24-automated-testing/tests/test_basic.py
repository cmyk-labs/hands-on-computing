"""所属章节：24-自动化测试
演示知识点：直接 assert 断言与 pytest.raises 精确异常断言检查公开行为
运行命令：python -m pytest -q tests/test_basic.py（工作目录 content/编程语言/python/scripts/24-automated-testing）
期望结果：2 项测试通过
"""

import pytest

import study_records


def test_total_minutes() -> None:
    """已知两次学习时间的合计应为 30 分钟。"""
    assert study_records.total_minutes([25, 5]) == 30


def test_sum_type_error() -> None:
    """错误元素类型产生原生求和异常，测试精确检查它。"""
    with pytest.raises(TypeError, match="unsupported operand") as error:
        study_records.total_minutes(["bad"])
    assert error.type is TypeError
