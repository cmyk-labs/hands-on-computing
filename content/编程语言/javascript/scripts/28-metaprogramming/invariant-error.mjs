const target = Object.freeze({ code: 10 });
const invalid = new Proxy(target, { get() { return 99; } });
console.log(invalid.code); // → TypeError，非零退出：不可配置且不可写的 code 不能被报告成 99
