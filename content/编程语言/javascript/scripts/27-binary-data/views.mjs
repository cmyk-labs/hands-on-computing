import assert from "node:assert/strict";
const buffer = new ArrayBuffer(8);
const bytes = new Uint8Array(buffer);
const tail = new Uint8Array(buffer, 2, 3);
tail[0] = 70;
assert.equal(bytes[2], 70);
console.log(tail.length, tail.byteLength, tail.byteOffset); // → 3 3 2
const shared = bytes.subarray(2, 4);
const copied = bytes.slice(2, 4);
shared[0] = 80;
assert.equal(bytes[2], 80);
assert.equal(copied[0], 70);
console.log("shared", bytes[2], "copied", copied[0]); // → shared 80 copied 70
console.log(new Uint8Array([257, -1]).join(",")); // → 1,255；按无符号 8 位转换
console.log(new Uint8ClampedArray([257, -1]).join(",")); // → 255,0；钳制到范围内
assert.equal(new Float16Array([1.5])[0], 1.5);
assert.equal(new BigInt64Array([12n])[0], 12n);
assert.throws(() => new BigInt64Array([12]), TypeError);
assert.throws(() => new Uint16Array(buffer, 1), RangeError);
console.log("numeric types and alignment checked"); // → numeric types and alignment checked
