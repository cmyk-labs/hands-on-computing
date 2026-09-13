export {};
function lyingGuard(value: unknown): value is { name: string } {
  return typeof value === "object" && value !== null;
}
const input: unknown = { name: 3 };
if (lyingGuard(input)) input.name.toUpperCase(); // 运行时 TypeError：守卫没有检查 name 的类型。
