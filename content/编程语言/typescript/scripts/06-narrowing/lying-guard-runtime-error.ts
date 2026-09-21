// 所属章节：06-类型收窄与控制流分析
// 演示知识点：失实类型谓词守卫通过类型检查但运行时读取失败的边界
// 运行命令：node .build/06-narrowing/lying-guard-runtime-error.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，抛出 TypeError，消息包含 input.name.toUpperCase is not a function
export {};
function lyingGuard(value: unknown): value is { name: string } {
  return typeof value === "object" && value !== null;
}
const input: unknown = { name: 3 };
if (lyingGuard(input)) input.name.toUpperCase(); // 运行时 TypeError：守卫没有检查 name 的类型。
