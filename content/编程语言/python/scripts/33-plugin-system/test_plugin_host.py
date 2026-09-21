"""所属章节：33-插件机制
演示知识点：宿主名称与引用校验、重名拒绝、可调用性与调用契约的测试，入口记录为模拟数据
运行命令：python -m pytest -q scripts/33-plugin-system/test_plugin_host.py（工作目录 content/编程语言/python）
期望结果：17 项测试通过
"""

import importlib.metadata

import pytest

import plugin_host


@pytest.mark.parametrize("name", ["", "Upper", "two words", "-upper"])
def test_reject_invalid_names(name: str) -> None:
    """非法入口名不能进入可选插件表。"""
    entry = importlib.metadata.EntryPoint(
        name=name, value="math:sqrt", group=plugin_host.GROUP
    )
    with pytest.raises(plugin_host.PluginError, match="名称"):
        plugin_host.index_entries([entry])


@pytest.mark.parametrize("value", ["math", "math:", "math:sqrt [extra]"])
def test_reject_unsupported_references(value: str) -> None:
    """本宿主只接受没有 extras 的模块加属性引用。"""
    entry = importlib.metadata.EntryPoint(
        name="demo", value=value, group=plugin_host.GROUP
    )
    with pytest.raises(plugin_host.PluginError, match="引用"):
        plugin_host.index_entries([entry])


@pytest.mark.parametrize("reverse", [False, True])
def test_duplicate_name_never_silently_overwrites(reverse: bool) -> None:
    """冲突策略不能受发现顺序影响；这里只模拟两份入口记录。"""
    entries = [
        importlib.metadata.EntryPoint(
            name="same", value=value, group=plugin_host.GROUP
        )
        for value in ("math:sqrt", "math:ceil")
    ]
    if reverse:
        entries.reverse()
    with pytest.raises(plugin_host.PluginError, match="重名"):
        plugin_host.index_entries(entries)


def test_other_group_is_not_a_plugin() -> None:
    """其他接口组的同名入口不能混入当前宿主。"""
    entry = importlib.metadata.EntryPoint(
        name="upper", value="math:sqrt", group="another.formatters"
    )
    assert plugin_host.index_entries([entry]) == {}


def test_noncallable_object_is_rejected() -> None:
    """成功解析对象还不能证明它可调用。"""
    entry = importlib.metadata.EntryPoint(
        name="number", value="math:pi", group=plugin_host.GROUP
    )
    with pytest.raises(plugin_host.PluginError, match="不可调用"):
        plugin_host.load_plugin(entry)


def test_missing_attribute_keeps_cause() -> None:
    """宿主补充阶段信息时仍保留实际属性错误。"""
    entry = importlib.metadata.EntryPoint(
        name="missing", value="math:no_such_formatter", group=plugin_host.GROUP
    )
    with pytest.raises(plugin_host.PluginError, match="加载") as caught:
        plugin_host.load_plugin(entry)
    assert isinstance(caught.value.__cause__, AttributeError)


def test_wrong_signature_is_a_call_failure() -> None:
    """可调用检查不会检查所需位置参数的数量。"""

    def needs_two(text: str, suffix: str) -> str:
        return text + suffix

    assert callable(needs_two)
    with pytest.raises(plugin_host.PluginError, match="调用") as caught:
        plugin_host.call_plugin("two", needs_two, "hi")
    assert isinstance(caught.value.__cause__, TypeError)


def test_wrong_result_is_rejected() -> None:
    """非字符串结果不能作为已成功格式化的文本返回。"""
    with pytest.raises(plugin_host.PluginError, match="返回值"):
        plugin_host.call_plugin("length", len, "hello")


def test_unknown_failure_propagates() -> None:
    """未约定的内部错误保持原始类型并中止调用。"""

    def broken(text: str) -> str:
        raise LookupError(text)

    with pytest.raises(LookupError, match="hello"):
        plugin_host.call_plugin("broken", broken, "hello")


@pytest.mark.parametrize("text, expected", [("", ""), ("Py插件", "PY插件")])
def test_valid_callable_returns_text(text: str, expected: str) -> None:
    """正常文本及空文本均遵守宿主的字符串契约。"""
    assert plugin_host.call_plugin("upper", str.upper, text) == expected
