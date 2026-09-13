"""故意依赖不存在的演示模块；这个入口预期在加载时失败。"""

import importlib

# 这是刻意保留的导入失败反例，不是建议在插件模块顶层启动任务。
format_text = importlib.import_module(
    "study_plugin_demo_intentionally_missing_dependency"
).format_text
