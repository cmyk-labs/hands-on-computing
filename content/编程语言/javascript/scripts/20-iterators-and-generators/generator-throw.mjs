// 所属章节：20-迭代器与生成器
// 演示知识点：throw 注入的异常在生成器内部被 catch 并恢复
// 运行命令：node scripts/20-iterators-and-generators/generator-throw.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 准备、恢复:输入越界 与 {"value":"结束","done":true}
function* session() {
  try {
    yield "准备";
  } catch (error) {
    yield "恢复:" + error.message;
  }
  return "结束";
}
const iterator = session();
console.log(iterator.next().value);
console.log(iterator.throw(new RangeError("输入越界")).value);
console.log(JSON.stringify(iterator.next()));

// 按本例输入运行，输出依次为：
// 准备
// 恢复:输入越界
// {"value":"结束","done":true}
