import assert from "node:assert/strict";
const marker = Symbol("marker");
const target = { visible: 1, [marker]: 2 };
Object.defineProperty(target, "hidden", { value: 3, enumerable: false, configurable: false });
const transparent = new Proxy(target, { ownKeys: Reflect.ownKeys });
assert.deepEqual(Object.keys(transparent), ["visible"]);
assert.equal(Reflect.ownKeys(transparent).length, 3);
assert.equal(Reflect.defineProperty(target, "hidden", { value: 4 }), false);
const hiding = new Proxy(target, { ownKeys() { return ["visible", marker]; } });
assert.throws(() => Reflect.ownKeys(hiding), TypeError);
console.log("keys descriptors invariants checked"); // → keys descriptors invariants checked
