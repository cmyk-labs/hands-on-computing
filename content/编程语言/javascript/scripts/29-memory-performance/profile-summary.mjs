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
