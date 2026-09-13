"""提供把文本转为大写的正常插件。"""


def format_text(text: str) -> str:
    """返回大写文本，空字符串仍返回空字符串。"""
    return text.upper()
