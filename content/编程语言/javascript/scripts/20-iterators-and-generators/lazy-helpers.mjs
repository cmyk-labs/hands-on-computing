let pulled = 0;
let closed = false;
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
const selected = Iterator.from(source)
  .map(value => value * 10)
  .filter(value => value >= 20)
  .take(2);
console.log(pulled);
console.log(selected.toArray().join(","), pulled);
console.log(selected.toArray().length);
console.log(Iterator.from([1, 2, 3]).drop(1)
  .flatMap(value => [value, -value]).toArray().join(","));

// 按本例输入运行，输出依次为：
// 0
// 数据源关闭
// 20,30 3
// 0
// 2,-2,3,-3
