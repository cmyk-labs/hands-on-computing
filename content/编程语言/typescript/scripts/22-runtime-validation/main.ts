import { parseOrder, assertOrder } from "./validation.js";
// 下面四次分别输出 笔:2、json、shape、business。
for (const text of ['{"name":"笔","quantity":2}', '{', 'null', '{"name":" ","quantity":0}']) {
  const result = parseOrder(text);
  console.log(result.ok ? result.value.name + ":" + result.value.quantity : result.reason);
}
const candidate: unknown = { name: "纸", quantity: 1 };
assertOrder(candidate);
console.log(candidate.name); // 纸：断言函数正常返回后才能访问 name。
try { assertOrder(null); }
catch (error: unknown) {
  // 输入 null 时输出 order shape。
  console.log(error instanceof Error ? error.message : "非 Error 异常");
}
