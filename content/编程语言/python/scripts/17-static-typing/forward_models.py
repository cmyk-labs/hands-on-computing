"""所属章节：17-泛型与静态类型检查
演示知识点：from __future__ annotations 延后求值标注与 TYPE_CHECKING 下仅用于类型检查的导入
运行命令：python -m mypy --python-version 3.12 --strict scripts/17-static-typing/report_client.py scripts/17-static-typing/forward_models.py（工作目录 content/编程语言/python）
期望结果：两个文件均无类型错误诊断，退出状态 0
"""

from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from datetime import date


class Report:
    """保存报告创建日期；日期对象由调用方提供。"""

    def __init__(self, created: date) -> None:
        self.created = created
