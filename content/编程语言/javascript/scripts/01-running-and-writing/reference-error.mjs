// 所属章节：01-运行与代码书写
// 演示知识点：模块中给未声明名称赋值引发 ReferenceError
// 运行命令：node scripts/01-running-and-writing/reference-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 ReferenceError 并以非零状态退出
misspelledScore = 10; // ReferenceError：模块中给未声明的名称赋值
