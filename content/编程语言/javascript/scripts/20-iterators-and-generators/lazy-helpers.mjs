// 所属章节：20-迭代器与生成器
// 演示知识点：map、filter、take 的惰性拉取与 drop、flatMap 组合
// 运行命令：node scripts/20-iterators-and-generators/lazy-helpers.mjs（工作目录 content/编程语言/javascript）
// 期望结果：构建链时拉取 0 次；消费时打印 数据源关闭 与 20,30 3 等
let pulled = 0;
let closed = false;
// pulled 统计实际拉取次数，closed 保存数据源被关闭后的状态。
const source = {
  next() {
    if (closed) return { done: true };
    pulled += 1;
    return { value: pulled, done: false };
  },
  return() {
    closed = true;
    console.log("数据源关闭");
    return { done: true };
  }
};
// 建链时不取数据；toArray 才逐个拉取，take 收到两个结果后关闭源。
const selected = Iterator.from(source)
  .map(value => value * 10)
  .filter(value => value >= 20)
  .take(2);
console.log(pulled);
console.log(selected.toArray().join(","), pulled);
// 已消费的迭代器不重置；再次收集只能得到空结果。
console.log(selected.toArray().length);
console.log(Iterator.from([1, 2, 3]).drop(1)
  .flatMap(value => [value, -value]).toArray().join(","));

// 按本例输入运行，输出依次为：
// 0
// 数据源关闭
// 20,30 3
// 0
// 2,-2,3,-3
