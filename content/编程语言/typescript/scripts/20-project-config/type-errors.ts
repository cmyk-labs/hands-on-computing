// 所属章节：20-tsconfig 与项目组织
// 演示知识点：noUncheckedIndexedAccess、exactOptionalPropertyTypes 与 noImplicitOverride 反例
// 运行命令：npm run errors:20（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
const values: number[] = [1];
const first: number = values[0]; // 开启索引检查后可能为 undefined。
const options: { label?: string } = { label: undefined }; // 可选不等于允许显式 undefined。
class Base { title() { return "基础"; } }
class Child extends Base { title() { return "子类"; } } // 需要 override。
export {};
// 预期诊断包含：TS2322, TS2375, TS4114。
