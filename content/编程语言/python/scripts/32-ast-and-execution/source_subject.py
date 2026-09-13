"""提供可重复读取源码的学习时长计算函数。"""


def study_total(
    minutes: int,
    sessions: int,
    *,
    break_minutes: int = 5,
) -> int:
    """计算每次学习与休息合计后的总分钟数。"""
    return (minutes + break_minutes) * sessions
