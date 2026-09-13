// focus() 是浏览器 DOM API；此处把焦点移到 tabindex="-1" 的说明段。
document.querySelector("#move-focus").addEventListener("click", () => {
  document.querySelector("#negative").focus();
});
document.addEventListener("focusin", event => {
  document.querySelector("#focus-name").textContent =
    event.target.id || event.target.textContent.trim();
});
