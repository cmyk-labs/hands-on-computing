// 所属章节：25-项目组织与工程工具
// 演示知识点：连续执行 ESLint、Prettier、fixture 消费者与 clean 的本地 CI 入口
// 运行命令：npm run check:25（工作目录 content/编程语言/javascript）
// 期望结果：各步输出后打印 CI checks passed；任一步失败则中断
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
