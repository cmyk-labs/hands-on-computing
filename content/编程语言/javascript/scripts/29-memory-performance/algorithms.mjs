// 所属章节：29-内存管理与性能分析
// 演示知识点：重复扫描与单遍 Map 两种等价分组实现
// 运行命令：node scripts/29-memory-performance/benchmark.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，结果等价性与耗时由 benchmark.mjs 断言
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
