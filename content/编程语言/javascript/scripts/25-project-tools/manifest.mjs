// 所属章节：25-项目组织与工程工具
// 演示知识点：读取 package.json 与锁文件并核对锁定版本一致
// 运行命令：node scripts/25-project-tools/manifest.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 private tools locked 3
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const lock = JSON.parse(await readFile("package-lock.json", "utf8"));
assert.equal(packageJson.private, true);
assert.equal(packageJson.devDependencies.eslint, "10.10.0");
assert.equal(packageJson.devDependencies.prettier, "3.6.2");
assert.deepEqual(lock.packages[""].devDependencies, packageJson.devDependencies);
console.log("private tools locked", lock.lockfileVersion); // → private tools locked 3
