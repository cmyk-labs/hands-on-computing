// 所属章节：09-对象与属性
// 演示知识点：只给 value 的新描述符默认不可写，严格模式下赋值失败
// 运行命令：node scripts/09-objects-and-properties/readonly-property.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（Cannot assign to read only property 'id'）并以非零状态退出
const record = {};
Object.defineProperty(record, "id", { value: 1 });
record.id = 2;
// 预期错误：TypeError；Cannot assign to read only property 'id'
