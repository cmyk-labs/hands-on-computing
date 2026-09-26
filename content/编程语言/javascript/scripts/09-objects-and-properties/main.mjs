// 所属章节：09-对象与属性
// 演示知识点：属性简写与动态键、访问器与描述符、原型查找、键序与枚举、解构展开与浅拷贝、seal/freeze、__proto__ 边界、structuredClone 与转移 ArrayBuffer
// 运行命令：node scripts/09-objects-and-properties/main.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各片段示例值，与行内注释一致
const title = "属性练习";
const dynamicKey = "unit-name";
const id = Symbol("id");
const lesson = {
  title,
  [dynamicKey]: "对象",
  2: "第二项",
  [id]: 17,
  describe() { return "一份课程记录"; },
};
console.log(lesson.title, lesson[dynamicKey], lesson[2] === lesson["2"]);
console.log(lesson[id], lesson.describe());
// 输出依次为：
// 属性练习 对象 true
// 17 一份课程记录

const record = { title: "初稿", pending: undefined };
record.title = "定稿";
record.pages = 4;
console.log(record.title, record.pages, record.missing);
console.log(Object.hasOwn(record, "pending"), Object.hasOwn(record, "missing"));
console.log(delete record.pages, delete record.absent, Object.hasOwn(record, "pages"));
// 输出依次为：
// 定稿 4 undefined
// true false
// true true false

const source = { title: "JS", count: undefined, note: null, nested: { level: 1 } };
const { title: name, count = 0, note = "默认", ...rest } = source;
const updated = { ...source, title: "JavaScript" };
console.log(name, count, note, Object.keys(rest).join(","));
console.log(updated.title, source.title, updated.nested === source.nested);
const inherited = Object.create({ mode: "继承值" });
const { mode } = inherited;
console.log(mode, Object.hasOwn({ ...inherited }, "mode"));
// 输出依次为：
// JS 0 null nested
// JavaScript JS true
// 继承值 false

let storedScore = 0;
const scoreCard = {
  get score() { return storedScore; },
  set score(value) {
    storedScore = value;
  },
};
scoreCard.score = 88;
console.log(scoreCard.score, storedScore);
const accessor = Object.getOwnPropertyDescriptor(scoreCard, "score");
console.log(typeof accessor.get, typeof accessor.set, Object.hasOwn(accessor, "value"));
// 输出依次为：
// 88 88
// function function false

const prototype = { role: "reader" };
const member = Object.create(prototype);
member.name = "Lin";
Object.defineProperty(member, "token", { value: "local", enumerable: false });
console.log(member.role, "role" in member, Object.hasOwn(member, "role"));
console.log(Object.keys(member).join(","), member.token, Object.hasOwn(member, "token"));
member.role = "editor";
console.log(member.role, prototype.role);
delete member.role;
console.log(member.role, Object.getPrototypeOf(member) === prototype);
// 输出依次为：
// reader true false
// name local true
// editor reader
// reader true

const locked = {};
Object.defineProperty(locked, "id", { value: 7 });
const lockedDescriptor = Object.getOwnPropertyDescriptor(locked, "id");
console.log(lockedDescriptor.value, lockedDescriptor.writable, lockedDescriptor.enumerable, lockedDescriptor.configurable);
const normal = { count: 1 };
const normalDescriptor = Object.getOwnPropertyDescriptor(normal, "count");
console.log(normalDescriptor.writable, normalDescriptor.enumerable, normalDescriptor.configurable);
Object.defineProperty(normal, "count", { configurable: false });
normal.count = 2;
Object.defineProperty(normal, "count", { writable: false });
console.log(normal.count, Object.getOwnPropertyDescriptor(normal, "count").writable);
// 输出依次为：
// 7 false false false
// true true true
// 2 false

