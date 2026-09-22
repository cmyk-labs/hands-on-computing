"""所属章节：08-模块与包
演示知识点：成绩筛选函数与模块级阈值 threshold，演示模块导入、程序入口 __name__ 与直接运行的区别
运行命令：python scripts/08-modules-and-packages/core_tools.py（工作目录 content/编程语言/python）
期望结果：输出 [80, 90]，直接运行时入口 main 以默认阈值 60 筛选固定成绩
"""

threshold = 60


def passing_scores(scores, minimum=None):
    """返回达到分数线的成绩；省略分数线时读取模块中的 threshold。"""
    if minimum is None:
        minimum = threshold
    return [score for score in scores if score >= minimum]


def main():
    """输出一组固定成绩的筛选结果。"""
    # [80, 90]；直接运行文件才调用 main。
    print(passing_scores([50, 80, 90]))


if __name__ == "__main__":
    main()
