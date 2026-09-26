// 所属章节：28-Proxy、Reflect 与元编程
// 演示知识点：get/set 拦截、Reflect 转发默认语义与 receiver 传递
// 运行命令：node scripts/28-metaprogramming/intercept.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 set:count,get:doubled,get:count 与 receiver and forwarding checked
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
    // 记录写入，再保留默认赋值行为。
    events.push(`set:${String(key)}`);
    return Reflect.set(object, key, value, receiver);
  },
});
// 写入先经过 set；随后读 doubled 时，getter 又读取代理上的 count。
proxy.count = 4;
assert.equal(proxy.doubled, 8);
console.log(events.join(",")); // → set:count,get:doubled,get:count；getter 的 this 是代理
assert.equal(target.count, 4);
assert.notEqual(proxy, target);
console.log("receiver and forwarding checked"); // → receiver and forwarding checked
