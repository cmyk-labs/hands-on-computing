"""从本地 UTF-8 文件读取逐行整数分钟数。"""

from pathlib import Path


def read_minutes(path: Path) -> list[int]:
    """读取非空行中的整数，保留文件读取和数值转换异常。"""
    text = path.read_text(encoding="utf-8")
    return [int(line) for line in text.splitlines() if line.strip()]
