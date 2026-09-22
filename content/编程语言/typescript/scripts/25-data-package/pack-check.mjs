// 所属章节：25-综合工程实践
// 演示知识点：tarball 打包、离线安装、声明解析与消费者运行核对
// 运行命令：npm run pack:25（工作目录 content/编程语言/typescript）
// 期望结果：输出安装入口与声明信息，最后输出 pack 25 OK
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, realpathSync } from "node:fs";
import { cp, rm } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";

const chapter = import.meta.dirname;
const course = resolve(chapter, "../..");
const temp = mkdtempSync(resolve(chapter, "ts-c-25-pack-"));
const consumer = resolve(temp, "consumer");
const compiler = resolve(course, "node_modules/typescript/bin/tsc");
const npm = resolve(dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");

// 这些步骤都应成功；启动失败或非零退出直接抛出，不重复包装错误。
function run(script, args, cwd) {
  return execFileSync(process.execPath, [script, ...args], {
    cwd, encoding: "utf8", windowsHide: true,
  });
}

try {
  // 1. 构建实现与声明，再把真实 tarball 放入本次临时目录。
  run(compiler, ["-p", chapter], course);
  const [packed] = JSON.parse(run(npm, ["pack", "./package", "--json", "--ignore-scripts", "--offline",
    "--cache", resolve(temp, "cache"), "--pack-destination", temp], chapter));

  // 2. 复制独立消费者，从 tarball 安装；缓存和安装产物都留在 temp 内。
  await cp(resolve(chapter, "consumer"), consumer, { recursive: true });
  run(npm, ["install", resolve(temp, packed.filename), "--offline", "--ignore-scripts", "--no-audit",
    "--no-fund", "--package-lock=false", "--cache", resolve(temp, "cache")], consumer);

  // 3. 消费者按包名编译，检查实际载入的是安装包的声明文件。
  const listed = run(compiler, ["-p", consumer, "--listFiles"], consumer).replaceAll("\\", "/");
  const declarations = ["index.d.ts"];
  for (const file of declarations) assert.ok(listed.includes("node_modules/notebook-readings-ts-c/dist/" + file));
  console.log("installed declarations:", declarations.join(", ")); // → installed declarations: index.d.ts

  // 4. 打印实际运行入口，再执行生成的消费者；只保留关键结果核对。
  // → installed runtime: 后接 file: URL，末尾为 notebook-readings-ts-c/dist/index.js。
  // 临时目录名每次变化，不比较绝对路径。
  console.log("installed runtime:", run("--input-type=module",
    ["-e", "console.log(import.meta.resolve('notebook-readings-ts-c'))"], consumer).trim());
  const output = run(resolve(consumer, "build/main.js"), [], consumer).trim();
  assert.equal(output, "installed readings OK 温度 18");
  console.log(output); // → installed readings OK 温度 18
  console.log("pack 25 OK"); // → pack 25 OK；以上步骤均成功后才出现。
} finally {
  // 路径和前缀核对只用于限定递归清理范围，原始失败仍向调用方传播。
  const checked = realpathSync(temp);
  assert.ok(checked.startsWith(realpathSync(chapter) + sep));
  assert.ok(checked.split(sep).at(-1).startsWith("ts-c-25-pack-"));
  await rm(checked, { recursive: true, force: true });
}
