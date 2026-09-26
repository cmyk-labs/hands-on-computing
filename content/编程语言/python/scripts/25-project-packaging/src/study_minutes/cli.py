"""所属章节：25-项目组织与打包
演示知识点：分发包的可调用命令入口，argparse 解析整数后直接汇总
运行命令：python -m study_minutes.cli 20 0 55（工作目录 content/编程语言/python）
期望结果：输出“合计：75 分钟”，退出状态 0
"""  # noqa: E501 -- 文件头保留完整运行命令。

import argparse

import study_minutes


def main(argv: list[str] | None = None) -> int:
    """处理显式参数或进程参数；成功返回零，输入错误由 argparse 报告。"""
    # 1. 命令至少接收一个整数；库函数本身允许空列表。
    parser = argparse.ArgumentParser(description="累计学习分钟数")
    parser.add_argument("minutes", nargs="+", type=int, help="非负整数分钟数")
    arguments = parser.parse_args(argv)

    total = study_minutes.total_minutes(arguments.minutes)
    # 正文传入 20、0、55 时显示“合计：75 分钟”，随后退出状态为 0。
    print(f"合计：{total} 分钟")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
