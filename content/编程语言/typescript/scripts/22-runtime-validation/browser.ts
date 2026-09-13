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
