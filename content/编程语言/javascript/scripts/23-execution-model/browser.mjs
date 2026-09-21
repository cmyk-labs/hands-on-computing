// 所属章节：23-执行模型与异步调度
// 演示知识点：点击事件中同步代码、微任务与定时器回调的顺序
// 运行命令：python -m http.server 8102 --bind 127.0.0.1，经 http://127.0.0.1:8102/scripts/23-execution-model/index.html 以模块加载（工作目录 content/编程语言/javascript）
// 期望结果：Console 输出 sync start,sync end,promise,microtask,timer
const button = document.querySelector("#run");
const output = document.querySelector("#output");
button.addEventListener("click", () => {
  button.disabled = true;
  const events = ["sync start"];
  Promise.resolve().then(() => events.push("promise"));
  queueMicrotask(() => events.push("microtask"));
  setTimeout(() => {
    events.push("timer");
    output.textContent = events.join("\n");
    console.log(events.join(",")); // → sync start,sync end,promise,microtask,timer
    button.disabled = false;
  }, 0);
  events.push("sync end");
});
