// 所属章节：09-对象与属性
// 演示知识点：封闭对象不能新增属性，已有属性仍可写
// 运行命令：node scripts/09-objects-and-properties/sealed-addition.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（object is not extensible）并以非零状态退出
const record = Object.seal({ count: 1 });
record.extra = 2;
// 预期错误：TypeError；object is not extensible
