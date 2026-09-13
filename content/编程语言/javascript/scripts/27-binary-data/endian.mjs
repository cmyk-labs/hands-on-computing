import assert from "node:assert/strict";
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
view.setUint8(0, 0x7f);
view.setUint16(1, 0x1234, false);
view.setUint8(3, 1);
console.log([...new Uint8Array(buffer)].map((value) => value.toString(16).padStart(2, "0")).join(" "));
// → 7f 12 34 01
assert.equal(view.getUint16(1, false), 0x1234);
assert.equal(view.getUint16(1, true), 0x3412);
assert.throws(() => view.getUint32(1), RangeError);
console.log("big", view.getUint16(1), "little", view.getUint16(1, true)); // → big 4660 little 13330
