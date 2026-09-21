// 所属章节：22-外部数据与运行时校验
// 演示知识点：未收窄的 unknown、失败分支取值与 error.message 反例
// 运行命令：npm run errors:22（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { parseOrder } from "./validation.js";
const unknownOrder: unknown = { name: "a" };
unknownOrder.name; // TS18046：先检查 unknown。
const result = parseOrder("null");
console.log(result.value); // TS2339：失败分支没有 value。
try { throw "failed"; } catch (error: unknown) { console.log(error.message); }
