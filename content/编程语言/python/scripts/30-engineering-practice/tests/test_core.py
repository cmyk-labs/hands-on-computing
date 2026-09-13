"""检查文件分析的计数口径、失败边界和批处理顺序。"""

from pathlib import Path

import pytest


@pytest.mark.parametrize(
    ("text", "expected"),
    [
        ("", (0, 0, 0)),
        ("hello world\n", (1, 2, 12)),
        ("a\r\nb", (2, 2, 4)),
        ("a\rb\n", (2, 2, 4)),
        ("\n\n", (2, 0, 2)),
        ("中文 学习", (1, 2, 5)),
        ("a\tb", (1, 2, 3)),
        ("a\vb", (1, 2, 3)),
    ],
)
def test_file_counts(
    tmp_path: Path, text: str, expected: tuple[int, int, int]
) -> None:
    """拒绝把末尾换行算成额外空行，或把字符数当成字节数。"""
    from study_file_report.core import analyze_file

    path = tmp_path / "input.txt"
    path.write_bytes(text.encode("utf-8"))
    result = analyze_file(path)
    assert (result.lines, result.words, result.characters) == expected
    assert result.path == str(path)


def test_invalid_encoding_reports_path(tmp_path: Path) -> None:
    """错误编码不能被静默忽略，诊断必须定位输入文件。"""
    from study_file_report.core import analyze_file

    path = tmp_path / "bad.txt"
    path.write_bytes(b"\xff")
    with pytest.raises(ValueError, match="bad.txt") as caught:
        analyze_file(path)
    assert isinstance(caught.value.__cause__, UnicodeDecodeError)


def test_missing_file_propagates(tmp_path: Path) -> None:
    """不能把缺失文件伪装成空文件。"""
    from study_file_report.core import analyze_file

    with pytest.raises(FileNotFoundError):
        analyze_file(tmp_path / "missing.txt")


@pytest.mark.parametrize("workers", [1, 2])
def test_batch_preserves_order(tmp_path: Path, workers: int) -> None:
    """线程模式与顺序模式都保留输入顺序和重复输入。"""
    from study_file_report.core import analyze_batch

    first = tmp_path / "first.txt"
    second = tmp_path / "second.txt"
    first.write_text("one two", encoding="utf-8")
    second.write_text("three", encoding="utf-8")
    results = analyze_batch([second, first, second], workers=workers)
    assert [item.words for item in results] == [1, 2, 1]
    assert [item.path for item in results] == [
        str(second),
        str(first),
        str(second),
    ]


def test_batch_rejects_invalid_worker_count() -> None:
    """零线程必须被拒绝，不能落入另一种执行模式。"""
    from study_file_report.core import analyze_batch

    with pytest.raises(ValueError):
        analyze_batch([], workers=0)
