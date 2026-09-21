// 所属章节：18-声明文件与第三方类型
// 演示知识点：声明参数与返回类型不符、调用不存在方法的反例
// 运行命令：npm run errors:18（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { Meter, label } from "./meter/index.js";
label("12"); // 声明要求 number，不会把字符串自动转换。
new Meter("0"); // 构造参数与实现约定不符。
new Meter(0).add("2"); // 方法参数必须符合声明。
new Meter(0).reset(); // 不存在的能力不应靠宽泛声明放行。
// 预期诊断包含：TS2345, TS2339。
