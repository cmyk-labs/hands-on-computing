import test from "node:test";
import assert from "node:assert/strict";
import { isOrder, assertOrder, validOrder, parseOrder } from "./validation.js";
test("结构边界和断言", () => {
  for (const value of [null, [], 3, {}, { name: "a", quantity: "2" }]) {
    assert.equal(isOrder(value), false);
    assert.throws(() => assertOrder(value), { name: "TypeError", message: "order shape" });
  }
  assert.equal(isOrder({ name: "a", quantity: 1, extra: true }), true);
  for (const value of [Object.assign([], { name: "a", quantity: 1 }),
    Object.assign(() => {}, { quantity: 1 })]) {
    assert.equal(isOrder(value), true);
    assert.equal(validOrder(value), false);
  }
});
test("业务边界", () => {
  for (const quantity of [0, -1, 1.5, 101, NaN, Infinity]) {
    assert.equal(validOrder({ name: "a", quantity }), false);
  }
  for (const quantity of [1, 100]) assert.equal(validOrder({ name: "a", quantity }), true);
  assert.equal(validOrder({ name: " ", quantity: 1 }), false);
});
test("解析的三个失败层次", () => {
  assert.deepEqual(parseOrder('{'), { ok: false, reason: "json" });
  assert.deepEqual(parseOrder('[]'), { ok: false, reason: "shape" });
  assert.deepEqual(parseOrder('{"name":"a","quantity":0}'), { ok: false, reason: "business" });
  assert.deepEqual(parseOrder('{"name":"a","quantity":1}'), { ok: true, value: { name: "a", quantity: 1 } });
});
