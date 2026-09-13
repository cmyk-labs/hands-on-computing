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
