// 所属章节：14-类与继承
// 演示知识点：实例字段各自独立、方法在原型上共享
// 运行命令：node scripts/14-classes/instances.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
class Course {
  notes = [];
  constructor(title) { this.title = title; }
  add(note) { this.notes.push(note); }
  describe() { return this.title + ":" + this.notes.length; }
}
const js = new Course("JS");
const ts = new Course("TS");
js.add("类");
console.log(js.describe(), ts.describe());
console.log(js.add === ts.add, js.notes === ts.notes);
console.log(Object.hasOwn(js, "notes"), Object.hasOwn(js, "add"));
console.log(Object.getPrototypeOf(js) === Course.prototype);

// 按本例输入运行，输出依次为：
// JS:1 TS:0
// true false
// true false
// true
