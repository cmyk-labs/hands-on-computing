// 所属章节：24-自动化测试
// 演示知识点：正常值、空数组、参数化数据与原生 JSON 同步异常断言
// 运行命令：node --test scripts/24-testing/mean.test.mjs scripts/24-testing/async.test.mjs scripts/24-testing/isolation-a.test.mjs scripts/24-testing/isolation-b.test.mjs（工作目录 content/编程语言/javascript）
// 期望结果：四项同步测试全部通过
import test from "node:test";
import assert from "node:assert/strict";
import { mean } from "./mean.mjs";

// 第一组同时检查返回值和输入未被修改，避免只验证计算结果。
test("mean: values and no mutation", () => {
  const values = [-2, 0, 8];
  assert.equal(mean(values), 2);
  assert.deepEqual(values, [-2, 0, 8]);
});
test("mean: empty and singleton", () => {
  assert.equal(mean([]), null);
  assert.equal(mean([0]), 0);
});
// JSON.parse 本身产生同步异常，throws 接收尚未调用的函数。
test("parse: malformed JSON", () => {
  assert.throws(() => JSON.parse("{"), SyntaxError);
});
// 多组具体输入核对同一接口性质，不重复实现求平均的算法。
test("mean: matching values", () => {
  for (const value of [4, -4, 0.5]) {
    const values = [value, value];
    assert.equal(mean(values), value);
    assert.deepEqual(values, [value, value]);
  }
});
// → 四项测试通过；测试输入与断言说明预期行为，无须依赖输出耗时。
