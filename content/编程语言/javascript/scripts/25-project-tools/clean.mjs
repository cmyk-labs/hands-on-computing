// 所属章节：25-项目组织与工程工具
// 演示知识点：同时通过 lint 与格式检查的最小合格输入
// 运行命令：npm run check:25（工作目录 content/编程语言/javascript）
// 期望结果：输出 12；作为 CI 最后一步随后打印 CI checks passed
export function triple(value) {
  return value * 3;
}
console.log(triple(4)); // → 12
