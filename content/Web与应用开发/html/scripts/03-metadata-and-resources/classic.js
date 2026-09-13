// 日志属于本次页面加载，刷新后重新开始；不会写回磁盘。
const loadingEvents = [];

function record(label) {
  const endExists = document.getElementById("end") !== null;
  const line = label + " | 末尾元素=" + endExists
    + " | readyState=" + document.readyState;
  loadingEvents.push(line);
  console.log(line);

  // head 执行时日志区域也可能尚未解析，先记录，等区域出现后统一显示。
  const logArea = document.getElementById("loading-log");
  if (logArea !== null) {
    logArea.textContent = loadingEvents.join("\n");
  }
}

// 预期：head 中普通经典脚本读不到后面的 end，记录 false 和 loading。
record("classic-head");

document.addEventListener("DOMContentLoaded", () => {
  record("DOMContentLoaded");
});

window.addEventListener("load", () => {
  record("load");
  // module-main.js 已显示其局部变量；此经典脚本仍不能读取那个变量。
  // 预期为 undefined；必须同时看到“模块内变量可读”才能据此比较作用域。
  document.getElementById("scope-result").textContent =
    "模块外 typeof moduleOnly = " + typeof moduleOnly;
});
