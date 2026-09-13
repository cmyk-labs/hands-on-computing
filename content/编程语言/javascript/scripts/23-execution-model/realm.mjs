import assert from "node:assert/strict";
import vm from "node:vm";
const foreign = vm.runInNewContext("[10, 20]");
assert.equal(foreign instanceof Array, false);
assert.equal(Array.isArray(foreign), true);
console.log(foreign instanceof Array, Array.isArray(foreign)); // → false true
