"""所属章节：25-项目组织与打包
演示知识点：src 布局包的求和接口，空列表返回 0，拒绝布尔值与负数
运行命令：PYTHONPATH=scripts/25-project-packaging/src python -c "import study_minutes; print(study_minutes.total_minutes([20, 0, 55]))"（工作目录 content/编程语言/python）
期望结果：输出 75
"""  # noqa: E501 -- 文件头保留完整运行命令。


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
