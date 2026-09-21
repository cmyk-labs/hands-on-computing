"""所属章节：34-C 扩展
演示知识点：setuptools Extension 声明 study_c_api 扩展的源码与 /utf-8 编译参数
运行命令：python -m build --no-isolation --outdir <输出目录> scripts/34-c-extensions（工作目录 content/编程语言/python）
期望结果：生成含 study_c_api 扩展的 wheel 与 sdist；<输出目录> 为自选的构建产物目录
"""

import setuptools


def main() -> None:
    """构建后端调用此入口；不直接执行 setup.py 安装。"""
    setuptools.setup(
        ext_modules=[
            setuptools.Extension(
                "study_c_api",
                sources=["study_c_api.c"],
                extra_compile_args=["/utf-8"],
            )
        ]
    )


if __name__ == "__main__":
    main()
