"""演示调用方使用模块的类型声明与运行时实现。"""

from report_value import parse_count


def main() -> None:
    """读取固定文本并输出转换结果。"""
    count: int = parse_count("12")
    print(count)


if __name__ == "__main__":
    main()
