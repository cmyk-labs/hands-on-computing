// 所属章节：10-数组与数据处理
// 演示知识点：with 只替换现有范围内的位置，不负责扩展数组
// 运行命令：node scripts/10-arrays-and-data-processing/with-out-of-range.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 RangeError（Invalid index）并以非零状态退出
console.log([1, 2].with(2, 3));
// 预期错误：RangeError；Invalid index
