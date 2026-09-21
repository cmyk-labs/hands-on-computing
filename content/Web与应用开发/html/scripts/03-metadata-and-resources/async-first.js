// 所属章节：03-元数据与资源引入
// 演示知识点：独立异步脚本第一支，观察 async 不预设的执行位置
// 运行命令：python -m http.server 8003 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 loading.html 加载，页面入口 http://127.0.0.1:8003/scripts/03-metadata-and-resources/loading.html
// 期望结果：日志出现 async-first 一行，与其他日志行的先后顺序不作预期
// 只观察本次位置与末尾元素状态；不要求早于 async-second 或 DOMContentLoaded。
record("async-first");
