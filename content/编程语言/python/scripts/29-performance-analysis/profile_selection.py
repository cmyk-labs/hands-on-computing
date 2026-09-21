"""所属章节：29-性能分析与优化
演示知识点：cProfile 剖析固定筛选负载并用 pstats 按累计时间排序打印调用报告，不生成文件
运行命令：python scripts/29-performance-analysis/profile_selection.py（工作目录 content/编程语言/python）
期望结果：首行输出“选中总数：2400”，随后为调用次数与累计时间报告
"""

import cProfile
import pstats
import time


def select_with_list(
    request_ids: list[int], allowed_ids: list[int]
) -> list[int]:
    """筛选允许的整数编号，保留请求顺序及重复次数。"""
    return [
        request_id for request_id in request_ids if request_id in allowed_ids
    ]


def count_selected_batches(
    request_ids: list[int], allowed_ids: list[int], batches: int
) -> int:
    """重复筛选固定批次并返回选中的编号总数。"""
    total = 0
    for _ in range(batches):
        total += len(select_with_list(request_ids, allowed_ids))
    return total


def main() -> None:
    """准备输入，剖析三次筛选并输出按累计时间排序的报告。"""
    # 1. 输入准备不在剖析区间内，与 Notebook 的固定工作负载一致。
    request_ids = list(range(800)) * 2
    allowed_ids = list(range(400))

    # 2. 显式使用经过时间；runcall 返回后停止剖析。
    profiler = cProfile.Profile(timer=time.perf_counter)
    selected_count = profiler.runcall(
        count_selected_batches, request_ids, allowed_ids, 3
    )

    # 3. 打印结果用于核对调用次数与数据规模，不写入性能报告文件。
    print(f"选中总数：{selected_count}")
    report = pstats.Stats(profiler).strip_dirs()
    report.sort_stats(pstats.SortKey.CUMULATIVE).print_stats(6)


if __name__ == "__main__":
    main()
