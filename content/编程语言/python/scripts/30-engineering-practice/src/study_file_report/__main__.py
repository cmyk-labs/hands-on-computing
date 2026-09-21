"""所属章节：30-综合工程实践
演示知识点：包的 python -m 入口，转发到 cli.main 并把返回值传给退出状态
运行命令：PYTHONPATH=scripts/30-engineering-practice/src python -m study_file_report 输入文件（工作目录 content/编程语言/python）
期望结果：对 UTF-8 文本文件输出 JSON 统计结果，退出状态 0
"""

from .cli import main

if __name__ == "__main__":
    raise SystemExit(main())
