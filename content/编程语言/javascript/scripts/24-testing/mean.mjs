// 所属章节：24-自动化测试
// 演示知识点：被测的纯计算 mean 与异步读取 loadMean 接口
// 运行命令：node --test scripts/24-testing/mean.test.mjs scripts/24-testing/async.test.mjs scripts/24-testing/isolation-a.test.mjs scripts/24-testing/isolation-b.test.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，输入校验与求值行为由两份测试文件断言
export function mean(values) {
  if (!Array.isArray(values) || ![...values].every(Number.isFinite)) {
    throw new TypeError("expected finite numbers");
  }
  if (values.length === 0) return null;
  const sum = values.reduce((total, value) => total + value, 0);
  if (!Number.isFinite(sum)) throw new RangeError("sum exceeds finite range");
  return sum / values.length;
}

export async function loadMean(readText) {
  const text = await readText();
  return mean(JSON.parse(text));
}
