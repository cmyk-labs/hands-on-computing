import { Meter, label } from "./meter/index.js";
import { basename } from "node:path";
import "./host-init.js";
const meter = new Meter(5);
console.log(label(meter.add(2)), basename("reading.txt"));
console.log(chapter18Title);
globalThis.chapter18Title = undefined; // 清除本进程设置的宿主示例值。
// 预期输出：读数:7 reading.txt
// 预期输出：宿主值
