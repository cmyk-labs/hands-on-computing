export function scanGroups(rows) {
  const keys = [...new Set(rows.map((row) => row.group))];
  return keys.map((group) => [group,
    rows.filter((row) => row.group === group).reduce((sum, row) => sum + row.amount, 0),
  ]).sort(([left], [right]) => left - right);
}
export function onePass(rows) {
  const groups = new Map();
  for (const row of rows) groups.set(row.group, (groups.get(row.group) ?? 0) + row.amount);
  return [...groups].sort(([left], [right]) => left - right);
}
