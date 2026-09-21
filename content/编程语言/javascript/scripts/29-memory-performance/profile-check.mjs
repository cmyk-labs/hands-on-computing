// 所属章节：29-内存管理与性能分析
// 演示知识点：真实采集 CPU profile、统计热点节点并删除临时文件
// 运行命令：node scripts/29-memory-performance/profile-check.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出前五个热点节点、CPU profile parsed 与 profile cleaned
import { rm } from "node:fs/promises";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { resolve, relative, isAbsolute } from "node:path";
import { summarizeSamples } from "./profile-summary.mjs";
const root = import.meta.dirname;
const directory = mkdtempSync(resolve(root, "js-c-profile-"));
try {
  const output = execFileSync(process.execPath, [
    "--cpu-prof", "--cpu-prof-interval=1000", `--cpu-prof-dir=${directory}`,
    "--cpu-prof-name=sample.cpuprofile", resolve(root, "benchmark.mjs"),
  ], { encoding: "utf8", windowsHide: true });
  assert.match(output, /equivalent results; 7 trials complete/);
  const profile = JSON.parse(readFileSync(resolve(directory, "sample.cpuprofile"), "utf8"));
  assert.ok(profile.samples.length > 0);
  const rows = summarizeSamples(profile);
  assert.equal(rows.reduce((sum, row) => sum + row.samples, 0), profile.samples.length);
  const top = rows.slice(0, 5);
  console.log("sampled nodes", JSON.stringify(top)); // → 节点 ID、函数名、源码位置及样本数随本次采样变化
  console.log("CPU profile parsed"); // → CPU profile parsed
} finally {
  const child = relative(root, directory);
  assert.ok(child.startsWith("js-c-profile-") && !isAbsolute(child) && !child.includes(".."));
  await rm(directory, { recursive: true });
}
console.log("profile cleaned"); // → profile cleaned
