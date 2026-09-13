function* session() {
  try { yield "准备"; }
  finally { console.log("清理已执行"); }
}
const iterator = session();
iterator.next();
iterator.throw(new Error("停止学习"));

// 独立运行：退出状态为 1；诊断包含 清理已执行；Error: 停止学习。
