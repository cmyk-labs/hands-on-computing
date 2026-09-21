// 所属章节：26-综合工程实践
// 演示知识点：并发读取输入、聚合失败原因并等待写出报告
// 运行命令：npm run demo:26（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，由 demo.mjs 调用后写出并读回 summary.json
import { readFile, writeFile } from "node:fs/promises";
import { summarizeRows, validateRows } from "./index.mjs";

export async function createReport(inputPaths, outputPath) {
  const results = await Promise.allSettled(inputPaths.map(async (path) => {
    try {
      const rows = JSON.parse(await readFile(path, "utf8"));
      if (!Array.isArray(rows)) throw new TypeError("file must contain an array");
      return validateRows(rows);
    } catch (cause) {
      throw new Error(`input ${path} failed`, { cause });
    }
  }));
  const errors = results.filter((item) => item.status === "rejected").map((item) => item.reason);
  if (errors.length > 0) throw new AggregateError(errors, "input files failed");
  const rows = results.flatMap((item) => item.value);
  const report = summarizeRows(rows);
  await writeFile(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8");
  return report;
}
