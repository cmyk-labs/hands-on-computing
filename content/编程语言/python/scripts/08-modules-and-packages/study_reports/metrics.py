"""所属章节：08-模块与包
演示知识点：包内纯计算模块，返回人数与平均分、不执行输入输出，空输入平均分为 None
运行命令：PYTHONPATH=scripts/08-modules-and-packages python -m study_reports 60 80 100（工作目录 content/编程语言/python）
期望结果：输出“成绩摘要：3 人，平均分 80.0”
"""


def summarize(scores):
    """返回人数和平均分；输入约定为数值序列，空输入平均分为 None。"""
    average = sum(scores) / len(scores) if scores else None
    return {"count": len(scores), "average": average}
