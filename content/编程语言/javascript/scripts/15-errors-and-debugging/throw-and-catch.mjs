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
