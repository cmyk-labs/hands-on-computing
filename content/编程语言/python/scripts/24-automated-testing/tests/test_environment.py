"""隔离环境变量的默认、覆盖与无效输入。"""

import pytest

import study_records


def test_default_goal(monkeypatch: pytest.MonkeyPatch) -> None:
    """变量缺失时使用约定的 30 分钟。"""
    monkeypatch.delenv("NOTEBOOK_DAILY_GOAL", raising=False)
    assert study_records.read_daily_goal() == 30


def test_custom_goal(monkeypatch: pytest.MonkeyPatch) -> None:
    """环境变量提供的字符串会转换为目标分钟数。"""
    monkeypatch.setenv("NOTEBOOK_DAILY_GOAL", "45")
    assert study_records.read_daily_goal() == 45


@pytest.mark.parametrize("value", ["0", "-1", "bad", ""])
def test_invalid_goal(monkeypatch: pytest.MonkeyPatch, value: str) -> None:
    """已设置但无效的值不能静默回退到默认目标。"""
    monkeypatch.setenv("NOTEBOOK_DAILY_GOAL", value)
    with pytest.raises(ValueError) as error:
        study_records.read_daily_goal()
    assert error.type is ValueError


def test_restore_context(monkeypatch: pytest.MonkeyPatch) -> None:
    """局部替换退出后立即恢复，测试结束后再恢复外层替换。"""
    monkeypatch.setenv("NOTEBOOK_DAILY_GOAL", "30")
    with monkeypatch.context() as scoped:
        scoped.setenv("NOTEBOOK_DAILY_GOAL", "45")
        assert study_records.read_daily_goal() == 45
    assert study_records.read_daily_goal() == 30
