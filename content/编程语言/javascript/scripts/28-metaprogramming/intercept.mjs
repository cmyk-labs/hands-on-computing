import assert from "node:assert/strict";
const events = [];
const target = { count: 2, get doubled() { return this.count * 2; } };
const proxy = new Proxy(target, {
  get(object, key, receiver) {
    events.push(`get:${String(key)}`);
    return Reflect.get(object, key, receiver);
  },
  set(object, key, value, receiver) {
    if (key === "count" && (!Number.isInteger(value) || value < 0)) {
      throw new RangeError("count must be nonnegative integer");
    }
    return Reflect.set(object, key, value, receiver);
  },
});
proxy.count = 4;
assert.equal(proxy.doubled, 8);
console.log(events.join(",")); // → get:doubled,get:count；getter 的 this 是代理
assert.throws(() => { proxy.count = -1; }, /count must be nonnegative integer/);
assert.equal(target.count, 4);
assert.notEqual(proxy, target);
console.log("receiver and validation checked"); // → receiver and validation checked
