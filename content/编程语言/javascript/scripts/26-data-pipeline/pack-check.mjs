// 所属章节：26-综合工程实践
// 演示知识点：真实 npm pack、离线安装、运行消费者并清理
// 运行命令：npm run pack:26（工作目录 content/编程语言/javascript）
// 期望结果：输出 tarball files 4、installed import source verified 与 pack install consumer cleaned
import { rm } from "node:fs/promises";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve, relative, isAbsolute } from "node:path";

const npmCli = process.env.npm_execpath;
assert.ok(npmCli, "run with npm run pack:26");
const root = import.meta.dirname;
const directory = mkdtempSync(resolve(root, "js-c-pack-"));
const packageDirectory = resolve("scripts/26-data-pipeline");
const cache = resolve(directory, "cache");
function npm(args, cwd) {
  return execFileSync(process.execPath, [npmCli, ...args, "--cache", cache], {
    cwd, encoding: "utf8", windowsHide: true,
  });
}
try {
  // 1. 打包当前实现，确认交付文件，再创建独立消费者目录。
  const [packed] = JSON.parse(npm(["pack", "--json", "--ignore-scripts", "--pack-destination", directory], packageDirectory));
  assert.deepEqual(packed.files.map((file) => file.path).sort(), ["index.mjs", "io.mjs", "package.json", "validate.mjs"]);
  console.log("tarball files", packed.files.length); // → tarball files 4
  const consumer = resolve(directory, "consumer");
  mkdirSync(consumer);
  writeFileSync(resolve(consumer, "package.json"), '{"private":true,"type":"module"}', "utf8");
  // 2. 安装实际 tarball；消费者按包名导入，不借用工作区的相对路径。
  npm(["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", resolve(directory, packed.filename)], consumer);
  copyFileSync(resolve(packageDirectory, "consumer.mjs"), resolve(consumer, "consumer.mjs"));
  // 3. 在安装目录运行消费者；非零退出直接由 execFileSync 抛出。
  const output = execFileSync(process.execPath, ["consumer.mjs"], { cwd: consumer, encoding: "utf8", windowsHide: true });
  assert.match(output, /installed import source verified/);
  console.log(output.trim()); // → installed import source verified
} finally {
  // 最后只删除本次创建、且仍位于章节目录内的临时目录。
  const child = relative(root, directory);
  assert.ok(child.startsWith("js-c-pack-") && !isAbsolute(child) && !child.includes(".."));
  await rm(directory, { recursive: true });
}
console.log("pack install consumer cleaned"); // → pack install consumer cleaned
