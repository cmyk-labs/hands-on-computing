function read(first = second, second = 2) {
  return first;
}
console.log(read());
// 预期错误：ReferenceError；Cannot access 'second' before initialization
