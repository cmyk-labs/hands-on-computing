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
const readerPrototype = { read() { return this.title; } };
const taggedPrototype = Object.create(readerPrototype);
taggedPrototype.label = function () { return "[" + this.read() + "]"; };
const tagged = Object.create(taggedPrototype);
tagged.title = "原型链";
console.log(tagged.label());
function createReader(formatter) {
  return { title: "组合", read() { return formatter(this.title); } };
}
console.log(createReader(title => "[" + title + "]").read());

// 按本例输入运行，输出依次为：
// 共享 true
// 1 0
// [原型链]
// [组合]
