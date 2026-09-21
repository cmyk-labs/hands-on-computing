// 所属章节：03-元数据与资源引入
// 演示知识点：独立异步脚本第二支，与 async-first 互不依赖
// 运行命令：python -m http.server 8003 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 loading.html 加载，页面入口 http://127.0.0.1:8003/scripts/03-metadata-and-resources/loading.html
// 期望结果：日志出现 async-second 一行，与 async-first 的先后顺序不作预期
// 即使多次观察都在 async-first 之后，也不能把这个顺序当作程序前提。
record("async-second");
