// 所属章节：13-原型与原型链
// 演示知识点：原型上共享可变引用的边界、构造函数独立状态与组合行为
// 运行命令：node scripts/13-prototypes/sharing-and-composition.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
// 1. 原型上的数组被两个对象共享；在构造时创建则各自独立。
const sharedPrototype = { tags: [] };
const left = Object.create(sharedPrototype);
const right = Object.create(sharedPrototype);
left.tags.push("共享");
console.log(right.tags.join(","), left.tags === right.tags);
function Draft() { this.tags = []; }
const first = new Draft();
const second = new Draft();
first.tags.push("独立");
console.log(first.tags.length, second.tags.length);
// 2. 继承示例沿原型链查找 read，当前对象提供自己的 title。
const readerPrototype = { read() { return this.title; } };
const taggedPrototype = Object.create(readerPrototype);
taggedPrototype.label = function () { return "[" + this.read() + "]"; };
const tagged = Object.create(taggedPrototype);
tagged.title = "原型链";
console.log(tagged.label());
// 3. 组合示例把格式化函数作为能力传入，不增加原型层级。
function createReader(formatter) {
  return { title: "组合", read() { return formatter(this.title); } };
}
console.log(createReader(title => "[" + title + "]").read());

// 按本例输入运行，输出依次为：
// 共享 true
// 1 0
// [原型链]
// [组合]
