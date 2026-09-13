"""用直接断言和精确的异常断言检查公开行为。"""

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
