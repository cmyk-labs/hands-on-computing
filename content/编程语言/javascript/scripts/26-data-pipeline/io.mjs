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
