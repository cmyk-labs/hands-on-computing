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
