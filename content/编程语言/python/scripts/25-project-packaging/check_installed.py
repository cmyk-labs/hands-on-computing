"""所属章节：25-项目组织与打包
演示知识点：核对 wheel 安装位置、分发元数据、输入边界与 console_scripts 入口加载；<安装目录> 为 pip --target 安装本章 wheel 的目录
运行命令：PYTHONPATH=<安装目录> python scripts/25-project-packaging/check_installed.py <安装目录>（工作目录 content/编程语言/python）
期望结果：输出“安装位置、元数据、输入边界与入口加载均通过”
"""  # noqa: E501 -- 文件头保留完整运行命令。

import argparse
import contextlib
import importlib.metadata
import io
from pathlib import Path

import study_minutes


def main() -> None:
    """断言安装位置和公开行为，并加载实际登记的 console_scripts 入口。"""
    # 1. 安装检查由调用方提供目标目录，不能误用源码或其他已安装副本。
    parser = argparse.ArgumentParser(description="检查本章的临时 wheel 安装")
    parser.add_argument("target", type=Path)
    target = parser.parse_args().target.resolve()
    assert Path(study_minutes.__file__).resolve().is_relative_to(target)
    distribution = importlib.metadata.distribution("study-minutes-demo")
    assert Path(distribution.locate_file("")).resolve() == target
    assert distribution.version == "0.1.0"
    assert distribution.metadata["Requires-Python"] == ">=3.12"
    assert not distribution.requires

    # 2. 检查安装后最容易遗漏的零值、空输入与错误边界。
    assert study_minutes.total_minutes([20, 0, 55]) == 75
    assert study_minutes.total_minutes([]) == 0
    try:
        study_minutes.total_minutes([True])
    except TypeError as error:
        assert str(error) == "学习分钟数必须是整数"
    else:
        raise AssertionError("布尔值应被拒绝")
    try:
        study_minutes.total_minutes([-1])
    except ValueError as error:
        assert str(error) == "学习分钟数不能为负数"
    else:
        raise AssertionError("负分钟数应被拒绝")

    # 3. 使用安装元数据查到的入口，避免手写导入替代入口检查。
    (entry,) = distribution.entry_points.select(
        group="console_scripts", name="study-minutes"
    )
    assert entry.value == "study_minutes.cli:main"
    with contextlib.redirect_stdout(io.StringIO()) as captured:
        status = entry.load()(["20", "0", "55"])
    assert status == 0
    assert captured.getvalue() == "合计：75 分钟\n"
    # 前面的检查全部通过后显示这条确认；任一断言失败则不会到达此行。
    print("安装位置、元数据、输入边界与入口加载均通过")


if __name__ == "__main__":
    main()
