import { b } from "./cycle-bad-b.mjs";
export const a = "A";
console.log(b);

// 独立运行：退出状态为 1；诊断包含 ReferenceError；Cannot access 'a' before initialization。
