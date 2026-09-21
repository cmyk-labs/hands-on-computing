// 所属章节：04-数值与数学运算
// 演示知识点：BigInt 与 Number 不能直接相加，需先统一数值类型
// 运行命令：node scripts/04-numbers-and-math/mixed-numeric-types.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（Cannot mix BigInt and other types）并以非零状态退出
console.log(1n + 1);
// 预期错误：TypeError；Cannot mix BigInt and other types
