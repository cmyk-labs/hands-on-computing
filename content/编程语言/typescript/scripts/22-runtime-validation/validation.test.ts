// 所属章节：22-外部数据与运行时校验
// 演示知识点：结构边界、业务边界与解析失败层次测试
// 运行命令：npm run run:22（工作目录 content/编程语言/typescript）
// 期望结果：node --test 全部通过
import test from "node:test";
import assert from "node:assert/strict";
import { isOrder, assertOrder, validOrder, parseOrder } from "./validation.js";
// 先看类型结构：字段名和字段类型满足 Order，不等于符合业务约定。
test("结构边界和断言", () => {
  for (const value of [null, [], 3, {}, { name: "a", quantity: "2" }]) {
    assert.equal(isOrder(value), false);
    assert.throws(() => assertOrder(value), { name: "TypeError", message: "order shape" });
  }
  assert.equal(isOrder({ name: "a", quantity: 1, extra: true }), true);
  // 数组和函数也可带同名属性；这里专门对照结构谓词与业务校验。
  for (const value of [Object.assign([], { name: "a", quantity: 1 }),
    Object.assign(() => {}, { quantity: 1 })]) {
    assert.equal(isOrder(value), true);
    assert.equal(validOrder(value), false);
  }
});
// 再固定结构，只改变数量范围或名字内容，定位业务规则的拒绝原因。
test("业务边界", () => {
  for (const quantity of [0, -1, 1.5, 101, NaN, Infinity]) {
    assert.equal(validOrder({ name: "a", quantity }), false);
  }
  for (const quantity of [1, 100]) assert.equal(validOrder({ name: "a", quantity }), true);
  assert.equal(validOrder({ name: " ", quantity: 1 }), false);
});
// 最后从 JSON 文本进入完整流程：语法、结构、业务依次失败。
test("解析的三个失败层次", () => {
  assert.deepEqual(parseOrder('{'), { ok: false, reason: "json" });
  assert.deepEqual(parseOrder('[]'), { ok: false, reason: "shape" });
  assert.deepEqual(parseOrder('{"name":"a","quantity":0}'), { ok: false, reason: "business" });
  assert.deepEqual(parseOrder('{"name":"a","quantity":1}'), { ok: true, value: { name: "a", quantity: 1 } });
});
