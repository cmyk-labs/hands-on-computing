// 所属章节：19-ES 模块
// 演示知识点：具名导出、导出重命名与默认导出的提供方模块
// 运行命令：node scripts/19-es-modules/basic.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，经 basic.mjs 导入后输出 90 分钟
export const minutesPerHour = 60;
function add(left, right) {
  return left + right;
}
export { add as sum };
export default function describe(minutes) {
  return String(minutes) + " 分钟";
}
