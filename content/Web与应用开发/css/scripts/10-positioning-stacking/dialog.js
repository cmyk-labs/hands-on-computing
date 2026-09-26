// 所属章节：10-定位与层叠上下文
// 演示知识点：绑定打开按钮调用 showModal()，关闭交给原生对话框表单
// 运行命令：python -m http.server 8101 --bind 127.0.0.1；浏览器打开 http://127.0.0.1:8101/scripts/10-positioning-stacking/top-layer.html（工作目录 content/Web与应用开发/css）
// 期望结果：点击后把对话框送入顶层，关闭后恢复页面交互
// 此脚本仅触发 HTML 原生模态功能，布局与绘制由 CSS 和浏览器负责。
const opener = document.querySelector("#open-dialog");
const dialog = document.querySelector("#reading-dialog");
opener.addEventListener("click", () => dialog.showModal());
// 点击后显示模态并聚焦关闭按钮；Escape 或原生表单关闭。
