"""所属章节：30-综合工程实践
演示知识点：UTF-8 文件行数、词数与字符数统计口径、解码失败异常链与线程批处理保序
运行命令：PYTHONPATH=scripts/30-engineering-practice/src python -c "from io import StringIO; from study_file_report.core import summarize; print(summarize(StringIO('one two\nthree')))"（工作目录 content/编程语言/python）
期望结果：输出 (2, 3, 13)，即 2 行、3 词、13 字符（含换行）
"""

from collections.abc import Iterable, Sequence
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class FileStats:
    """记录路径、行数、空白分隔项数量及含换行的字符数。"""

    path: str
    lines: int
    words: int
    characters: int


def summarize(lines: Iterable[str]) -> tuple[int, int, int]:
    """消费文本行，返回行数、空白分隔项数量和字符数。"""
    line_count = word_count = character_count = 0
    for line in lines:
        line_count += 1
        word_count += len(line.split())
        character_count += len(line)
    return line_count, word_count, character_count


def analyze_file(path: Path) -> FileStats:
    """严格读取 UTF-8 文件；解码失败时补充路径并保留异常链。"""
    try:
        with path.open(encoding="utf-8", newline="") as stream:
            lines, words, characters = summarize(stream)
    except UnicodeDecodeError as error:
        raise ValueError(f"{path}: 输入不是 UTF-8 文本") from error
    return FileStats(str(path), lines, words, characters)


def analyze_batch(
    paths: Sequence[Path], *, workers: int = 1
) -> list[FileStats]:
    """按输入顺序分析文件；失败时传播异常，不返回部分结果。"""
    if workers < 1:
        raise ValueError("workers 必须大于零")
    if workers == 1:
        return [analyze_file(path) for path in paths]
    with ThreadPoolExecutor(max_workers=workers) as pool:
        return list(pool.map(analyze_file, paths))
