// 所属章节：28-Proxy、Reflect 与元编程
// 演示知识点：Symbol.iterator、toStringTag、toPrimitive、hasInstance 协议的最小实现
// 运行命令：node scripts/28-metaprogramming/protocols.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 [object LessonRange]、12 cm 12 与 protocols checked
import assert from "node:assert/strict";
const range = {
  *[Symbol.iterator]() { yield 2; yield 3; },
  [Symbol.toStringTag]: "LessonRange",
};
assert.deepEqual([...range], [2, 3]);
console.log(Object.prototype.toString.call(range)); // → [object LessonRange]
const measure = {
  [Symbol.toPrimitive](hint) { return hint === "string" ? "12 cm" : 12; },
};
console.log(String(measure), +measure); // → 12 cm 12
class Even {
  static [Symbol.hasInstance](value) { return Number.isInteger(value) && value % 2 === 0; }
}
assert.equal(4 instanceof Even, true);
assert.equal(3 instanceof Even, false);
console.log("protocols checked"); // → protocols checked
