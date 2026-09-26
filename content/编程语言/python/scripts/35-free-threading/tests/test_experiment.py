"""所属章节：35-自由线程实践
演示知识点：区间与 workers 边界、固定交错计数、测量轮次完整性的测试
运行命令：python -m pytest -q scripts/35-free-threading/tests/test_experiment.py（工作目录 content/编程语言/python）
期望结果：12 项测试通过
"""

import pytest


@pytest.mark.parametrize(
    "bounds, expected",
    [((0, 0), 0), ((0, 4), 14), ((3, 6), 50), ((5, 6), 25)],
)
def test_square_total(bounds: tuple[int, int], expected: int) -> None:
    """区间为左闭右开，空区间返回零。"""
    from experiment import square_total

    assert square_total(bounds) == expected


@pytest.mark.parametrize("workers", [0, 1, 2, 4])
def test_batch_preserves_order_and_duplicates(workers: int) -> None:
    """顺序与线程执行使用相同的区间含义和结果顺序。"""
    from experiment import run_batch

    assert run_batch([(3, 6), (0, 0), (0, 4), (3, 6)], workers) == [
        50,
        0,
        14,
        50,
    ]


def test_negative_workers_rejected() -> None:
    """零专门表示顺序执行，负数不是另一种默认值。"""
    from experiment import run_batch

    with pytest.raises(ValueError):
        run_batch([(0, 3)], -1)


def test_worker_error_reaches_caller() -> None:
    """工作函数失败会在收集结果时传播。"""
    from experiment import run_batch

    with pytest.raises(TypeError):
        run_batch([(0, 2), (0, 2.5)], 2)


def test_counter_interleaving_and_lock() -> None:
    """固定交错展示丢失更新，完整临界区保留两次更新。"""
    from experiment import compare_counters

    assert compare_counters() == {"unlocked": 1, "locked": 2}


def test_measurement_contains_all_trials_and_correct_results() -> None:
    """每轮完成同一工作量，计时结果有限且非负。"""
    import math

    from experiment import benchmark

    report = benchmark(items_per_job=3, repeats=2)
    assert report["expected"] == 4324
    assert report["jobs"] == 8 and report["items_per_job"] == 3
    assert report["repeats"] == 2
    assert [item["workers"] for item in report["rows"]] == [0, 1, 2, 4]
    for row in report["rows"]:
        assert len(row["seconds"]) == 2
        assert all(
            math.isfinite(value) and value >= 0 for value in row["seconds"]
        )
