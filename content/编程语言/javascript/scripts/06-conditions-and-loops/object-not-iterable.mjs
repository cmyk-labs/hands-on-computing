// 所属章节：06-条件与循环
// 演示知识点：普通对象没有默认的值迭代协议，不能直接放到 for...of 右侧
// 运行命令：node scripts/06-conditions-and-loops/object-not-iterable.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（record is not iterable）并以非零状态退出
const record = { score: 90 };
for (const value of record) console.log(value);
// 预期错误：TypeError；record is not iterable
