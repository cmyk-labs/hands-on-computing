function parseCount() { throw new RangeError("count 超出范围"); }
function loadLesson() { return parseCount(); }
try { loadLesson(); }
catch (error) {
  if (!(error instanceof RangeError)) throw error;
  console.log(error.name, error.message);
  const frames = error.stack.split("\n");
  console.log(frames.some(line => line.includes("at parseCount")));
  console.log(frames.some(line => line.includes("at loadLesson")));
}

// 按本例输入运行，输出依次为：
// RangeError count 超出范围
// true
// true
