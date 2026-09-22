// 所属章节：26-综合工程实践
// 演示知识点：计算边界、单次读取属性边界与真实文件集成测试
// 运行命令：npm run test:26（工作目录 content/编程语言/javascript）
// 期望结果：七项测试全部通过
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, access, rm } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
import { summarizeRows, validateRows } from "./index.mjs";
import { createReport } from "./io.mjs";

// 1. 固定小数据观察过滤、同额排序和输入不变。
test("summary: groups filter sort and purity", () => {
  const rows = [
    { group: " b ", amountCents: 100, active: true },
    { group: "a", amountCents: 100, active: true },
    { group: "a", amountCents: 50, active: false },
  ];
  const before = JSON.stringify(rows);
  assert.deepEqual(summarizeRows(rows), [
    { group: "a", count: 1, totalCents: 100 },
    { group: "b", count: 1, totalCents: 100 },
  ]);
  assert.equal(JSON.stringify(rows), before);
  assert.notEqual(validateRows(rows)[0], rows[0]);
});
// 2. 空数组和零是有效值；结构、字段和金额范围分别验证。
test("summary: empty zero and invalid boundaries", () => {
  assert.deepEqual(summarizeRows([]), []);
  assert.equal(summarizeRows([{ group: "zero", amountCents: 0, active: true }])[0].totalCents, 0);
  assert.throws(() => summarizeRows(null), /rows must be an array/);
  assert.throws(() => summarizeRows(new Array(1)), /row 0: expected object/);
  const valid = { group: "a", amountCents: 10, active: true };
  for (const patch of [{ group: " " }, { amountCents: -1 }, { amountCents: NaN }, { active: "false" }]) {
    assert.throws(() => summarizeRows([{ ...valid, ...patch }]), TypeError);
  }
  assert.throws(() => summarizeRows([
    { ...valid, amountCents: Number.MAX_SAFE_INTEGER }, valid,
  ]), /group total exceeds safe integer/);
});
// 3. 访问器在多次读取时改变值，用来确认每个原始字段只读取一次。
for (const [field, laterValue] of [["group", ""], ["amountCents", -1], ["active", false]]) {
  test(`summary: read ${field} once`, () => {
    const row = { group: " a ", amountCents: 10, active: true };
    const firstValue = row[field];
    let reads = 0;
    Object.defineProperty(row, field, {
      get() { return ++reads <= (field === "amountCents" ? 2 : 1) ? firstValue : laterValue; },
    });
    assert.deepEqual(summarizeRows([row]), [{ group: "a", count: 1, totalCents: 10 }]);
    assert.equal(reads, 1);
  });
}

// 4. 临时文件测试真实 I/O；成功时读回，失败时确认没有创建报告。
test("report: real write and grouped failures", async () => {
  const root = import.meta.dirname;
  const directory = await mkdtemp(resolve(root, "js-c-test-"));
  try {
    const input = resolve(directory, "input.json");
    const output = resolve(directory, "output.json");
    await writeFile(input, '[{"group":"a","amountCents":20,"active":true}]', "utf8");
    assert.deepEqual(await createReport([input], output), [{ group: "a", count: 1, totalCents: 20 }]);
    assert.equal(JSON.parse(await readFile(output, "utf8"))[0].totalCents, 20);
    // 两个缺失文件同时失败，AggregateError 应保留两个原始 ENOENT。
    const absentOutput = resolve(directory, "absent.json");
    await assert.rejects(createReport([resolve(directory, "missing-a.json"), resolve(directory, "missing-b.json")], absentOutput), (error) => {
      assert.ok(error instanceof AggregateError);
      assert.equal(error.errors.length, 2);
      assert.ok(error.errors.every((item) => item.cause.code === "ENOENT"));
      return true;
    });
    await assert.rejects(access(absentOutput), { code: "ENOENT" });
    await writeFile(input, "{", "utf8");
    await assert.rejects(createReport([input], absentOutput), (error) => error.errors[0].cause instanceof SyntaxError);
    await writeFile(input, "{}", "utf8");
    await assert.rejects(createReport([input], absentOutput), (error) => error.errors[0].cause.message === "rows must be an array");
  } finally {
    const child = relative(root, directory);
    assert.ok(child.startsWith("js-c-test-") && !isAbsolute(child) && !child.includes(".."));
    await rm(directory, { recursive: true });
  }
});
// 5. 文件能解析但字段不合法时，也应一次汇总两个文件的原因。
test("report: collect field errors from both input files", async () => {
  const root = import.meta.dirname;
  const directory = await mkdtemp(resolve(root, "js-c-test-"));
  try {
    const inputs = [resolve(directory, "invalid-a.json"), resolve(directory, "invalid-b.json")];
    const output = resolve(directory, "absent.json");
    for (const input of inputs) {
      await writeFile(input, '[{"group":"a","amountCents":-1,"active":true}]', "utf8");
    }
    await assert.rejects(createReport(inputs, output), (error) => {
      assert.ok(error instanceof AggregateError);
      assert.equal(error.errors.length, 2);
      error.errors.forEach((item, index) => {
        assert.equal(item.message, `input ${inputs[index]} failed`);
        assert.ok(item.cause instanceof TypeError);
        assert.equal(item.cause.message, "row 0: amountCents must be nonnegative safe integer");
      });
      return true;
    });
    await assert.rejects(access(output), { code: "ENOENT" });
  } finally {
    const child = relative(root, directory);
    assert.ok(child.startsWith("js-c-test-") && !isAbsolute(child) && !child.includes(".."));
    await rm(directory, { recursive: true });
  }
});
// → 七项测试通过，包括属性读取边界、真实文件读写和没有残留输出的失败路径。
