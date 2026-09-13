"""演示未内联标注、由同名 .pyi 提供类型信息的模块。"""


def parse_count(text):
    """把整数字符串转换为数量；无效文本抛出 ValueError。"""
    return int(text)
