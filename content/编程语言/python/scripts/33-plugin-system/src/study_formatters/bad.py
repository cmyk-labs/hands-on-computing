"""提供不可调用对象与受控调用失败，用于观察宿主边界。"""

not_a_function = 42


def reject_text(text: str) -> str:
    """明确拒绝本次输入，不伪造成功返回值。"""
    raise ValueError(f"演示插件拒绝文本：{text!r}")
