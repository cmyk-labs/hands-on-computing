import assert from "node:assert/strict";
class Vault {
  #value = 7;
  read() { return this.#value; }
}
const vault = new Vault();
const proxy = new Proxy(vault, {});
assert.throws(() => proxy.read(), TypeError);
const read = vault.read.bind(vault);
assert.equal(read(), 7);

const map = new Map([["key", 9]]);
const wrappedMap = new Proxy(map, {});
assert.throws(() => wrappedMap.get("key"), TypeError);
assert.throws(() => wrappedMap.size, TypeError);
const access = { get: (key) => map.get(key) };
assert.equal(access.get("key"), 9);
console.log("private brand and Map receiver checked"); // → private brand and Map receiver checked
