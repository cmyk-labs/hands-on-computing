"""提供成绩筛选函数，并演示模块被导入与直接运行的区别。"""

threshold = 60


def passing_scores(scores, minimum=None):
    """返回达到分数线的成绩；省略分数线时读取模块中的 threshold。"""
    if minimum is None:
        minimum = threshold
    return [score for score in scores if score >= minimum]


def main():
    """输出一组固定成绩的筛选结果。"""
    print(passing_scores([50, 80, 90]))


if __name__ == "__main__":
    main()
