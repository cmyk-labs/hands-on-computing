// 所属章节：19-声明合并与模块扩充
// 演示知识点：仅类型导入模块扩充不执行原型赋值的边界
// 运行命令：node .build/19-declaration-merging/missing-patch.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，TypeError 包含 double is not a function
import { Gauge } from "./gauge.js";
import type {} from "./gauge-double.js";
new Gauge(4).double(); // 类型导入不会执行 Gauge.prototype.double 的赋值。
