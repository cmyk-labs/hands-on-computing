"""所属章节：33-插件机制
演示知识点：不可调用对象 not_a_function 与受控抛出 ValueError 的拒绝插件，观察宿主边界
运行命令：python -c "from study_formatters.bad import reject_text; reject_text('hello')"（工作目录 content/编程语言/python）
期望结果：抛出 ValueError：演示插件拒绝文本：'hello'
"""

not_a_function = 42


def reject_text(text: str) -> str:
    """明确拒绝本次输入，不伪造成功返回值。"""
    raise ValueError(f"演示插件拒绝文本：{text!r}")
