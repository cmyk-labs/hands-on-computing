import { readField, type Course } from "./main.js";
const item: Course = { title: "键", hours: 1 };
readField(item, "missing"); // 对象没有这个键，不能满足 K 的约束。
type Missing = Course["missing"]; // 索引类型必须是已存在的属性键。
const field = "hours";
type WrongQuery = Course[field]; // field 是值，改用 typeof field。
const wrong: Course["hours"] = "1"; // 选出的是 number，不会转换字符串。
// 预期诊断包含：TS2345, TS2339, TS2538, TS2749, TS2322。
