// 所属章节：06-类型收窄与控制流分析
// 演示知识点：typeof 值为 object 未排除 null、收窄不改变声明范围、分支不全不能赋给 never 的类型错误反例
// 运行命令：npm run errors:06（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
export {};

function unsafeObject(value: object | null): string {
  if (typeof value === "object") return value.toString(); // object 标签也可能是 null。
  return "其他";
}

let declared: string | number = "x";
declared = true; // 收窄不改变声明允许的 string | number 范围。

type AddedState = { kind: "done" } | { kind: "paused" };
function incomplete(value: AddedState): string {
  if (value.kind === "done") return "完成";
  const rest: never = value; // paused 尚未处理，不能赋给 never。
  return rest;
}
