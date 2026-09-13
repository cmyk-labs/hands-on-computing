// 仅模拟内容延后显示，不模拟网络下载速度；图片本身是本地资源。
const revealButton = document.querySelector('#reveal');
revealButton.addEventListener('click', () => {
  revealButton.disabled = true;
  setTimeout(() => {
    document.querySelector('.examples').classList.add('is-ready');
  }, 2000);
});
// 刷新页面可重做；定时器实际执行时刻还受事件循环和页面状态影响。
