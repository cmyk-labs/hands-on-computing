// 所属章节：21-JavaScript 迁移与 JSDoc
// 演示知识点：迁移前后复用的 node:test 行为测试
// 运行命令：npm run run:21（工作目录 content/编程语言/typescript）
// 期望结果：node --test 全部通过
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
