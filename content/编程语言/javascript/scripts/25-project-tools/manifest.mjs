import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const lock = JSON.parse(await readFile("package-lock.json", "utf8"));
assert.equal(packageJson.private, true);
assert.equal(packageJson.devDependencies.eslint, "10.10.0");
assert.equal(packageJson.devDependencies.prettier, "3.6.2");
assert.deepEqual(lock.packages[""].devDependencies, packageJson.devDependencies);
console.log("private tools locked", lock.lockfileVersion); // → private tools locked 3
