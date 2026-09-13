import assert from "node:assert/strict";
const buffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const counts = new Int32Array(buffer);
const alias = new Int32Array(buffer);
assert.equal(Atomics.store(counts, 0, 5), 5);
assert.equal(Atomics.add(counts, 0, 2), 5);
assert.equal(Atomics.load(alias, 0), 7);
assert.equal(Atomics.compareExchange(counts, 0, 7, 10), 7);
assert.equal(Atomics.compareExchange(counts, 0, 7, 99), 10);
console.log("shared atomic value", Atomics.load(alias, 0)); // → shared atomic value 10
