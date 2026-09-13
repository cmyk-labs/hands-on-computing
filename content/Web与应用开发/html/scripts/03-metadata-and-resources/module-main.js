import { moduleLabel } from "./module-message.js";

const moduleOnly = "模块内变量可读";
record("module-main：" + moduleLabel);

// 本例模块没有 async；预期 end 已存在，且这段文字成功写入页面。
document.getElementById("module-result").textContent = moduleOnly;
// 对照页面中的“模块外 typeof moduleOnly = undefined”，观察作用域差异。
