"""所属章节：30-综合工程实践
演示知识点：命令行参数、TOML 配置与日志级别的组合及优先级，失败时不输出残缺 JSON
运行命令：python -m study_file_report 输入文件（工作目录 content/编程语言/python）
期望结果：输出 JSON 统计结果；本章捕获的配置或文件错误输出诊断并以 1 退出，用法错误为 2
"""

import argparse
import json
import logging
import sys
import tomllib
from dataclasses import asdict
from pathlib import Path

from .core import analyze_batch


def load_options(path: Path | None) -> tuple[int, str]:
    """读取合法的可选配置，返回线程数与日志级别。"""
    if path is None:
        return 1, "WARNING"

    with path.open("rb") as stream:
        section = tomllib.load(stream)["analysis"]
    # 两个选项均可省略，缺省值属于配置选择，不检查假设中的非法输入。
    return section.get("workers", 1), section.get("log_level", "WARNING")


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    """解析命令行语法；None 表示读取实际命令行实参。"""
    parser = argparse.ArgumentParser(
        prog="study-file-report", description="统计 UTF-8 文本文件"
    )
    parser.add_argument("paths", nargs="+", type=Path, help="输入文件路径")
    parser.add_argument("--config", type=Path, help="TOML 配置文件")
    parser.add_argument("--workers", type=int, help="覆盖配置中的线程数")
    parser.add_argument(
        "--log-level",
        choices=("DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"),
        help="覆盖配置中的日志级别",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    """成功返回 0；可预期的配置或文件处理错误返回 1。"""
    arguments = parse_args(argv)

    # 1. 先读取配置，再应用显式命令行选项。
    try:
        workers, level = load_options(arguments.config)
        if arguments.workers is not None:
            workers = arguments.workers
        if arguments.log_level is not None:
            level = arguments.log_level
    except (OSError, ValueError) as error:
        # stderr 以“配置错误：”开头并附具体原因；stdout 保持为空。
        print(f"配置错误：{error}", file=sys.stderr)
        return 1

    # 2. 只配置本工具的 logger；退出时恢复，避免重复调用累计处理器。
    logger = logging.getLogger("study_file_report.cli")
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))
    old_level, old_propagate = logger.level, logger.propagate
    logger.setLevel(level)
    logger.propagate = False
    logger.addHandler(handler)
    try:
        try:
            results = analyze_batch(arguments.paths, workers=workers)
        except (OSError, ValueError) as error:
            # stderr 以“分析失败：”开头；失败时不输出部分 JSON 结果。
            print(f"分析失败：{error}", file=sys.stderr)
            return 1
        # INFO 级别下显示完成文件数与线程数；默认 WARNING 级别不显示。
        logger.info("完成 %d 个文件，workers=%d", len(results), workers)

        # 3. 全部成功后才输出一个完整 JSON 值，日志只进入标准错误流。
        # JSON 列表保持输入次序，每项含 path、lines、words、characters。
        print(
            json.dumps([asdict(item) for item in results], ensure_ascii=False)
        )
        return 0
    finally:
        logger.removeHandler(handler)
        handler.close()
        logger.setLevel(old_level)
        logger.propagate = old_propagate
