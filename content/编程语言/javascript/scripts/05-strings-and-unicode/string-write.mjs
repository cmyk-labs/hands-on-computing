// 所属章节：05-字符串与 Unicode
// 演示知识点：严格模式下给字符串索引赋值失败，不能修改原始字符串
// 运行命令：node scripts/05-strings-and-unicode/string-write.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（Cannot assign to read only property '0'）并以非零状态退出
const text = "abc";
text[0] = "A";
// 预期错误：TypeError；Cannot assign to read only property '0'
