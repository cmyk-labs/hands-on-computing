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
