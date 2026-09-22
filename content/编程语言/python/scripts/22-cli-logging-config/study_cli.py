"""所属章节：22-命令行、日志与配置
演示知识点：argparse 位置参数、选项与默认值，以及退出状态约定：成功 0、业务失败 1、用法错误 2
运行命令：python scripts/22-cli-logging-config/study_cli.py Python 学习 --count 2 --format json（工作目录 content/编程语言/python）
期望结果：输出 ["Python 学习", "Python 学习"]，退出状态 0；--help 为 0，非法参数为 2，空白标题为 1
"""

import argparse
import json
import sys


def make_parser() -> argparse.ArgumentParser:
    """声明标签、重复次数和输出格式。"""
    parser = argparse.ArgumentParser(description="生成学习标签")
    parser.add_argument("title", help="标签文字")
    parser.add_argument("--count", type=int, choices=range(1, 4), default=1)
    parser.add_argument("--format", choices=("text", "json"), default="text")
    return parser


def main() -> int:
    """输出标签；空白标题返回 1，成功返回 0。"""
    # 1. argparse 接收真正的命令行参数，语法或取值错误退出为 2。
    args = make_parser().parse_args()
    if not args.title.strip():
        # 空白标题仅向 stderr 输出这条诊断，随后以状态 1 退出。
        print("生成标签失败：title 不能为空白", file=sys.stderr)
        return 1

    # 2. 参数已解析，按输出格式生成最终结果。
    labels = [args.title] * args.count
    if args.format == "json":
        # 标题“Python 学习”、count=2 时为 ["Python 学习", "Python 学习"]。
        print(json.dumps(labels, ensure_ascii=False))
    else:
        # text 格式每个标签占一行；count=2 时打印两行相同标题。
        print("\n".join(labels))
    return 0


if __name__ == "__main__":
    sys.exit(main())
