function* group() {
  yield "Map";
  yield "Set";
  return 2;
}
function* course() {
  yield* ["开始"];
  const count = yield* group();
  yield "已学:" + count;
}
console.log([...course()].join(","));

// 按本例输入运行，输出依次为：
// 开始,Map,Set,已学:2
