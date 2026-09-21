// 所属章节：22-外部数据与运行时校验
// 演示知识点：instanceof 校验 DOM 节点种类与 input 事件的数量校验
// 运行命令：npm run build:22:browser（工作目录 content/编程语言/typescript）
// 期望结果：生成 .build-browser/browser.js，供 index.html 页面使用
const input = document.querySelector("#quantity");
const output = document.querySelector("#result");
if (!(input instanceof HTMLInputElement) || !(output instanceof HTMLOutputElement)) {
  throw new TypeError("页面需要 input#quantity 和 output#result");
}
input.addEventListener("input", (event: Event) => {
  const target = event.currentTarget;
  if (!(target instanceof HTMLInputElement)) return;
  const quantity = target.valueAsNumber;
  output.textContent = Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= 100
    ? "数量有效：" + quantity : "请输入 1–100 的整数";
});
