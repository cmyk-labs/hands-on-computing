// 所属章节：20-tsconfig 与项目组织
// 演示知识点：被 exclude 排除但随导入仍参与编译的文件
// 运行命令：npm run check:20 -- --listFiles（工作目录 content/编程语言/typescript）
// 期望结果：文件列表包含本文件，其值随 run:20 输出 2
export const importedDespiteExclude = 2;
