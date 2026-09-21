// 所属章节：10-数组与数据处理
// 演示知识点：空数组 reduce 没有初始值，也没有可用作起点的第一个元素
// 运行命令：node scripts/10-arrays-and-data-processing/empty-reduce.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（Reduce of empty array with no initial value）并以非零状态退出
console.log([].reduce((sum, value) => sum + value));
// 预期错误：TypeError；Reduce of empty array with no initial value
