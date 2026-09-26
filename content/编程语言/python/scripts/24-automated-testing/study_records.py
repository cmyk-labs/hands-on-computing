"""所属章节：24-自动化测试
演示知识点：分钟数求和、环境变量读取及 doctest 可执行文档示例，作为本章被测公开行为
运行命令：python -c "import study_records; print(study_records.total_minutes([25, 5]))"（工作目录 content/编程语言/python/scripts/24-automated-testing）
期望结果：输出 30，空列表返回 0
"""

import os


def total_minutes(minutes: list[int]) -> int:
    """汇总每条为 0 到 1440 的普通整数分钟数。

    >>> total_minutes([25, 5])
    30
    >>> total_minutes([])
    0
    """
    return sum(minutes)


def read_daily_goal() -> int:
    """从环境变量读取正整数每日目标，缺失时使用 30 分钟。"""
    return int(os.getenv("NOTEBOOK_DAILY_GOAL", "30"))
