// 所属章节：20-迭代器与生成器
// 演示知识点：next 参数传入暂停的 yield 表达式求值
// 运行命令：node scripts/20-iterators-and-generators/generator-input.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 {"value":"请输入倍数","done":false} 与 {"value":12,"done":true}
function* multiply(base) {
  const factor = yield "请输入倍数";
  return base * factor;
}
const iterator = multiply(4);
console.log(JSON.stringify(iterator.next(999)));
console.log(JSON.stringify(iterator.next(3)));

// 按本例输入运行，输出依次为：
// {"value":"请输入倍数","done":false}
// {"value":12,"done":true}
