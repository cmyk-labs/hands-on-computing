// 所属章节：29-内存管理与性能分析
// 演示知识点：按节点 ID 统计样本并保留函数名与源码位置
// 运行命令：node scripts/29-memory-performance/profile-summary.test.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，统计行为由 profile-summary.test.mjs 断言
export function summarizeSamples(profile) {
  // 节点 ID 区分调用路径；同名函数不一定是同一个采样节点。
  const nodes = new Map(profile.nodes.map((node) => [node.id, node]));
  // 每个 sample 是节点 ID，先按 ID 计数，再补上源码位置。
  const counts = new Map();
  for (const id of profile.samples) {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  // 排序只依据本次样本数；保留 ID 和位置，便于回到真实调用点。
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
