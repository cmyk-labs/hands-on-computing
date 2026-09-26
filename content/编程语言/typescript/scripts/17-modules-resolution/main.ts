// 所属章节：17-模块与模块解析
// 演示知识点：类型导入、默认导入消费 CommonJS、import() 类型位置与动态导入
// 运行命令：npm run run:17（工作目录 content/编程语言/typescript）
// 期望结果：输出 4 小时 小时 6，随后输出 CJS->ESM 17
import type { Entry } from "./barrel.js";
import { total, unit } from "./barrel.js";
import legacy from "./legacy.cjs";
type ImportedEntry = import("./model.js").Entry;
type ModelModule = typeof import("./model.js");
const entry: Entry = { title: "模块", hours: 2 };
const copy: ImportedEntry = entry;
const loaded: ModelModule = await import("./model.js");
console.log(total(copy), unit, loaded.unit, legacy.double(3));
// 预期输出：4 小时 小时 6
