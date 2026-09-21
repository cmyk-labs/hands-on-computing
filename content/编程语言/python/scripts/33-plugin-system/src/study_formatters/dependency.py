"""所属章节：33-插件机制
演示知识点：顶层依赖不存在模块的反例插件，预期在加载阶段失败并保留 ModuleNotFoundError 原因
运行命令：PYTHONPATH=scripts/33-plugin-system/src python -c "import study_formatters.dependency"（工作目录 content/编程语言/python）
期望结果：抛出 ModuleNotFoundError: study_plugin_demo_intentionally_missing_dependency
"""

import importlib

# 这是刻意保留的导入失败反例，不是建议在插件模块顶层启动任务。
format_text = importlib.import_module(
    "study_plugin_demo_intentionally_missing_dependency"
).format_text
