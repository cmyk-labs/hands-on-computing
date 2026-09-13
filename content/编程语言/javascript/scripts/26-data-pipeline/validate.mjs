export function validateRows(rows) {
  if (!Array.isArray(rows)) throw new TypeError("rows must be an array");
  const normalized = [];
  for (const [index, row] of rows.entries()) {
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      throw new TypeError(`row ${index}: expected object`);
    }
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
