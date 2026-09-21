// 所属章节：13-可访问性与 HTML 检查
// 演示知识点：broken/fixed 两页共用的“标为已读”click 处理器；role 与 tabindex 不会为 div 补齐键盘激活
// 运行命令：python -m http.server 8013 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随两页加载，页面入口 http://127.0.0.1:8013/scripts/13-accessibility-and-html-checks/fixed.html
// 期望结果：两页点击“标为已读”后提示改为已标为已读，broken 页同一 div 用键盘无法触发
// 两页共用 click 处理器；role 和 tabindex 不会为 div 补齐键盘激活。
document.querySelector("[data-action=mark]").addEventListener("click", () => {
  document.querySelector("#action-result").textContent = "已标为已读。";
});
