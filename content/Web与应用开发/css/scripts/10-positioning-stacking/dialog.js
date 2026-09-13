// 此脚本仅触发 HTML 原生模态功能，布局与绘制由 CSS 和浏览器负责。
const opener = document.querySelector("#open-dialog");
const dialog = document.querySelector("#reading-dialog");
if (typeof dialog.showModal === "function") {
  opener.hidden = false;
  opener.addEventListener("click", () => dialog.showModal());
}
