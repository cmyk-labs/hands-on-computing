// 所属章节：26-综合工程实践
// 演示知识点：统一校验行结构并做无副作用的规范化
// 运行命令：npm run demo:26（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，非法输入抛出带行号的 TypeError
export function validateRows(rows) {
  if (!Array.isArray(rows)) throw new TypeError("rows must be an array");
  // 这是外部输入边界：检查字段后创建新记录，保留调用方的原始对象。
  const normalized = [];
  for (const [index, row] of rows.entries()) {
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      throw new TypeError(`row ${index}: expected object`);
    }
    // 先一次性读取各字段，再验证并规范化这些值。
    const { group, amountCents, active } = row;
    if (typeof group !== "string" || group.trim() === "") {
      throw new TypeError(`row ${index}: group must be nonempty`);
    }
    if (!Number.isSafeInteger(amountCents) || amountCents < 0) {
      throw new TypeError(`row ${index}: amountCents must be nonnegative safe integer`);
    }
    if (typeof active !== "boolean") {
      throw new TypeError(`row ${index}: active must be boolean`);
    }
    normalized.push({ group: group.trim(), amountCents, active });
  }
  return normalized;
}
