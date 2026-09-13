"""校验学习分钟数并计算总量，提供可执行的文档示例。"""

import os


def total_minutes(minutes: list[int]) -> int:
    """汇总每条为 0 到 1440 的普通整数分钟数。

    >>> total_minutes([25, 5])
    30
    >>> total_minutes([])
    0
    """
    for value in minutes:
        if type(value) is not int or not 0 <= value <= 1440:
            raise ValueError("每条分钟数必须是 0 到 1440 的普通整数")
    return sum(minutes)


def read_daily_goal() -> int:
    """从环境变量读取正整数每日目标，缺失时使用 30 分钟。"""
    goal = int(os.getenv("NOTEBOOK_DAILY_GOAL", "30"))
    if goal <= 0:
        raise ValueError("每日目标必须大于 0")
    return goal
