"""发现指定目录中的可信文本插件，分开处理加载与调用。"""

import importlib.metadata
import re
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

        # 1. 本宿主主动收窄名称和引用格式，不覆盖整个入口点规范。
        if re.fullmatch(r"[a-z][a-z0-9-]*", entry.name) is None:
            raise PluginError(f"发现：非法名称 {entry.name!r}")
        parts = entry.value.split(":")
        valid_reference = len(parts) == 2
        for path in parts:
            if not all(part.isidentifier() for part in path.split(".")):
                valid_reference = False
                break
        if not valid_reference:
            raise PluginError(f"发现：不支持的引用 {entry.value!r}")

        # 2. 冲突不能被字典赋值或发现顺序静默掩盖。
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
    """只查询目标目录元数据；Name 和 Version 必须非空。"""
    if not target.is_dir():
        raise FileNotFoundError(f"插件安装目录不存在：{target}")
    entries = []
    for distribution in importlib.metadata.distributions(path=[str(target)]):
        # 1. 只检查提供本组入口的分发包，不导入被引用的模块。
        matching = distribution.entry_points.select(group=GROUP)
        if not matching:
            continue
        for field in ("Name", "Version"):
            if not distribution.metadata.get(field, "").strip():
                raise PluginError(f"发现：分发元数据缺少 {field}")
        entries.extend(matching)

    # 2. 收集全部记录后统一检查冲突，调用者此后才选择并加载。
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
    if not isinstance(text, str):
        raise TypeError("宿主输入必须是字符串")

    # 1. 只转换本例约定的参数或值错误，失败立即结束本次调用。
    try:
        result = formatter(text)
    except (TypeError, ValueError) as exc:
        raise PluginError(f"调用 {name!r}：{exc}") from exc

    # 2. 来自插件的结果是外部边界，类型标注不代替实际检查。
    if not isinstance(result, str):
        raise PluginError(f"调用 {name!r}：返回值必须是字符串")
    return result
