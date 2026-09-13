import { execFileSync } from "node:child_process";
const checks = [
  ["node_modules/eslint/bin/eslint.js", "--config", "scripts/25-project-tools/eslint.config.mjs", "scripts/25-project-tools/clean.mjs"],
  ["node_modules/prettier/bin/prettier.cjs", "--check", "scripts/25-project-tools/clean.mjs"],
  ["scripts/25-project-tools/fixture/consumer.mjs"],
  ["scripts/25-project-tools/clean.mjs"],
];
for (const args of checks) {
  execFileSync(process.execPath, args, { stdio: "inherit" });
}
console.log("CI checks passed"); // → CI checks passed；任一步失败则不会到达这里
