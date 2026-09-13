"""统计 UTF-8 文件，保持输入顺序并支持线程批处理。"""

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
