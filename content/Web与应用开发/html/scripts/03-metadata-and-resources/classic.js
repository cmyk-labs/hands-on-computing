// 所属章节：03-元数据与资源引入
// 演示知识点：head 中经典脚本立即执行，提供 record 日志函数并对照模块外作用域
// 运行命令：python -m http.server 8003 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 loading.html 加载，页面入口 http://127.0.0.1:8003/scripts/03-metadata-and-resources/loading.html
// 期望结果：classic-head 记录末尾元素=false，load 时机最后显示“模块外 typeof moduleOnly = undefined”
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
