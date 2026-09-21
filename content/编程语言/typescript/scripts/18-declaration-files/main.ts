// 所属章节：18-声明文件与第三方类型
// 演示知识点：本地包声明、宿主全局声明与环境模块声明的主流程消费
// 运行命令：npm run run:18（工作目录 content/编程语言/typescript）
// 期望结果：输出 读数:7 reading.txt 与 宿主值
import { Meter, label } from "./meter/index.js";
import { basename } from "node:path";
import "./host-init.js";
const meter = new Meter(5);
console.log(label(meter.add(2)), basename("reading.txt"));
console.log(chapter18Title);
globalThis.chapter18Title = undefined; // 清除本进程设置的宿主示例值。
// 预期输出：读数:7 reading.txt
// 预期输出：宿主值
