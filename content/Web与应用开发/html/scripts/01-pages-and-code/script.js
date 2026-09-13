// 在 Console 中查看这条消息，确认脚本已经执行。
console.log("交互脚本已加载");

// 点击按钮后只改当前页面的文字；刷新会重新读取 HTML 中的初始文字。
const button = document.querySelector("button");
const statusText = document.querySelector("#status");

button.addEventListener("click", () => {
  statusText.textContent = "JavaScript 已更新这段文字。";
});
