"""每个测试获得独立的可变输入，互不依赖执行顺序。"""

import pytest

import study_records


@pytest.fixture
def minutes() -> list[int]:
    """为每个请求此夹具的测试创建新的学习记录。"""
    return [10, 20]


def test_append(minutes: list[int]) -> None:
    """增加记录只影响当前测试自己的输入。"""
    minutes.append(5)
    assert study_records.total_minutes(minutes) == 35


def test_original(minutes: list[int]) -> None:
    """另一测试仍从两条原始记录开始。"""
    assert minutes == [10, 20]
    assert study_records.total_minutes(minutes) == 30
