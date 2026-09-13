import { rm } from "node:fs/promises";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, cpSync } from "node:fs";
import { dirname, resolve, relative, isAbsolute, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
const chapter = dirname(fileURLToPath(import.meta.url));
const course = resolve(chapter, "../..");
const scratch = chapter;
const work = mkdtempSync(resolve(scratch, ".tmp-ts-b-declarations-"));
const npmCli = resolve(dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");
const compiler = resolve(course, "node_modules/typescript/bin/tsc");
function runNode(args, cwd = work) {
  // 模块解析跟踪包含大量完整路径，捕获输出的上限设为 8 MiB。
  const result = spawnSync(process.execPath, args, { cwd, encoding: "utf8", windowsHide: true, maxBuffer: 8 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${result.status}: ${result.stdout}${result.stderr}`);
  return result.stdout;
}
try {
  const cache = resolve(work, "cache");
  const packed = JSON.parse(runNode([npmCli, "pack", resolve(chapter, "meter"), "--json", "--ignore-scripts", "--offline", "--cache", cache]));
  writeFileSync(resolve(work, "package.json"), JSON.stringify({ private: true, type: "module" }));
  runNode([npmCli, "install", resolve(work, packed[0].filename), "--offline", "--ignore-scripts", "--no-audit", "--no-fund", "--cache", cache]);
  cpSync(resolve(chapter, "consumer.ts"), resolve(work, "consumer.ts"));
  const config = { compilerOptions: { strict: true, target: "ES2025", module: "NodeNext", moduleResolution: "NodeNext", lib: ["ES2025"], types: ["node"], typeRoots: [resolve(course, "node_modules/@types")], rootDir: ".", outDir: "./out", noEmitOnError: true }, files: ["consumer.ts"] };
  writeFileSync(resolve(work, "tsconfig.json"), JSON.stringify(config));
  const trace = runNode([compiler, "-p", work, "--noEmit", "--traceResolution", "--pretty", "false"]);
  if (!trace.replaceAll("\\", "/").includes("node_modules/ts-b-meter/index.d.ts")) throw new Error("没有解析安装后的声明");
  runNode([compiler, "-p", work, "--pretty", "false"]);
  const output = runNode([resolve(work, "out/consumer.js")]);
  if (output.trim() !== "installed-consumer 读数:12") throw new Error(output);
  process.stdout.write(output);
  console.log("installed-types", true);
} finally {
  const child = relative(scratch, work);
  if (isAbsolute(child) || child.startsWith("..") || !child.startsWith(".tmp-ts-b-declarations-") || child.includes(sep)) throw new Error("临时清理路径越界");
  await rm(work, { recursive: true, force: true });
}
