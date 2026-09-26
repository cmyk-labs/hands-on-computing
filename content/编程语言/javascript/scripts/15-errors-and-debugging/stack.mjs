// 所属章节：15-异常处理与调试
// 演示知识点：从 error.stack 调用栈帧定位业务函数
// 运行命令：node scripts/15-errors-and-debugging/stack.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
function parseCount() { throw new RangeError("count 超出范围"); }
function loadLesson() { return parseCount(); }
try { loadLesson(); }
catch (error) {
  console.log(error.name, error.message);
  const frames = error.stack.split("\n");
  console.log(frames.some(line => line.includes("at parseCount")));
  console.log(frames.some(line => line.includes("at loadLesson")));
}

// 按本例输入运行，输出依次为：
// RangeError count 超出范围
// true
// true
