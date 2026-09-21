// 所属章节：21-渲染与性能
// 演示知识点：点击按钮禁用自身并延时两秒给示例容器加 is-ready 类，触发两组图片同时显示
// 运行命令：python -m http.server 8101 --bind 127.0.0.1（工作目录 content/Web与应用开发/css）；由 resources.html 引入执行，页面入口 http://127.0.0.1:8101/scripts/21-rendering-and-performance/resources.html
// 期望结果：点击后按钮禁用，约两秒后两组图片同时显示；刷新页面可重做
// 仅模拟内容延后显示，不模拟网络下载速度；图片本身是本地资源。
const revealButton = document.querySelector('#reveal');
revealButton.addEventListener('click', () => {
  revealButton.disabled = true;
  setTimeout(() => {
    document.querySelector('.examples').classList.add('is-ready');
  }, 2000);
});
// 刷新页面可重做；定时器实际执行时刻还受事件循环和页面状态影响。
