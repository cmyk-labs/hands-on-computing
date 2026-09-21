// 所属章节：07-函数与参数
// 演示知识点：默认参数从左到右初始化，不能先读取尚未初始化的后一个参数
// 运行命令：node scripts/07-functions-and-parameters/default-parameter-tdz.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 ReferenceError（Cannot access 'second' before initialization）并以非零状态退出
function read(first = second, second = 2) {
  return first;
}
console.log(read());
// 预期错误：ReferenceError；Cannot access 'second' before initialization
