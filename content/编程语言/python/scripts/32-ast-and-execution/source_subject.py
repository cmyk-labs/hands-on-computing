"""所属章节：32-AST 与动态执行
演示知识点：供 inspect 稳定读取签名与源码的学习时长函数，仅限关键字形参 break_minutes 默认 5
运行命令：python -c "import runpy; print(runpy.run_path('scripts/32-ast-and-execution/source_subject.py')['study_total'](25, 2, break_minutes=5))"（工作目录 content/编程语言/python）
期望结果：输出 60，即两次各含五分钟休息
"""


def study_total(
    minutes: int,
    sessions: int,
    *,
    break_minutes: int = 5,
) -> int:
    """计算每次学习与休息合计后的总分钟数。"""
    return (minutes + break_minutes) * sessions
