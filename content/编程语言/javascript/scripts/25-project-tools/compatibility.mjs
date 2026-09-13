import assert from "node:assert/strict";
function sortedCopy(values) {
  return [...values].sort((left, right) => left - right);
}
const input = [3, 1, 2];
assert.deepEqual(sortedCopy(input), input.toSorted((left, right) => left - right));
assert.deepEqual(input, [3, 1, 2]);
const localFactor = 3;
console.log(eval("localFactor * 2")); // → 6；这里只执行自己固定写出的代码
console.log(Function("return typeof localFactor")()); // → undefined
const operations = { double: (value) => value * 2 };
assert.equal(operations.double(5), 10);
console.log("compatibility checked"); // → compatibility checked
