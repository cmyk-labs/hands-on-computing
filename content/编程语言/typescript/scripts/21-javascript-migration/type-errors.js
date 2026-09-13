import { total, keep } from "./legacy.js";
total("10"); // TS2345：string 不是 number。
keep(); // TS2554：TS 7 不因参数是 unknown 就允许省略。
const sample = { name: "笔" };
/** @type {sample} */ // TS2749：值查询应写 typeof sample。
const other = { name: "纸" };
export {};
