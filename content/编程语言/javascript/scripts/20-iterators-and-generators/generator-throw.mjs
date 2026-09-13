function* session() {
  try {
    yield "准备";
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
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
