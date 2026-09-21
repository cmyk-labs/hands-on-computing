// 所属章节：12-this 与调用方式
// 演示知识点：方法提取后独立调用时 this 为 undefined 的独立反例
// 运行命令：node scripts/12-this-and-calls/detached-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 TypeError（Cannot read properties of undefined，读取 value）
const counter = { value: 0, increment() { return ++this.value; } };
const callback = counter.increment;
callback();

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot read properties of undefined；value。
