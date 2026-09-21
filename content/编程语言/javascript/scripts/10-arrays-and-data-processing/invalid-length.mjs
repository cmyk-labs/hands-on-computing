// 所属章节：10-数组与数据处理
// 演示知识点：Array 的 length 不能设置为负数或小数
// 运行命令：node scripts/10-arrays-and-data-processing/invalid-length.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 RangeError（Invalid array length）并以非零状态退出
const values = [];
values.length = 1.5;
// 预期错误：RangeError；Invalid array length
