// 所属章节：09-对象与属性
// 演示知识点：同一描述符不能同时是数据属性和访问器属性
// 运行命令：node scripts/09-objects-and-properties/mixed-descriptor.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（Invalid property descriptor）并以非零状态退出
Object.defineProperty({}, "value", { value: 1, get() { return 2; } });
// 预期错误：TypeError；Invalid property descriptor
