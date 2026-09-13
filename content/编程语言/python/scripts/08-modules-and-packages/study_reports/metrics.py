"""计算成绩摘要，不执行输入输出。"""


def summarize(scores):
    """返回人数和平均分；输入约定为数值序列，空输入平均分为 None。"""
    average = sum(scores) / len(scores) if scores else None
    return {"count": len(scores), "average": average}
