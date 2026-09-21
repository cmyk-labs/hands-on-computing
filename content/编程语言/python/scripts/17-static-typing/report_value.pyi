"""所属章节：17-泛型与静态类型检查
演示知识点：类型声明文件，用省略号函数体声明 parse_count(text: str) -> int，mypy 优先于 .py 读取
运行命令：python -m mypy --python-version 3.12 --strict scripts/17-static-typing/report_client.py（工作目录 content/编程语言/python）
期望结果：调用方检查无诊断、退出状态 0，标注来自本 .pyi 而非未标注的 .py
"""


def parse_count(text: str) -> int:
    """把整数字符串转换为整数。"""
    ...
