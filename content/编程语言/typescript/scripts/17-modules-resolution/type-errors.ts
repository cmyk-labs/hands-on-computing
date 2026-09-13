import type { total } from "./model.js";
import { Entry } from "./model.js"; // verbatimModuleSyntax 下 Entry 必须写成类型导入。
import { unit } from "./model"; // Node ESM 相对导入缺少输出扩展名。
total({ title: "错误", hours: 1 }); // import type 不提供运行时 total。
// 预期诊断包含：TS1484, TS2835, TS1361。
