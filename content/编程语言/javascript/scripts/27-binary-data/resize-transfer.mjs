import assert from "node:assert/strict";
const buffer = new ArrayBuffer(4, { maxByteLength: 8 });
const tracking = new Uint8Array(buffer);
const fixed = new Uint8Array(buffer, 0, 4);
tracking.set([1, 2, 3, 4]);
buffer.resize(6);
assert.equal(tracking.length, 6);
assert.equal(fixed.length, 4);
assert.equal(tracking[5], 0);
buffer.resize(2);
assert.equal(fixed.length, 0);
assert.equal(tracking.length, 2);
buffer.resize(4);
assert.equal(fixed.length, 4);
console.log(tracking.join(",")); // → 1,2,0,0；被截断字节不会恢复
assert.throws(() => buffer.resize(9), RangeError);

const view = new DataView(buffer);
const moved = buffer.transferToFixedLength();
assert.equal(buffer.detached, true);
assert.equal(tracking.length, 0);
assert.throws(() => view.getUint8(0), TypeError);
assert.equal(moved.resizable, false);
console.log("moved", new Uint8Array(moved).join(",")); // → moved 1,2,0,0
const growable = new ArrayBuffer(2, { maxByteLength: 4 });
const transferred = growable.transfer();
assert.equal(transferred.resizable, true);
console.log("detached and resize policies checked"); // → detached and resize policies checked
