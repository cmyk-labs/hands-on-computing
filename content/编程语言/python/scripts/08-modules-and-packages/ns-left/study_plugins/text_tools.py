"""所属章节：08-模块与包
演示知识点：命名空间包左侧目录中的文本工具，与右侧目录共同组成同一个 study_plugins 包
运行命令：python -c "import sys; sys.path.extend(['scripts/08-modules-and-packages/ns-left', 'scripts/08-modules-and-packages/ns-right']); from study_plugins import text_tools; print(text_tools.words('Python modules'))"（工作目录 content/编程语言/python）
期望结果：输出 ['Python', 'modules']，子模块来自不同目录中的同一个命名空间包
"""


def words(text):
    """按空白拆分文本，返回词语列表。"""
    return text.split()
