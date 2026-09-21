// 所属章节：12-this 与调用方式
// 演示知识点：new.target 分流、绑定函数的 new 调用与构造返回对象替换实例
// 运行命令：node scripts/12-this-and-calls/construct.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
function Entry(title) {
  if (!new.target) return "需要 new";
  this.title = title;
  this.target = new.target.name;
}
const unrelated = {};
const BoundEntry = Entry.bind(unrelated, "迭代");
const entry = new BoundEntry();
console.log(Entry("普通调用"));
console.log(entry.title, entry.target, entry instanceof Entry);
console.log(Object.hasOwn(unrelated, "title"));
function Replacement() { this.discarded = true; return { selected: true }; }
console.log(new Replacement().selected);

// 按本例输入运行，输出依次为：
// 需要 new
// 迭代 Entry true
// false
// true
