// 所属章节：08-作用域、闭包与高阶函数
// 演示知识点：var 绑定提前存在，不代表它已保存函数表达式的结果
// 运行命令：node scripts/08-scope-closures-and-higher-order-functions/expression-before-assignment.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（run is not a function）并以非零状态退出
run();
var run = function () { return 1; };
// 预期错误：TypeError；run is not a function
