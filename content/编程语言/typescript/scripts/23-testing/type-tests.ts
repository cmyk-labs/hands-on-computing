import { divide, divideAsync } from "./calculator.js";
const result: number = divide(9, 3);
const pending: Promise<number> = divideAsync(9, 3);
// @ts-expect-error 字符串不是数值参数；原始错误另由 errors:23 核对。
divide("9", 3);
void result;
void pending;
