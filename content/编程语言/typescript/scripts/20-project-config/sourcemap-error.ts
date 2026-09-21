// 所属章节：20-tsconfig 与项目组织
// 演示知识点：sourceMap 把运行时堆栈定位回源文件
// 运行命令：node --enable-source-maps .build/20-project-config/sourcemap-error.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，包含 source-map-demo，堆栈指向 sourcemap-error.ts
export {};
throw new Error("source-map-demo");
