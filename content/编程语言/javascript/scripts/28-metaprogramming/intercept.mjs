// 所属章节：28-Proxy、Reflect 与元编程
// 演示知识点：get/set 拦截、Reflect 转发默认语义与 receiver 传递
// 运行命令：node scripts/28-metaprogramming/intercept.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 get:doubled,get:count 与 receiver and validation checked
import assert from "node:assert/strict";
const events = [];
const target = { count: 2, get doubled() { return this.count * 2; } };
const proxy = new Proxy(target, {
  get(object, key, receiver) {
    events.push(`get:${String(key)}`);
    // 连同 receiver 一起转发，让 getter 中的 this 仍指向这次访问的接收者。
    return Reflect.get(object, key, receiver);
  },
  set(object, key, value, receiver) {
    // 这个分支就是 set 拦截的用途：只限制 count，其他属性照常转发。
    if (key === "count" && (!Number.isInteger(value) || value < 0)) {
      throw new RangeError("count must be nonnegative integer");
    }
    return Reflect.set(object, key, value, receiver);
  },
});
// 写入先经过 set；随后读 doubled 时，getter 又读取代理上的 count。
proxy.count = 4;
assert.equal(proxy.doubled, 8);
console.log(events.join(",")); // → get:doubled,get:count；getter 的 this 是代理
assert.throws(() => { proxy.count = -1; }, /count must be nonnegative integer/);
assert.equal(target.count, 4);
assert.notEqual(proxy, target);
console.log("receiver and validation checked"); // → receiver and validation checked
