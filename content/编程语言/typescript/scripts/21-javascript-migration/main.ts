// 所属章节：21-JavaScript 迁移与 JSDoc
// 演示知识点：TypeScript 消费带 JSDoc 的 JavaScript 模块
// 运行命令：npm run run:21（工作目录 content/编程语言/typescript）
// 期望结果：输出 笔:10 11 gross 7，随后行为测试全部通过
import { product, policy, total, round, identity } from "./legacy.js";
import { label } from "./model.js";
const mode: "gross" = policy.mode;
const selected: number = identity(7);
// 预期：笔:10 11 gross 7；JS 的泛型关系与字面量约束传到 TS 调用方。
console.log(label(product), round(total(product.price, policy.rate)), mode, selected);
