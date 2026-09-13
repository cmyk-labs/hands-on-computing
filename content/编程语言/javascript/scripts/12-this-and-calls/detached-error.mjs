const counter = { value: 0, increment() { return ++this.value; } };
const callback = counter.increment;
callback();

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot read properties of undefined；value。
