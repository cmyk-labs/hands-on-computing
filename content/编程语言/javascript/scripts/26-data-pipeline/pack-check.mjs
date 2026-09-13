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
  const [packed] = JSON.parse(npm(["pack", "--json", "--ignore-scripts", "--pack-destination", directory], packageDirectory));
  assert.deepEqual(packed.files.map((file) => file.path).sort(), ["index.mjs", "io.mjs", "package.json", "validate.mjs"]);
  console.log("tarball files", packed.files.length); // → tarball files 4
  const consumer = resolve(directory, "consumer");
  mkdirSync(consumer);
  writeFileSync(resolve(consumer, "package.json"), '{"private":true,"type":"module"}', "utf8");
  npm(["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", resolve(directory, packed.filename)], consumer);
  copyFileSync(resolve(packageDirectory, "consumer.mjs"), resolve(consumer, "consumer.mjs"));
  const output = execFileSync(process.execPath, ["consumer.mjs"], { cwd: consumer, encoding: "utf8", windowsHide: true });
  assert.match(output, /installed import source verified/);
  console.log(output.trim()); // → installed import source verified
} finally {
  const child = relative(root, directory);
  assert.ok(child.startsWith("js-c-pack-") && !isAbsolute(child) && !child.includes(".."));
  await rm(directory, { recursive: true });
}
console.log("pack install consumer cleaned"); // → pack install consumer cleaned
