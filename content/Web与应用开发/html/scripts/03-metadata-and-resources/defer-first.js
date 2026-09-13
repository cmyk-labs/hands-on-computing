// 在 loading.html 中通过 defer 引入；预期末尾元素=true。
// 预期本行在 defer-second 之前，但不限定 async 日志出现在哪里。
record("defer-first");
