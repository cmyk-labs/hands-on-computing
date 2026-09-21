// 所属章节：22-async 与 await
// 演示知识点：顶层 await 的异步模块初始化与依赖导出
// 运行命令：node scripts/22-async-await/imports.mjs（工作目录 content/编程语言/javascript）
// 期望结果：两次动态导入只求值一次，仅打印一次 feature evaluated
console.log("feature evaluated"); // → 对同一模块 URL 的两次导入，仅打印一次
export const factor = await Promise.resolve(3);
export const scale = (value) => value * factor;
