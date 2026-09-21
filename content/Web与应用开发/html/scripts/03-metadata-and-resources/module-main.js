// 所属章节：03-元数据与资源引入
// 演示知识点：模块入口：导入 module-message.js 的命名导出并对照模块作用域
// 运行命令：python -m http.server 8003 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 loading.html 加载，页面入口 http://127.0.0.1:8003/scripts/03-metadata-and-resources/loading.html
// 期望结果：end 已存在时执行并写入“模块内变量可读”，模块外读取同一变量为 undefined
import { moduleLabel } from "./module-message.js";

const moduleOnly = "模块内变量可读";
record("module-main：" + moduleLabel);

// 本例模块没有 async；预期 end 已存在，且这段文字成功写入页面。
document.getElementById("module-result").textContent = moduleOnly;
// 对照页面中的“模块外 typeof moduleOnly = undefined”，观察作用域差异。
