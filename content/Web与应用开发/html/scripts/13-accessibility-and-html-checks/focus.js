// 所属章节：13-可访问性与 HTML 检查
// 演示知识点：程序聚焦与焦点指示：focus() 移入 tabindex="-1" 说明段、focusin 实时显示当前焦点
// 运行命令：python -m http.server 8013 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 focus.html 加载，浏览器打开 http://127.0.0.1:8013/scripts/13-accessibility-and-html-checks/focus.html
// 期望结果：点击“把焦点移到说明段”后焦点进入 -1 说明段，页面底部实时显示当前焦点名
// focus() 是浏览器 DOM API；此处把焦点移到 tabindex="-1" 的说明段。
document.querySelector("#move-focus").addEventListener("click", () => {
  document.querySelector("#negative").focus(); // 焦点进入说明段，底部焦点名变为 negative。
});
document.addEventListener("focusin", event => {
  document.querySelector("#focus-name").textContent =
    event.target.id || event.target.textContent.trim();
});
