"""演示延后求值的标注与仅用于类型检查的导入。"""

from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from datetime import date


class Report:
    """保存报告创建日期；日期对象由调用方提供。"""

    def __init__(self, created: date) -> None:
        self.created = created
