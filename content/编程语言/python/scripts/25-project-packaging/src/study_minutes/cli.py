"""解析命令行输入并输出学习分钟数合计。"""

import argparse

import study_minutes


def main(argv: list[str] | None = None) -> int:
    """处理显式参数或进程参数；成功返回零，输入错误由 argparse 报告。"""
    # 1. 命令至少接收一个整数；库函数本身允许空列表。
    parser = argparse.ArgumentParser(description="累计学习分钟数")
    parser.add_argument("minutes", nargs="+", type=int, help="非负整数分钟数")
    arguments = parser.parse_args(argv)

    # 2. 把负值的业务错误转换为命令行用法错误和退出状态 2。
    try:
        total = study_minutes.total_minutes(arguments.minutes)
    except ValueError as error:
        parser.error(str(error))
    print(f"合计：{total} 分钟")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
