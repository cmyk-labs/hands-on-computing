// 所属章节：18-声明文件与第三方类型
// 演示知识点：独立消费者核对安装包的声明与实现一致
// 运行命令：node scripts/18-declaration-files/pack-check.mjs（工作目录 content/编程语言/typescript）
// 期望结果：输出 installed-consumer 读数:12 与 installed-types true
import { Meter, label } from "ts-b-meter";
const meter = new Meter(10);
console.log("installed-consumer", label(meter.add(2))); // → installed-consumer 读数:12
