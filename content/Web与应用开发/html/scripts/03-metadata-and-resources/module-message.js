// 所属章节：03-元数据与资源引入
// 演示知识点：命名导出 moduleLabel，供模块入口生成日志说明文字
// 运行命令：python -m http.server 8003 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；由 module-main.js 导入，页面入口 http://127.0.0.1:8003/scripts/03-metadata-and-resources/loading.html
// 期望结果：“已读取导入的文字”出现在 module-main 的日志行中
// 这个命名导出由 module-main.js 导入，供它生成日志中的说明文字。
export const moduleLabel = "已读取导入的文字";
