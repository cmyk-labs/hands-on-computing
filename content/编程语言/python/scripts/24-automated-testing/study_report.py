"""生成汇总文本，并提供 CLI 的最终结果输出函数。"""

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
    print(f"合计 {study_records.total_minutes(minutes)} 分钟")
