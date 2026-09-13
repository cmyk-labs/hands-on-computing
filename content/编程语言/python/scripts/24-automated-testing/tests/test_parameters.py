"""对分钟数输入的有效边界和无效值分别参数化。"""

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
