// 所属章节：26-综合工程实践
// 演示知识点：过滤停用行、按组累计总额并排序的纯汇总函数
// 运行命令：npm run demo:26（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，汇总结果由 demo 与测试断言
import { validateRows } from "./validate.mjs";
export { validateRows };

export function summarizeRows(rows) {
  const groups = new Map();
  for (const row of validateRows(rows)) {
    if (!row.active) continue;
    const summary = groups.get(row.group) ?? { group: row.group, count: 0, totalCents: 0 };
    const nextTotal = summary.totalCents + row.amountCents;
    if (!Number.isSafeInteger(nextTotal)) throw new RangeError("group total exceeds safe integer");
    summary.count += 1;
    summary.totalCents = nextTotal;
    groups.set(row.group, summary);
  }
  return [...groups.values()].sort((left, right) => {
    if (left.totalCents !== right.totalCents) return right.totalCents - left.totalCents;
    return left.group < right.group ? -1 : left.group > right.group ? 1 : 0;
  });
}
