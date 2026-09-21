// 所属章节：20-tsconfig 与项目组织
// 演示知识点：把 package.json 复制到输出目录以支持子路径导入
// 运行命令：npm run build:20（工作目录 content/编程语言/typescript）
// 期望结果：输出目录生成 package.json 副本，run:20 正常执行
import { copyFileSync, mkdirSync } from "node:fs";
const output = new URL("../../.build/20-project-config/", import.meta.url);
mkdirSync(output, { recursive: true });
copyFileSync(new URL("./package.json", import.meta.url), new URL("./package.json", output));
