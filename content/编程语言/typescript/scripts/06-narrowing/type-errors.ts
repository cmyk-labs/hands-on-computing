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
