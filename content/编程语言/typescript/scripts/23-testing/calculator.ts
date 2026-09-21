// 所属章节：23-自动化测试与类型检查
// 演示知识点：待测的同步除法与异步包装接口
// 运行命令：npm run run:23（工作目录 content/编程语言/typescript）
// 期望结果：测试全部通过
export function divide(left: number, right: number): number {
  if (right === 0) throw new RangeError("zero divisor");
  return left / right;
}
export async function divideAsync(left: number, right: number): Promise<number> {
  return divide(left, right);
}
