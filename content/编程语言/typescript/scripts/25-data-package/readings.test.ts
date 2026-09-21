// 所属章节：25-综合工程实践
// 演示知识点：有效、无效、稀疏输入与异步拒绝测试
// 运行命令：npm run run:25（工作目录 content/编程语言/typescript）
// 期望结果：node --test 全部通过
import test from "node:test";
import assert from "node:assert/strict";
import { isReading, parseReadings, mapValues, loadReadings } from "./package/src/index.js";
test("有效、空数组及规范化", () => {
  assert.deepEqual(parseReadings([]), { ok: true, value: [] });
  assert.deepEqual(parseReadings([{ sensor: " a ", value: 0, extra: true }]),
    { ok: true, value: [{ sensor: "a", value: 0 }] });
  assert.deepEqual(mapValues([{ value: 2 }], item => item.value * 2), [4]);
});
test("无效和稀疏输入", () => {
  for (const item of [Object.assign([], { sensor: "a", value: 1 }),
    Object.assign(() => {}, { sensor: "a", value: 1 }), { sensor: " ", value: NaN }]) {
    assert.equal(isReading(item), true);
    assert.equal(parseReadings([item]).ok, false);
  }
  for (const value of [null, {}, [null], Array(1), [{ sensor: "", value: 1 }],
    [{ sensor: "a", value: NaN }], [{ sensor: "a", value: Infinity }], [{ sensor: "a", value: "2" }]]) {
    assert.equal(parseReadings(value).ok, false);
  }
});
test("异步来源与任意拒绝值", async () => {
  assert.deepEqual(await loadReadings(async () => []), { ok: true, value: [] });
  assert.deepEqual(await loadReadings(async () => { throw new Error("离线"); }),
    { ok: false, code: "source", message: "离线" });
  assert.deepEqual(await loadReadings(async () => { throw "停止"; }),
    { ok: false, code: "source", message: "非 Error 异常" });
  assert.equal((await loadReadings(async () => [{}])).ok, false);
});
