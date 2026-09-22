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
  // 输入 1 或 100 后分别显示“数量有效：1”“数量有效：100”。
  // 清空，或输入 0、1.5、101 后显示“请输入 1–100 的整数”。
  output.textContent = Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= 100
    ? "数量有效：" + quantity : "请输入 1–100 的整数";
});
