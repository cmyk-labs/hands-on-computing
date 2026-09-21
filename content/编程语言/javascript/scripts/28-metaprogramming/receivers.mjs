// 所属章节：28-Proxy、Reflect 与元编程
// 演示知识点：类私有字段与 Map 内部槽对代理接收者的限制
// 运行命令：node scripts/28-metaprogramming/receivers.mjs（工作目录 content/编程语言/javascript）
// 期望结果：代理访问抛 TypeError，绑定原对象可用；输出 private brand and Map receiver checked
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
