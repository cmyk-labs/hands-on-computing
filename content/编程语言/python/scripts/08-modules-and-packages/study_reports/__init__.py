"""所属章节：08-模块与包
演示知识点：常规包的公开入口，用相对导入导出 summarize 并以 __all__ 约定公开名称
运行命令：PYTHONPATH=scripts/08-modules-and-packages python -m study_reports 60 80 100（工作目录 content/编程语言/python）
期望结果：输出“成绩摘要：3 人，平均分 80.0”
"""

from .metrics import summarize

__all__ = ["summarize"]
