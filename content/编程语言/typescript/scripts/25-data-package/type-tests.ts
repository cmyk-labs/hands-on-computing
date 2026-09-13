import { mapValues, type Reading } from "./package/src/index.js";
const values: number[] = mapValues<Reading, number>([{ sensor: "a", value: 2 }], item => item.value);
// @ts-expect-error 回调返回 number，不能把结果当 string[]。
const texts: string[] = mapValues([1], item => item + 1);
void values;
void texts;
