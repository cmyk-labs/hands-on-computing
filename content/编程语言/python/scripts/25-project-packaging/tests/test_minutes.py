"""所属章节：25-项目组织与打包
演示知识点：源码树中运行包测试，检查求和公开行为、无效输入与 CLI 退出语义
运行命令：PYTHONPATH=scripts/25-project-packaging/src python -m pytest -q scripts/25-project-packaging/tests/test_minutes.py（工作目录 content/编程语言/python）
期望结果：12 项测试通过
"""  # noqa: E501 -- 文件头保留完整运行命令。

import pytest

import study_minutes
from study_minutes import cli


@pytest.mark.parametrize(
    ("sessions", "expected"),
    [([], 0), ([0], 0), ([20, 0, 55], 75)],
)
def test_total_minutes(sessions: list[int], expected: int) -> None:
    """检查空输入、零值和多次学习的累计结果。"""
    assert study_minutes.total_minutes(sessions) == expected


@pytest.mark.parametrize("invalid", [True, 1.5, "20"])
def test_reject_non_integer(invalid: object) -> None:
    """拒绝布尔值、浮点值和未解析文本。"""
    with pytest.raises(TypeError, match="学习分钟数必须是整数"):
        study_minutes.total_minutes([invalid])


def test_reject_negative() -> None:
    """拒绝负分钟数，而不是让它抵消其他学习记录。"""
    with pytest.raises(ValueError, match="学习分钟数不能为负数"):
        study_minutes.total_minutes([20, -1])


def test_cli_success(capsys: pytest.CaptureFixture[str]) -> None:
    """命令把合计写到标准输出，并返回成功状态。"""
    assert cli.main(["20", "0", "55"]) == 0
    captured = capsys.readouterr()
    assert captured.out == "合计：75 分钟\n"
    assert captured.err == ""


@pytest.mark.parametrize("arguments", [[], ["-1"], ["1.5"], ["abc"]])
def test_cli_invalid(
    arguments: list[str], capsys: pytest.CaptureFixture[str]
) -> None:
    """缺少输入、负数和非整数文本都产生用法错误。"""
    with pytest.raises(SystemExit) as error:
        cli.main(arguments)
    assert error.value.code == 2
    captured = capsys.readouterr()
    assert captured.out == ""
    assert "error:" in captured.err
