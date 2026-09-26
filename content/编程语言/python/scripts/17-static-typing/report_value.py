"""所属章节：17-泛型与静态类型检查
演示知识点：未内联标注的实现模块，运行时执行 .py，类型信息由同名 report_value.pyi 提供
运行命令：python -c "from report_value import parse_count; parse_count('many')"（工作目录 content/编程语言/python/scripts/17-static-typing）
期望结果：非零退出并报 ValueError: invalid literal for int()，.pyi 声明不替调用方校验文本
"""


def parse_count(text):
    """把整数字符串转换为数量；无效文本抛出 ValueError。"""
    return int(text)
