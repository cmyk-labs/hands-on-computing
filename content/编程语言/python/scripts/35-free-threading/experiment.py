"""所属章节：35-自由线程实践
演示知识点：CPython 3.14 下的 GIL 状态与 _csv 导入观察、丢失更新与锁、固定负载计时，完整对照由 runtime_tools 以 3.14 运行包启动
运行命令：PYTHONPATH=scripts/35-free-threading python -c "from experiment import square_total; print(square_total((0, 4)), square_total((3, 6)))"（工作目录 content/编程语言/python）
期望结果：输出 14 50，即 0²+1²+2²+3² 与 3²+4²+5²
"""

import argparse
import json
import sys
import sysconfig
import threading
from concurrent.futures import ThreadPoolExecutor
from time import perf_counter


def square_total(bounds: tuple[int, int]) -> int:
    """累计左闭右开非负整数区间内的平方，使用显式 Python 循环。"""
    start, stop = bounds
    if type(start) is not int or type(stop) is not int:
        raise ValueError("区间端点必须是普通整数")
    if not 0 <= start <= stop:
        raise ValueError("区间必须满足 0 <= start <= stop")
    total = 0
    for number in range(start, stop):
        total += number * number
    return total


def run_batch(bounds: list[tuple[int, int]], workers: int) -> list[int]:
    """按输入顺序返回每段平方和；workers=0 表示顺序调用。"""
    if type(workers) is not int or workers < 0:
        raise ValueError("workers 必须是非负普通整数")
    if workers == 0:
        return [square_total(item) for item in bounds]
    with ThreadPoolExecutor(max_workers=workers) as executor:
        return list(executor.map(square_total, bounds, timeout=30))


def compare_counters() -> dict[str, int]:
    """固定一次丢失更新，再比较同一业务操作使用锁时的结果。"""
    # 1. 两个任务都先读到零，再由屏障同时放行写回。
    counter = {"value": 0}
    barrier = threading.Barrier(2, timeout=5)

    def increment_unlocked() -> None:
        previous = counter["value"]
        barrier.wait()
        counter["value"] = previous + 1

    with ThreadPoolExecutor(max_workers=2) as executor:
        tasks = [executor.submit(increment_unlocked) for _ in range(2)]
        for task in tasks:
            task.result(timeout=10)
    unlocked = counter["value"]

    # 2. 会合仍在锁外，锁覆盖完整的读取、计算、写回。
    counter = {"value": 0}
    barrier = threading.Barrier(2, timeout=5)
    lock = threading.Lock()

    def increment_locked() -> None:
        barrier.wait()
        with lock:
            previous = counter["value"]
            counter["value"] = previous + 1

    with ThreadPoolExecutor(max_workers=2) as executor:
        tasks = [executor.submit(increment_locked) for _ in range(2)]
        for task in tasks:
            task.result(timeout=10)
    return {"unlocked": unlocked, "locked": counter["value"]}


def benchmark(items_per_job: int, repeats: int) -> dict[str, object]:
    """以固定八段区间比较顺序和线程调用，逐轮核对正确性。"""
    if type(items_per_job) is not int or items_per_job <= 0:
        raise ValueError("items_per_job 必须是正整数")
    if type(repeats) is not int or repeats <= 0:
        raise ValueError("repeats 必须是正整数")

    # 1. 在计时前准备八段输入和独立的平方和公式。
    bounds = [
        (index * items_per_job, (index + 1) * items_per_job)
        for index in range(8)
    ]
    length = 8 * items_per_job
    expected = length * (length - 1) * (2 * length - 1) // 6
    expected_parts = []
    for start, stop in bounds:
        upper = stop * (stop - 1) * (2 * stop - 1) // 6
        lower = start * (start - 1) * (2 * start - 1) // 6
        expected_parts.append(upper - lower)

    # 2. 先执行各路径作预热；每轮包含创建和关闭线程池的成本。
    rows = [{"workers": workers, "seconds": []} for workers in (0, 1, 2, 4)]
    for row in rows:
        if run_batch(bounds, row["workers"]) != expected_parts:
            raise AssertionError("预热结果与平方和公式不一致")
    for _ in range(repeats):
        for row in rows:
            started = perf_counter()
            values = run_batch(bounds, row["workers"])
            seconds = perf_counter() - started
            if values != expected_parts or sum(values) != expected:
                raise AssertionError("计时调用改变了完整计算结果")
            row["seconds"].append(seconds)

    return {
        "jobs": 8,
        "items_per_job": items_per_job,
        "repeats": repeats,
        "expected": expected,
        "rows": rows,
    }


def observe_build_and_extension() -> dict[str, object]:
    """观察构建能力、真实 GIL 状态与导入标准库 C 扩展后的状态。"""
    if sys.version_info[:2] != (3, 14):
        raise RuntimeError("构建对照需要本章指定的 CPython 3.14")
    before_import = sys._is_gil_enabled()
    was_loaded = "_csv" in sys.modules
    import csv

    parsed = list(csv.reader(["name,minutes", "python,30"]))
    if parsed != [["name", "minutes"], ["python", "30"]]:
        raise AssertionError("CSV 读取结果不符合约定")
    return {
        "version": ".".join(str(value) for value in sys.version_info[:3]),
        "free_threaded_build": sysconfig.get_config_var("Py_GIL_DISABLED") == 1,
        "gil_before_csv": before_import,
        "csv_was_loaded": was_loaded,
        "gil_after_csv": sys._is_gil_enabled(),
        "csv_rows": parsed,
    }


def main() -> None:
    """按命令选定观察内容，向标准输出写出真实 JSON 结果。"""
    parser = argparse.ArgumentParser(description="自由线程的有限对照实验")
    parser.add_argument(
        "--scenario",
        choices=("state", "counter", "benchmark", "all"),
        default="all",
    )
    parser.add_argument("--items-per-job", type=int, default=100000)
    parser.add_argument("--repeats", type=int, default=3)
    arguments = parser.parse_args()
    report = {"state": observe_build_and_extension()}
    if arguments.scenario in ("counter", "all"):
        report["counter"] = compare_counters()
    if arguments.scenario in ("benchmark", "all"):
        report["benchmark"] = benchmark(
            arguments.items_per_job, arguments.repeats
        )
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
