"""提供非负整数学习分钟数的求和接口。"""


def total_minutes(sessions: list[int]) -> int:
    """累计每次学习的分钟数；空列表返回零，拒绝布尔值和负数。"""
    total = 0
    for minutes in sessions:
        if type(minutes) is not int:
            raise TypeError("学习分钟数必须是整数")
        if minutes < 0:
            raise ValueError("学习分钟数不能为负数")
        total += minutes
    return total
