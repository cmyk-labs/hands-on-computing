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
