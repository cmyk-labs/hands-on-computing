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
