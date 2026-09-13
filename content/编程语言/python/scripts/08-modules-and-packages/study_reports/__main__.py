"""从命令行接收整数成绩并输出摘要。"""

import sys
from importlib.resources import files

from .metrics import summarize


def main():
    """读取整数实参；转换失败时保留原始错误，不修改输入文件。"""
    scores = [int(value) for value in sys.argv[1:]]
    summary = summarize(scores)
    caption = (
        files("study_reports")
        .joinpath("labels.txt")
        .read_text(encoding="utf-8")
        .strip()
    )
    print(f"{caption}：{summary['count']} 人，平均分 {summary['average']}")


if __name__ == "__main__":
    main()
