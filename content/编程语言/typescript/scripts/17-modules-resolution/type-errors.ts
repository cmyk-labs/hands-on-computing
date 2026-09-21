// 所属章节：17-模块与模块解析
// 演示知识点：值导入类型、相对导入缺输出扩展名、import type 的运行时使用反例
// 运行命令：npm run errors:17（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import type { total } from "./model.js";
import { Entry } from "./model.js"; // verbatimModuleSyntax 下 Entry 必须写成类型导入。
import { unit } from "./model"; // Node ESM 相对导入缺少输出扩展名。
total({ title: "错误", hours: 1 }); // import type 不提供运行时 total。
// 预期诊断包含：TS1484, TS2835, TS1361。
