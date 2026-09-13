import type { Constrained, ElementOf, OneArray, KeepText } from "./main.js";
type MissingCode = Constrained<{ title: string }>; // 约束处就拒绝输入，不进入条件分支。
const wrongElement: ElementOf<readonly number[]> = "3"; // 提取的是 number。
const mixed: OneArray<string | number> = [1, "二"]; // 不符合 string[] 或 number[]。
const impossible: KeepText<never> = "有值"; // 结果为 never，不能赋普通值。
// 预期诊断包含：TS2741, TS2322。
