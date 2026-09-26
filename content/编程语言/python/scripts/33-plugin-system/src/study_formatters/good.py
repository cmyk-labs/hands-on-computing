"""所属章节：33-插件机制
演示知识点：遵守宿主字符串契约的正常插件，空字符串仍返回空字符串
运行命令：python -c "from study_formatters.good import format_text; print(format_text('Py插件'))"（工作目录 content/编程语言/python）
期望结果：输出 PY插件
"""


def format_text(text: str) -> str:
    """返回大写文本，空字符串仍返回空字符串。"""
    return text.upper()
