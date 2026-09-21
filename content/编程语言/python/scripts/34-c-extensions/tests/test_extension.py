"""所属章节：34-C 扩展
演示知识点：安装后扩展的参数边界、异常传播、对象身份与弱引用回收检查
运行命令：PYTHONPATH=<扩展安装目录> python -m pytest -q scripts/34-c-extensions/tests/test_extension.py（工作目录 content/编程语言/python）
期望结果：27 项测试通过；<扩展安装目录> 为 pip --target 安装本章构建 wheel 的目录
"""

import importlib
import weakref

import pytest


class IndexValue:
    """提供整数索引协议，供两个参数解析格式检查。"""

    def __index__(self) -> int:
        return 1


class IntOnly:
    """只有 int 转换，不满足整数索引协议。"""

    def __int__(self) -> int:
        return 1


class Record:
    """可弱引用的普通对象，用于检查所有权。"""


@pytest.mark.parametrize(
    ("left", "right", "expected"),
    [(20, 55, 75), (0, 0, 0), (True, False, 1), (IndexValue(), 2, 3)],
)
def test_add_normal(left: object, right: object, expected: int) -> None:
    extension = importlib.import_module("study_c_api")
    assert extension.add_nonnegative(left, right) == expected


def test_add_nonnegative() -> None:
    """两个边界数相加必须在计算前接受检查。"""
    extension = importlib.import_module("study_c_api")
    limit = extension.LONG_MAX
    assert extension.add_nonnegative(limit, 0) == limit
    assert extension.add_nonnegative(limit - 1, 1) == limit
    for left, right in [(limit, 1), (1, limit), (limit, limit)]:
        with pytest.raises(OverflowError, match="sum exceeds C long"):
            extension.add_nonnegative(left, right)


@pytest.mark.parametrize("value", [1.0, "1", None, IntOnly()])
def test_add_bad_type(value: object) -> None:
    extension = importlib.import_module("study_c_api")
    with pytest.raises(TypeError):
        extension.add_nonnegative(value, 1)


@pytest.mark.parametrize("values", [(-1, 0), (0, -1)])
def test_add_negative(values: tuple[int, int]) -> None:
    extension = importlib.import_module("study_c_api")
    with pytest.raises(ValueError, match="must be nonnegative"):
        extension.add_nonnegative(*values)


@pytest.mark.parametrize("value", [10**100, -(10**100)])
def test_add_conversion_overflow(value: int) -> None:
    extension = importlib.import_module("study_c_api")
    with pytest.raises(OverflowError):
        extension.add_nonnegative(value, 0)


def test_argument_counts_and_keywords() -> None:
    extension = importlib.import_module("study_c_api")
    for function in (extension.add_nonnegative, extension.tuple_item):
        for arguments in [(), (1,), (1, 2, 3)]:
            with pytest.raises(TypeError):
                function(*arguments)
    with pytest.raises(TypeError):
        extension.add_nonnegative(left=1, right=2)
    with pytest.raises(TypeError):
        extension.tuple_item(items=(1,), index=0)


@pytest.mark.parametrize("index", [1, True, IndexValue()])
def test_tuple_identity(index: object) -> None:
    extension = importlib.import_module("study_c_api")
    value = []
    assert extension.tuple_item((None, value), index) is value
    assert extension.tuple_item((None,), 0) is None


@pytest.mark.parametrize("items,index", [((), 0), ((1,), -1), ((1,), 1)])
def test_tuple_bad_index(items: tuple[object, ...], index: int) -> None:
    extension = importlib.import_module("study_c_api")
    with pytest.raises(IndexError):
        extension.tuple_item(items, index)


@pytest.mark.parametrize("items", [[1], "a", None])
def test_tuple_required(items: object) -> None:
    extension = importlib.import_module("study_c_api")
    with pytest.raises(TypeError):
        extension.tuple_item(items, 0)


def test_tuple_index_conversion() -> None:
    extension = importlib.import_module("study_c_api")
    with pytest.raises(TypeError):
        extension.tuple_item((1,), 0.0)
    with pytest.raises(OverflowError):
        extension.tuple_item((1,), 10**100)


def test_index_protocol_error_propagates() -> None:
    class BrokenIndex:
        def __index__(self) -> int:
            raise ValueError("index conversion stopped")

    extension = importlib.import_module("study_c_api")
    with pytest.raises(ValueError, match="index conversion stopped"):
        extension.add_nonnegative(BrokenIndex(), 0)
    with pytest.raises(ValueError, match="index conversion stopped"):
        extension.tuple_item((1,), BrokenIndex())


def test_owned_result_survives_and_releases() -> None:
    """先删除原所有者，再释放返回值，检查悬空引用与引用泄漏。"""
    extension = importlib.import_module("study_c_api")
    for _ in range(5000):
        # 1. tuple_item 应为同一对象取得独立的强引用。
        record = Record()
        observer = weakref.ref(record)
        items = (record,)
        returned = extension.tuple_item(items, 0)
        assert returned is record
        del record, items
        assert observer() is returned

        # 2. 没有循环引用；普通对象在最后一个强引用释放后应被回收。
        del returned
        assert observer() is None


def test_errors_do_not_keep_items_alive() -> None:
    extension = importlib.import_module("study_c_api")
    for _ in range(1000):
        record = Record()
        observer = weakref.ref(record)
        items = (record,)
        with pytest.raises(IndexError):
            extension.tuple_item(items, 1)
        del items, record
        assert observer() is None
        assert extension.add_nonnegative(1, 2) == 3
