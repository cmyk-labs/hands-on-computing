// 所属章节：20-迭代器与生成器
// 演示知识点：未捕获的注入异常经过 finally 后传播的独立反例
// 运行命令：node scripts/20-iterators-and-generators/generator-throw-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：先打印 清理已执行，再抛出 Error: 停止学习，退出状态为 1
function* session() {
  try { yield "准备"; }
  finally { console.log("清理已执行"); }
}
const iterator = session();
iterator.next();
iterator.throw(new Error("停止学习"));

// 独立运行：退出状态为 1；诊断包含 清理已执行；Error: 停止学习。
