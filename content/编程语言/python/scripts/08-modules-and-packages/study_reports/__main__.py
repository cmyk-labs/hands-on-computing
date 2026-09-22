"""所属章节：08-模块与包
演示知识点：包的 python -m 入口，读取命令行实参并用 importlib.resources 读取包资源 labels.txt
运行命令：PYTHONPATH=scripts/08-modules-and-packages python -m study_reports 60 80 100（工作目录 content/编程语言/python）
期望结果：输出“成绩摘要：3 人，平均分 80.0”
"""

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
    # 传入 60、80、100 时为“成绩摘要：3 人，平均分 80.0”。
    print(f"{caption}：{summary['count']} 人，平均分 {summary['average']}")


if __name__ == "__main__":
    main()
