import { divide } from "./calculator.js";
divide("9", 3); // TS2345：字符串参数。
// @ts-expect-error TS2578：这里故意不产生类型错误，用来观察未使用指令。
divide(9, 3);
