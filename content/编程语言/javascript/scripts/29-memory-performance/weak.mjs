import assert from "node:assert/strict";
let target = { name: "preview" };
const reference = new WeakRef(target);
const token = {};
const cleanupMessages = [];
const registry = new FinalizationRegistry((heldValue) => cleanupMessages.push(heldValue));
registry.register(target, "preview entry", token);
assert.equal(reference.deref(), target);
assert.equal(registry.unregister(token), true);
assert.equal(registry.unregister(token), false);
target = null;
const current = reference.deref();
assert.equal(current.name, "preview");
assert.equal(cleanupMessages.length, 0);
assert.throws(() => new WeakRef(Symbol.for("registered")), TypeError);
console.log("deref same job and unregister checked"); // → deref same job and unregister checked
// 本例不等待最终清理回调；已撤销登记，不把 GC 调度当成成功条件。
