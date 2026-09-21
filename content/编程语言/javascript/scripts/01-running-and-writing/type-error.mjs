// 所属章节：01-运行与代码书写
// 演示知识点：把数值当函数调用引发 TypeError
// 运行命令：node scripts/01-running-and-writing/type-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError 并以非零状态退出
const score = 10;
score(); // TypeError：() 表示调用，但数值不是可调用的函数
