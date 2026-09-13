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
