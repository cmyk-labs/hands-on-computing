"""所属章节：24-自动化测试
演示知识点：真实本地文件读取边界，跳过空行、保留读取与数值转换异常，供 mock 替换
运行命令：PYTHONPATH=scripts/24-automated-testing python -m pytest -q scripts/24-automated-testing/tests/test_files.py（工作目录 content/编程语言/python）
期望结果：4 项测试通过，覆盖空行跳过、缺失文件、完整输出与组合行为
"""

from pathlib import Path


def read_minutes(path: Path) -> list[int]:
    """读取非空行中的整数，保留文件读取和数值转换异常。"""
    text = path.read_text(encoding="utf-8")
    return [int(line) for line in text.splitlines() if line.strip()]
