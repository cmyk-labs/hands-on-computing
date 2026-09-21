// 所属章节：03-元数据与资源引入
// 演示知识点：延迟经典脚本第一支，验证 defer 的先后顺序
// 运行命令：python -m http.server 8003 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 loading.html 加载，页面入口 http://127.0.0.1:8003/scripts/03-metadata-and-resources/loading.html
// 期望结果：日志中 defer-first 先于 defer-second，末尾元素=true
// 在 loading.html 中通过 defer 引入；预期末尾元素=true。
// 预期本行在 defer-second 之前，但不限定 async 日志出现在哪里。
record("defer-first");
