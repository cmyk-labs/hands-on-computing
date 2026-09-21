// 所属章节：15-异常处理与调试
// 演示知识点：创建 Error 对象、按类型抛出与 instanceof 分支处理
// 运行命令：node scripts/15-errors-and-debugging/throw-and-catch.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
function requireCount(value) {
  if (typeof value !== "number") throw new TypeError("count 必须是 number");
  if (!Number.isInteger(value) || value < 0) throw new RangeError("count 必须是非负整数");
  return value;
}
const pending = new Error("尚未抛出");
console.log(pending.name, pending.message, requireCount(3));
for (const value of ["3", -1]) {
  try {
    requireCount(value);
  } catch (error) {
    if (!(error instanceof TypeError || error instanceof RangeError)) throw error;
    console.log(error.name, error.message);
  }
}

// 按本例输入运行，输出依次为：
// Error 尚未抛出 3
// TypeError count 必须是 number
// RangeError count 必须是非负整数
