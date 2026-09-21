// 所属章节：03-元数据与资源引入
// 演示知识点：延迟经典脚本第二支，与 defer-first 对照顺序
// 运行命令：python -m http.server 8003 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 loading.html 加载，页面入口 http://127.0.0.1:8003/scripts/03-metadata-and-resources/loading.html
// 期望结果：日志中 defer-first 在前、defer-second 在后，均位于 DOMContentLoaded 之前
// 预期：defer-first 在前，本行在后，两行都位于 DOMContentLoaded 之前。
record("defer-second");
