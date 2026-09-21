"""所属章节：08-模块与包
演示知识点：命名空间包右侧目录中的数值工具，与左侧目录共同组成同一个 study_plugins 包
运行命令：python -c "import sys; sys.path.extend(['scripts/08-modules-and-packages/ns-left', 'scripts/08-modules-and-packages/ns-right']); from study_plugins import number_tools; print(number_tools.double(3))"（工作目录 content/编程语言/python）
期望结果：输出 6，子模块来自不同目录中的同一个命名空间包
"""


def double(value):
    """返回数值的两倍。"""
    return value * 2
