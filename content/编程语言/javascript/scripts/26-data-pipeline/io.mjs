// 所属章节：26-综合工程实践
// 演示知识点：并发读取输入、聚合失败原因并等待写出报告
// 运行命令：npm run demo:26（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，由 demo.mjs 调用后写出并读回 summary.json
import { readFile, writeFile } from "node:fs/promises";
import { summarizeRows, validateRows } from "./index.mjs";

export async function createReport(inputPaths, outputPath) {
  // 1. 每个文件各自读取和校验；allSettled 用于一次收集多个文件的失败。
  const results = await Promise.allSettled(inputPaths.map(async (path) => {
    try {
      const rows = JSON.parse(await readFile(path, "utf8"));
      return validateRows(rows);
    } catch (cause) {
      // 添加文件路径作为上下文，cause 保留原始异常。
      throw new Error(`input ${path} failed`, { cause });
    }
  }));
  // 2. 有任何输入失败就停止写出，避免把不完整输入当作完整报告。
  const errors = results.filter((item) => item.status === "rejected").map((item) => item.reason);
  if (errors.length > 0) throw new AggregateError(errors, "input files failed");
  // 3. 全部输入成功后合并记录，再汇总并等待文件写入完成。
  const rows = results.flatMap((item) => item.value);
  const report = summarizeRows(rows);
  await writeFile(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8");
  return report;
}
