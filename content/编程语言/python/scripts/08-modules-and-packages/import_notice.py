"""所属章节：08-模块与包
演示知识点：教学反例，顶层 print 制造导入副作用，观察首次导入执行与 sys.modules 模块缓存
运行命令：PYTHONPATH=scripts/08-modules-and-packages python -c "import sys; import import_notice, import_notice as again; print(again is sys.modules['import_notice'])"（工作目录 content/编程语言/python）
期望结果：初始化文本只出现一次，随后输出 True，别名仍引用缓存中的同一模块
"""

# 这是教学反例：普通库模块不应在导入时无条件输出或启动业务。
print("初始化 import_notice")
