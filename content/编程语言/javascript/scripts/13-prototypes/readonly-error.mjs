// 所属章节：13-原型与原型链
// 演示知识点：继承不可写属性的独立反例，赋值失败
// 运行命令：node scripts/13-prototypes/readonly-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 TypeError（Cannot assign to read only property 'id'）
const base = Object.create(null, { id: { value: 1, writable: false } });
const child = Object.create(base);
child.id = 2;

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot assign to read only property 'id'。
