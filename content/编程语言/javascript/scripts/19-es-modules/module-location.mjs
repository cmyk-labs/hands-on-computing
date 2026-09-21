// 所属章节：19-ES 模块
// 演示知识点：以 import.meta.url 相对当前模块定位资源文件
// 运行命令：node scripts/19-es-modules/module-location.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 file: 与两个 true
const resource = new URL("./settings.json", import.meta.url);
console.log(new URL(import.meta.url).protocol);
console.log(resource.pathname.endsWith("/scripts/19-es-modules/settings.json"));
console.log(resource.protocol === "file:");

// 按本例输入运行，输出依次为：
// file:
// true
// true
