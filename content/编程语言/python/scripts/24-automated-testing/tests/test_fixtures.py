"""所属章节：24-自动化测试
演示知识点：fixture 为每个测试提供独立可变输入，互不依赖执行顺序
运行命令：PYTHONPATH=scripts/24-automated-testing python -m pytest -q scripts/24-automated-testing/tests/test_fixtures.py（工作目录 content/编程语言/python）
期望结果：2 项测试通过，test_original 不会读到 test_append 添加的 5
"""

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
