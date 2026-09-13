const broken = {
  [Symbol.iterator]() { return this; },
  next() { return 7; }
};
console.log([...broken]);

// 独立运行：退出状态为 1；诊断包含 TypeError；Iterator result 7 is not an object。
