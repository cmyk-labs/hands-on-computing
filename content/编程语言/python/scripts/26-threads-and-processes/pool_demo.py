"""所属章节：26-线程与进程
演示知识点：spawn 进程池 map 保序提交、可序列化任务与 Future 业务异常回传
运行命令：python scripts/26-threads-and-processes/pool_demo.py（工作目录 content/编程语言/python）
期望结果：输出 {'totals': [5, 14, 30], 'error': 'ValueError'}
"""

import concurrent.futures
import json
import multiprocessing


def sum_squares(limit: int) -> int:
    """返回从 0 到 limit 之前各整数的平方和，拒绝负上界。"""
    if limit < 0:
        raise ValueError("平方和上界不能为负数")
    return sum(number * number for number in range(limit))


def main() -> None:
    """执行小型计算，并在退出进程池前取回所有结果。"""
    context = multiprocessing.get_context("spawn")
    with concurrent.futures.ProcessPoolExecutor(
        max_workers=2,
        mp_context=context,
    ) as executor:
        # 1. map 的结果顺序与输入顺序一致，不依赖进程完成顺序。
        totals = list(executor.map(sum_squares, [3, 4, 5], timeout=15))
        failed = executor.submit(sum_squares, -1)
        # 2. 业务异常在父进程读取 Future 时重新抛出。
        try:
            failed.result(timeout=15)
        except ValueError as error:
            error_name = type(error).__name__
        else:
            raise AssertionError("负上界没有按预期失败")
    # with 已等待工作进程并关闭池；不将这个小例子当作跑分。
    print(json.dumps({"totals": totals, "error": error_name}))


if __name__ == "__main__":
    main()
