"""所属章节：24-自动化测试
演示知识点：直接 assert 断言与 pytest.raises 精确异常断言检查公开行为
运行命令：PYTHONPATH=scripts/24-automated-testing python -m pytest -q scripts/24-automated-testing/tests/test_basic.py（工作目录 content/编程语言/python）
期望结果：2 项测试通过
"""

import pytest

import study_records


def test_total_minutes() -> None:
    """已知两次学习时间的合计应为 30 分钟。"""
    assert study_records.total_minutes([25, 5]) == 30


def test_rejects_negative() -> None:
    """负数记录必须在业务边界被拒绝。"""
    with pytest.raises(ValueError, match="0 到 1440") as error:
        study_records.total_minutes([-1])
    assert error.type is ValueError
