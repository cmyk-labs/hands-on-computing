// 所属章节：04-数值与数学运算
// 演示知识点：BigInt 除以零不会产生 Infinity
// 运行命令：node scripts/04-numbers-and-math/bigint-zero-division.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 RangeError（Division by zero）并以非零状态退出
console.log(1n / 0n);
// 预期错误：RangeError；Division by zero
