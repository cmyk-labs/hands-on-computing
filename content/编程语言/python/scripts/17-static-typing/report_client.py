"""所属章节：17-泛型与静态类型检查
演示知识点：调用方使用模块的类型声明与运行时实现，静态检查读 .pyi，运行执行 .py
运行命令：python scripts/17-static-typing/report_client.py（工作目录 content/编程语言/python）
期望结果：输出 12
"""

from report_value import parse_count


count: int = parse_count("12")
print(count)  # 12：转换来自 .py 实现，类型声明来自 .pyi。
