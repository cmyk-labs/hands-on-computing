// 所属章节：20-tsconfig 与项目组织
// 演示知识点：noUnusedLocals 与 noUnusedParameters 的未使用诊断
// 运行命令：npm run errors:20:unused（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，TS6133 指向 unusedLabel 与 unusedValue；不生成或执行 JavaScript
export function identity(value: number, unusedLabel: string): number { return value; }
const unusedValue = 1;
