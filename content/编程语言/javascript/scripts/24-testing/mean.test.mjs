// 所属章节：24-自动化测试
// 演示知识点：正常值、空数组、非法输入与求和溢出的断言
// 运行命令：node --test scripts/24-testing/mean.test.mjs scripts/24-testing/async.test.mjs scripts/24-testing/isolation-a.test.mjs scripts/24-testing/isolation-b.test.mjs（工作目录 content/编程语言/javascript）
// 期望结果：四项 mean 测试全部通过
import test from "node:test";
import assert from "node:assert/strict";
import { mean } from "./mean.mjs";

test("mean: values and no mutation", () => {
  const values = [-2, 0, 8];
  assert.equal(mean(values), 2);
  assert.deepEqual(values, [-2, 0, 8]);
});
test("mean: empty and singleton", () => {
  assert.equal(mean([]), null);
  assert.equal(mean([0]), 0);
});
test("mean: invalid inputs", () => {
  for (const value of [null, "[]", [NaN], [Infinity], ["2"], new Array(1)]) {
    assert.throws(() => mean(value), {
      name: "TypeError", message: "expected finite numbers",
    });
  }
});
test("mean: sum overflow", () => {
  for (const value of [Number.MAX_VALUE, -Number.MAX_VALUE]) {
    assert.throws(() => mean([value, value]), {
      name: "RangeError", message: "sum exceeds finite range",
    });
  }
});
// → 四项测试通过；测试输入与断言说明预期行为，无须依赖输出耗时。
