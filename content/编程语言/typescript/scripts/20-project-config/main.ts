// 所属章节：20-tsconfig 与项目组织
// 演示知识点：#value 子路径与包入口导入、被排除文件的再纳入、noUncheckedIndexedAccess 与 override 等选项
// 运行命令：npm run run:20（工作目录 content/编程语言/typescript）
// 期望结果：输出 7 7 2 undefined 项目
import { amount } from "#value";
import { amount as publicAmount } from "ts-b-config-demo/value";
import { importedDespiteExclude } from "./included/excluded.js";
const scores: number[] = [amount];
const first = scores[0];
const safeScore = first === undefined ? 0 : first;
type Options = { label?: string };
const options: Options = {};
class Base { title() { return "基础"; } }
class Derived extends Base { override title() { return "项目"; } }
console.log(safeScore, publicAmount, importedDespiteExclude, options.label, new Derived().title());
// 预期输出：7 7 2 undefined 项目
