// 所属章节：28-Proxy、Reflect 与元编程
// 演示知识点：ownKeys 枚举规则、Reflect.defineProperty 结果与列表不变量
// 运行命令：node scripts/28-metaprogramming/descriptors.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 keys descriptors invariants checked；违规 ownKeys 抛 TypeError
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
