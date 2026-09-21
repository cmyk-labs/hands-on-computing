// 所属章节：13-原型与原型链
// 演示知识点：沿原型链查找属性、自有属性判断与 Object.create(null) 空原型
// 运行命令：node scripts/13-prototypes/lookup.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const base = { category: "课程", describe() { return this.title + ":" + this.category; } };
const note = Object.create(base);
note.title = "原型";
console.log(note.describe());
console.log(Object.getPrototypeOf(note) === base);
console.log(Object.hasOwn(note, "category"), "category" in note, note.missing);
console.log(Object.getPrototypeOf(Object.prototype) === null);
const dictionary = Object.create(null);
dictionary.topic = "继承";
console.log(Object.getPrototypeOf(dictionary), typeof dictionary.toString);

// 按本例输入运行，输出依次为：
// 原型:课程
// true
// false true undefined
// true
// null undefined
