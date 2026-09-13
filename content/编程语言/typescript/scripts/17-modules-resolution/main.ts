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
