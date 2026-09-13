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
