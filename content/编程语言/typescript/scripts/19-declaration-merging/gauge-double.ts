// 所属章节：19-声明合并与模块扩充
// 演示知识点：declare module 模块扩充接口并挂接原型方法
// 运行命令：npm run run:19（工作目录 content/编程语言/typescript）
// 期望结果：主入口输出 8 local
import { Gauge } from "./gauge.js";
declare module "./gauge.js" {
  interface Gauge { double(): number }
}
Gauge.prototype.double = function () { return this.value * 2; };
