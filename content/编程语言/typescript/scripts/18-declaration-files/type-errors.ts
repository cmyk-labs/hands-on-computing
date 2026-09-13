import { Meter, label } from "./meter/index.js";
label("12"); // 声明要求 number，不会把字符串自动转换。
new Meter("0"); // 构造参数与实现约定不符。
new Meter(0).add("2"); // 方法参数必须符合声明。
new Meter(0).reset(); // 不存在的能力不应靠宽泛声明放行。
// 预期诊断包含：TS2345, TS2339。
