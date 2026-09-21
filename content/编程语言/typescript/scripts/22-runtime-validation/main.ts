// 所属章节：22-外部数据与运行时校验
// 演示知识点：成功、失败与断言函数的调用顺序
// 运行命令：npm run run:22（工作目录 content/编程语言/typescript）
// 期望结果：依次输出 笔:2、json、shape、business、纸 与 order shape
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
