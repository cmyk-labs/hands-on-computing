"""解析学习标签参数，并以退出状态区分参数错误和业务失败。"""

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
        print("生成标签失败：title 不能为空白", file=sys.stderr)
        return 1

    # 2. 参数已解析，按输出格式生成最终结果。
    labels = [args.title] * args.count
    if args.format == "json":
        print(json.dumps(labels, ensure_ascii=False))
    else:
        print("\n".join(labels))
    return 0


if __name__ == "__main__":
    sys.exit(main())
