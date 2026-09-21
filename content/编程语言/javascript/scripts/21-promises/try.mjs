// 所属章节：21-Promise
// 演示知识点：Promise.try 把同步调用统一转为 Promise
// 运行命令：node scripts/21-promises/try.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 callback,caller 10 与 TypeError invalid input
const order = [];
const result = Promise.try((value) => {
  order.push("callback");
  return value * 2;
}, 5);
order.push("caller");
result.then((value) => console.log(order.join(","), value)); // → callback,caller 10
Promise.try(() => { throw new TypeError("invalid input"); })
  .catch((error) => console.log(error.name, error.message)); // → TypeError invalid input
