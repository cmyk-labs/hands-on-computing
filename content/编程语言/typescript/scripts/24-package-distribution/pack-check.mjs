import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, realpathSync } from "node:fs";
import { cp, rm } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const chapter = dirname(fileURLToPath(import.meta.url));
const course = resolve(chapter, "../..");
const temporaryRoot = chapter;
const temporary = mkdtempSync(resolve(temporaryRoot, "ts-c-24-pack-"));
const consumer = resolve(temporary, "consumer");
const compiler = resolve(course, "node_modules/typescript/bin/tsc");
const npm = resolve(dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");

function run(script, args, cwd, expected = 0, contains = []) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd, encoding: "utf8" });
  if (result.error) throw result.error;
  const output = result.stdout + result.stderr;
  assert.equal(result.status, expected, output);
  for (const text of contains) assert.ok(output.includes(text), output);
  return result.stdout;
}

try {
  run(compiler, ["-p", chapter], course);
  const packed = JSON.parse(run(npm, ["pack", "./package", "--json", "--ignore-scripts", "--offline",
    "--cache", resolve(temporary, "cache"), "--pack-destination", temporary], chapter))[0];
  const files = packed.files.map(file => file.path);
  for (const file of ["modern.d.mts", "legacy.d.cts", "index.d.ts"]) assert.ok(files.includes("dist/" + file), files.join("\n"));
  await cp(resolve(chapter, "consumer"), consumer, { recursive: true });
  run(npm, ["install", resolve(temporary, packed.filename), "--offline", "--ignore-scripts", "--no-audit",
    "--no-fund", "--package-lock=false", "--cache", resolve(temporary, "cache")], consumer);
  const installed = resolve(consumer, "node_modules/notebook-greeting-ts-c");
  assert.equal(realpathSync(installed), installed);
  const listed = run(compiler, ["-p", consumer, "--listFiles"], consumer).replaceAll("\\", "/");
  for (const file of ["modern.d.mts", "legacy.d.cts", "index.d.ts"]) assert.ok(listed.includes("node_modules/notebook-greeting-ts-c/dist/" + file), listed);
  assert.ok(!listed.includes("/package/src/"), "消费者不能检查工作区源码");
  assert.ok(!listed.includes("/node_modules/notebook-greeting-ts-c/src/"), "消费者必须解析声明");
  run(compiler, ["-p", resolve(consumer, "tsconfig.errors.json"), "--pretty", "false"], consumer, 1, ["TS2345"]);
  const locator = "console.log(import.meta.resolve('notebook-greeting-ts-c'))";
  const location = run("--input-type=module", ["-e", locator], consumer).trim();
  assert.ok(location.includes("/node_modules/notebook-greeting-ts-c/dist/"), location);
  const cjsLocation = run("--input-type=commonjs", ["-e", "console.log(require.resolve('notebook-greeting-ts-c'))"], consumer).trim().replaceAll("\\", "/");
  assert.ok(cjsLocation.includes("/node_modules/notebook-greeting-ts-c/dist/legacy.cjs"), cjsLocation);
  console.log("installed CJS runtime:", cjsLocation);
  console.log("installed runtime:", location);
  console.log("installed declarations:", ["modern.d.mts", "legacy.d.cts", "index.d.ts"].join(", "));
  console.log(run(resolve(consumer, "build/main.js"), [], consumer).trim());
  console.log(run(resolve(consumer, "build/main.cjs"), [], consumer).trim());
  assert.equal(JSON.parse(readFileSync(resolve(installed, "package.json"), "utf8")).name, "notebook-greeting-ts-c");
  console.log("pack 24 OK");
} finally {
  const checked = realpathSync(temporary);
  assert.ok(checked.startsWith(realpathSync(temporaryRoot) + sep));
  assert.ok(checked.split(sep).at(-1).startsWith("ts-c-24-pack-"));
  await rm(checked, { recursive: true, force: true });
}
