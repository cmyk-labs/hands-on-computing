// 所属章节：29-内存管理与性能分析
// 演示知识点：按节点 ID 统计样本并保留函数名与源码位置
// 运行命令：node scripts/29-memory-performance/profile-summary.test.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，统计行为由 profile-summary.test.mjs 断言
import assert from "node:assert/strict";

export function summarizeSamples(profile) {
  const nodes = new Map(profile.nodes.map((node) => [node.id, node]));
  const counts = new Map();
  for (const id of profile.samples) {
    assert.ok(nodes.has(id), "sample must reference a known node");
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [...counts].map(([id, samples]) => {
    const frame = nodes.get(id).callFrame;
    return {
      id,
      functionName: frame.functionName || "(anonymous)",
      scriptId: frame.scriptId,
      url: frame.url,
      lineNumber: frame.lineNumber,
      columnNumber: frame.columnNumber,
      samples,
    };
  }).sort((left, right) => right.samples - left.samples || left.id - right.id);
}
