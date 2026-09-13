// 两页共用 click 处理器；role 和 tabindex 不会为 div 补齐键盘激活。
document.querySelector("[data-action=mark]").addEventListener("click", () => {
  document.querySelector("#action-result").textContent = "已标为已读。";
});
