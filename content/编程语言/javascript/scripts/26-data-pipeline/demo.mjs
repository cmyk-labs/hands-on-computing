// 所属章节：26-综合工程实践
// 演示知识点：实际读写两份输入、比对汇总结果并清理临时目录
// 运行命令：npm run demo:26（工作目录 content/编程语言/javascript）
// 期望结果：输出汇总数组与 report written read back and cleaned
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
import { createReport } from "./io.mjs";

const temporaryRoot = import.meta.dirname;
const directory = await mkdtemp(resolve(temporaryRoot, "js-c-data-"));
try {
  const outputPath = resolve(directory, "summary.json");
  const report = await createReport([
    new URL("./data-a.json", import.meta.url),
    new URL("./data-b.json", import.meta.url),
  ], outputPath);
  const expected = [
    { group: "tools", count: 1, totalCents: 2500 },
    { group: "books", count: 2, totalCents: 2000 },
  ];
  assert.deepEqual(report, expected);
  assert.deepEqual(JSON.parse(await readFile(outputPath, "utf8")), expected);
  console.log(JSON.stringify(report)); // → tools 共 2500 分，books 共 2000 分且有两条记录
} finally {
  const child = relative(temporaryRoot, directory);
  assert.ok(child.startsWith("js-c-data-") && !isAbsolute(child) && !child.includes(".."));
  await rm(directory, { recursive: true });
}
console.log("report written read back and cleaned"); // → report written read back and cleaned
