// 所属章节：28-Proxy、Reflect 与元编程
// 演示知识点：冻结目标 get 返回不同值的违约独立反例
// 运行命令：node scripts/28-metaprogramming/invariant-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError，进程非零退出
const target = Object.freeze({ code: 10 });
const invalid = new Proxy(target, { get() { return 99; } });
console.log(invalid.code); // → TypeError，非零退出：不可配置且不可写的 code 不能被报告成 99
