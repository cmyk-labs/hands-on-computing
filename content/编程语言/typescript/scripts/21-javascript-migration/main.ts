import { product, policy, total, round, identity } from "./legacy.js";
import { label } from "./model.js";
const mode: "gross" = policy.mode;
const selected: number = identity(7);
// 预期：笔:10 11 gross 7；JS 的泛型关系与字面量约束传到 TS 调用方。
console.log(label(product), round(total(product.price, policy.rate)), mode, selected);
