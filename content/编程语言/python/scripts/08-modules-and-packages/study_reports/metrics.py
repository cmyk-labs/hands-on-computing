"""所属章节：08-模块与包
演示知识点：包内纯计算模块，返回人数与平均分、不执行输入输出，输入约定为非空数值序列
运行命令：python -m study_reports 60 80 100（工作目录 content/编程语言/python/scripts/08-modules-and-packages）
期望结果：输出“成绩摘要：3 人，平均分 80.0”
"""


def summarize(scores):
    """返回人数和平均分；输入约定为非空数值序列。"""
    average = sum(scores) / len(scores)
    return {"count": len(scores), "average": average}
