// 所属章节：12-类型操作符与索引访问类型
// 演示知识点：缺失键不满足约束、索引不存在的属性、值当作类型、选出类型不匹配的反例
// 运行命令：npm run errors:12（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { readField, type Course } from "./main.js";
const item: Course = { title: "键", hours: 1 };
readField(item, "missing"); // 对象没有这个键，不能满足 K 的约束。
type Missing = Course["missing"]; // 索引类型必须是已存在的属性键。
const field = "hours";
type WrongQuery = Course[field]; // field 是值，改用 typeof field。
const wrong: Course["hours"] = "1"; // 选出的是 number，不会转换字符串。
// 预期诊断包含：TS2345, TS2339, TS2538, TS2749, TS2322。
