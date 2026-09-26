"""所属章节：24-自动化测试
演示知识点：组合文件读取与求和生成汇总文本，并提供 CLI 最终输出函数
运行命令：python -m pytest -q tests/test_files.py（工作目录 content/编程语言/python/scripts/24-automated-testing）
期望结果：4 项测试通过，合计输出为“合计 30 分钟”且无标准错误
"""

from pathlib import Path

from record_io import read_minutes
import study_records


def report_from_file(path: Path) -> str:
    """读取文件并返回实际计算的学习总分钟数。"""
    minutes = read_minutes(path)
    total = study_records.total_minutes(minutes)
    return f"合计 {total} 分钟"


def print_total(minutes: list[int]) -> None:
    """向 CLI 的标准输出写入最终汇总结果。"""
    # 测试传入 [10, 20] 时完整 stdout 为“合计 30 分钟”加一个换行。
    print(f"合计 {study_records.total_minutes(minutes)} 分钟")