const metaKey = Symbol("meta");
const metrics = { b: 2, 2: "two", 1: "one", a: 1, [metaKey]: "symbol" };
console.log(Object.keys(metrics).join(","));
console.log(Object.values(metrics).join(","));
const pairs = Object.entries(metrics);
console.log(pairs[0][0], pairs[0][1], Object.getOwnPropertySymbols(metrics).length);
const rebuilt = Object.fromEntries([["count", 1], ["count", 3], [metaKey, "kept"]]);
console.log(rebuilt.count, rebuilt[metaKey]);
// 输出依次为：
// 1,2,b,a
// one,two,2,1
// 1 one 1
// 3 kept

const original = { nested: { count: 1 } };
const shallow = Object.assign({}, original);
shallow.nested.count = 2;
console.log(shallow !== original, shallow.nested === original.nested, original.nested.count);
const isolated = { ...original, nested: { ...original.nested } };
isolated.nested.count = 9;
console.log(original.nested.count, isolated.nested.count);
let reads = 0;
let writes = 0;
const input = { get count() { reads += 1; return 5; } };
const target = { set count(value) { writes += value; } };
console.log(Object.assign(target, input) === target, reads, writes);
const copied = { ...input };
console.log(copied.count, reads, Object.hasOwn(Object.getOwnPropertyDescriptor(copied, "count"), "value"));
// 输出依次为：
// true true 2
// 2 9
// true 1 5
// 5 2 true

const sealed = { count: 1 };
Object.seal(sealed);
sealed.count = 2;
console.log(sealed.count, Object.isSealed(sealed), Object.isFrozen(sealed));
const frozen = { nested: { count: 1 } };
console.log(Object.freeze(frozen) === frozen);
frozen.nested.count = 3;
console.log(Object.isFrozen(frozen), Object.isFrozen(frozen.nested), frozen.nested.count);
let stored = 0;
const frozenAccessor = { get value() { return stored; }, set value(next) { stored = next; } };
Object.freeze(frozenAccessor);
frozenAccessor.value = 6;
console.log(frozenAccessor.value);
// 输出依次为：
// 2 true false
// true
// true false 3
// 6

const payload = { ["__proto__"]: { localFlag: true } };
const assigned = Object.assign({}, payload);
const spread = { ...payload };
console.log(assigned.localFlag, Object.hasOwn(assigned, "__proto__"));
console.log(Object.hasOwn(spread, "__proto__"), Object.getPrototypeOf(spread) === Object.prototype);
const dictionary = Object.create(null);
dictionary["__proto__"] = "普通数据";
console.log(dictionary["__proto__"], Object.getPrototypeOf(dictionary) === null);
const incoming = { title: "课程", ["__proto__"]: { localFlag: true } };
const accepted = Object.create(null);
for (const key of Object.keys(incoming)) {
  if (key === "title" && typeof incoming[key] === "string") accepted[key] = incoming[key];
}
console.log(Object.keys(accepted).join(","), Object.hasOwn(Object.prototype, "localFlag"));
// 输出依次为：
// true false
// true true
// 普通数据 true
// title false

const child = { score: 1 };
const graph = { left: child, right: child };
graph.self = graph;
const clone = structuredClone(graph);
clone.left.score = 9;
console.log(clone !== graph, clone.self === clone, clone.left === clone.right);
console.log(clone.left !== child, child.score, clone.right.score);
let cloneReads = 0;
const special = Object.create({ inherited: 1 });
Object.defineProperty(special, "score", { enumerable: true, get() { cloneReads += 1; return 8; } });
special[Symbol("hidden-key")] = 3;
const plain = structuredClone(special);
const plainDescriptor = Object.getOwnPropertyDescriptor(plain, "score");
console.log(cloneReads, plain.score, plainDescriptor.writable, Object.hasOwn(plainDescriptor, "get"));
console.log(Object.getPrototypeOf(plain) === Object.prototype, Object.hasOwn(plain, "inherited"), Object.getOwnPropertySymbols(plain).length);
// 输出依次为：
// true true true
// true 1 9
// 1 8 true false
// true false 0

const buffer = new ArrayBuffer(4);
const moved = structuredClone(buffer, { transfer: [buffer] });
console.log(buffer.byteLength, moved.byteLength);
// 输出依次为：
// 0 4
