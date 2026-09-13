import { mapValues } from "./package/src/index.js";
// TS2322：映射得到 number[]，不能赋给 string[]。
const texts: string[] = mapValues([1], item => item + 1);
