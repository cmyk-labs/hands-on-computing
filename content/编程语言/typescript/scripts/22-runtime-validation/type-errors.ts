import { parseOrder } from "./validation.js";
const unknownOrder: unknown = { name: "a" };
unknownOrder.name; // TS18046：先检查 unknown。
const result = parseOrder("null");
console.log(result.value); // TS2339：失败分支没有 value。
try { throw "failed"; } catch (error: unknown) { console.log(error.message); }
