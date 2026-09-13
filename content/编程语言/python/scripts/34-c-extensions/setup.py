"""为 Windows 上的 CPython 3.12 声明 C 扩展。"""

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
