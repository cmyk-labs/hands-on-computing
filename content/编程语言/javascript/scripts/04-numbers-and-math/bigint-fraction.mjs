// 所属章节：04-数值与数学运算
// 演示知识点：非整数 Number 不能直接转换为 BigInt
// 运行命令：node scripts/04-numbers-and-math/bigint-fraction.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 RangeError（cannot be converted to a BigInt）并以非零状态退出
console.log(BigInt(1.5));
// 预期错误：RangeError；cannot be converted to a BigInt because it is not an integer
