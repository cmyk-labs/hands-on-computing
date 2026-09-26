"""所属章节：33-插件机制
演示知识点：入口点插件的发现、名称冲突策略、加载与调用边界，PluginError 保留异常原因链
运行命令：python -m pytest -q scripts/33-plugin-system/test_plugin_host.py（工作目录 content/编程语言/python）
期望结果：10 项测试通过
"""

import importlib.metadata
from collections.abc import Callable, Iterable
from pathlib import Path

GROUP = "study_plugin_demo.formatters.v1"
type Formatter = Callable[[str], str]


class PluginError(RuntimeError):
    """插件元数据或已约定边界不满足宿主要求。"""


def index_entries(
    entries: Iterable[importlib.metadata.EntryPoint],
) -> dict[str, importlib.metadata.EntryPoint]:
    """校验本组记录，遇到重名立即拒绝，不加载任何插件。"""
    selected = {}
    for entry in entries:
        if entry.group != GROUP:
            continue

        # 冲突不能被字典赋值或发现顺序静默掩盖。
        if entry.name in selected:
            previous = selected[entry.name]
            raise PluginError(
                f"发现：重名 {entry.name!r}："
                f"{previous.value!r} 与 {entry.value!r}"
            )
        selected[entry.name] = entry
    return selected


def discover_plugins(
    target: Path,
) -> dict[str, importlib.metadata.EntryPoint]:
    """只查询目标目录中的本组入口，不加载插件。"""
    entries = []
    for distribution in importlib.metadata.distributions(path=[str(target)]):
        entries.extend(distribution.entry_points.select(group=GROUP))

    # 收集全部记录后统一检查冲突，调用者此后才选择并加载。
    return index_entries(entries)


def load_plugin(entry: importlib.metadata.EntryPoint) -> Formatter:
    """加载已经过发现校验的入口；保留导入错误的原因链。"""
    # 1. load 会导入模块；缺失的名称也可能是插件内部的依赖。
    try:
        candidate = entry.load()
    except ModuleNotFoundError as exc:
        missing = exc.name
        if missing and (
            entry.module == missing or entry.module.startswith(missing + ".")
        ):
            reason = "目标导入路径缺失"
        else:
            reason = "插件内部导入失败"
        raise PluginError(
            f"加载 {entry.name!r}：{reason}，缺失名称 {missing!r}"
        ) from exc
    except (ImportError, AttributeError) as exc:
        raise PluginError(f"加载 {entry.name!r}：{exc}") from exc

    # 2. 这只检查可调用性，不承诺参数签名或运行结果正确。
    if not callable(candidate):
        raise PluginError(f"加载 {entry.name!r}：入口对象不可调用")
    return candidate


def call_plugin(name: str, formatter: Formatter, text: str) -> str:
    """按单个位置参数调用；已知调用错误补充名称，其他错误传播。"""
    # 1. 只转换本例约定的参数或值错误，失败立即结束本次调用。
    try:
        result = formatter(text)
    except (TypeError, ValueError) as exc:
        raise PluginError(f"调用 {name!r}：{exc}") from exc

    # 2. 本节专门比较返回类型与类型标注，因此显式检查结果。
    if not isinstance(result, str):
        raise PluginError(f"调用 {name!r}：返回值必须是字符串")
    return result
