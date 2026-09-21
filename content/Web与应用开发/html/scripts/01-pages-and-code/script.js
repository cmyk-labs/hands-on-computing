// 所属章节：01-页面运行与代码书写
// 演示知识点：按钮行为：Console 输出加载消息，click 后更新 #status 段落文字
// 运行命令：python -m http.server 8000 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 roles.html 加载，页面入口 http://127.0.0.1:8000/scripts/01-pages-and-code/roles.html
// 期望结果：Console 显示“交互脚本已加载”，点击按钮后段落变为“JavaScript 已更新这段文字。”
// 在 Console 中查看这条消息，确认脚本已经执行。
console.log("交互脚本已加载");

// 点击按钮后只改当前页面的文字；刷新会重新读取 HTML 中的初始文字。
const button = document.querySelector("button");
const statusText = document.querySelector("#status");

button.addEventListener("click", () => {
  statusText.textContent = "JavaScript 已更新这段文字。";
});
