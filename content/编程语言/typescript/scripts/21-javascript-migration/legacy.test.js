import test from "node:test";
import assert from "node:assert/strict";
import { total, identity } from "./legacy.js";
test("旧行为：默认税率和指定税率", () => {
  assert.equal(total(10), 10);
  assert.equal(total(10, 0.1), 11);
  assert.equal(total(0, 0.1), 0);
});
test("泛型注释不改变引用身份", () => {
  const item = { id: 3 };
  assert.equal(identity(item), item);
});
