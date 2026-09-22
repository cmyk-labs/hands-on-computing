"""所属章节：25-项目组织与打包
演示知识点：命令行入口把库函数的业务错误转换为 argparse 用法错误与对应退出状态
运行命令：PYTHONPATH=scripts/25-project-packaging/src python -m study_minutes.cli 20 0 55（工作目录 content/编程语言/python）
期望结果：输出“合计：75 分钟”，退出状态 0；负数输入报 error 并以 2 退出
"""  # noqa: E501 -- 文件头保留完整运行命令。

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
    # 正文传入 20、0、55 时显示“合计：75 分钟”，随后退出状态为 0。
    print(f"合计：{total} 分钟")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
