// 所属章节：20-tsconfig 与项目组织
// 演示知识点：仅由 include 纳入、未被其他文件导入的文件
// 运行命令：npm run check:20 -- --listFiles（工作目录 content/编程语言/typescript）
// 期望结果：文件列表包含 included/extra.ts
export const extra = "由 include 纳入";
