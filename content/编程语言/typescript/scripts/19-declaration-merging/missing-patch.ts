import { Gauge } from "./gauge.js";
import type {} from "./gauge-double.js";
new Gauge(4).double(); // 类型导入不会执行 Gauge.prototype.double 的赋值。
