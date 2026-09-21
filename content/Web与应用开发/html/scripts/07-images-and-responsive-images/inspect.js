// 所属章节：07-图像与响应式图像
// 演示知识点：“读取当前图像”按钮读取 currentSrc、显示宽高与 DPR
// 运行命令：python -m http.server 8007 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 density.html、responsive.html、art-direction.html 加载，页面入口 http://127.0.0.1:8007/scripts/07-images-and-responsive-images/density.html
// 期望结果：点击按钮后显示当前候选 URL、显示宽高与设备像素比
// 本脚本只在独立页面运行；点击按钮后读取当时的浏览器信息。
const sampleImage = document.querySelector("#sample-image");
const inspectButton = document.querySelector("#inspect");
const selectionText = document.querySelector("#selection");

inspectButton.addEventListener("click", () => {
  const bounds = sampleImage.getBoundingClientRect();
  selectionText.textContent = [
    "当前候选 URL：" + sampleImage.currentSrc,
    "显示宽度：" + bounds.width.toFixed(1) + " CSS px",
    "显示高度：" + bounds.height.toFixed(1) + " CSS px",
    "设备像素比 DPR：" + window.devicePixelRatio
  ].join("\n");
});
// 检查：调整视口或重新加载后，再点按钮更新信息。
// currentSrc 表示选择结果；成功显示和网络请求状态仍需在浏览器中核对。
