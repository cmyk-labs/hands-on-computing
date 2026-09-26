# HTML

普通页面的标记与工程约定见 [HTML 编程规范](HTML编程规范.md)。

环境：Chrome、Python 3.12；既有示例记录使用 Chrome 152，本次复验未记录浏览器精确版本。Python 只用于配套服务，使用标准库。课程安排见 [plan.md](plan.md)，Notebook 查看方式见[开始使用](../../../docs/START_HERE.md)。

首次使用时，先完成 [Python 运行环境准备](../../编程语言/python/README.md#准备环境)。

## 打开配套页面

Step 1：从项目根目录进入 HTML 目录。

```bash
cd content/Web与应用开发/html
```

Step 2：激活预览服务的 Python 环境。

```bash
conda activate hands-on-computing
```

Step 3：启动第一章本地服务。

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Step 4：打开[第一章页面](http://127.0.0.1:8000/scripts/01-pages-and-code/index.html)，修改文件后保存并刷新。

Step 5：结束后在服务终端按 Ctrl+C。

其他章节使用各自的端口和入口。第 8、11、14、17 章必须按章启动专用服务；第 8 章的音视频、字幕和海报已经配套，可直接使用。

操作依据：[Python 本地服务](https://docs.python.org/3.12/library/http.server.html#command-line-interface)；专用服务的命令与条件见对应 Notebook。

## 本次修订与验证范围

2026-09-26 按新协议逐章检查全部 17 章、配套 HTML/CSS/JavaScript/Python 和图示，浏览器为 Chrome（本次未记录精确版本）；7 幅正文示意图、配套 SVG、海报与音视频画面已实际查看。第 08、11、14、17 章简化后的专用服务已启动并验证真实浏览器请求；另检查样式顺序、图片宽度切换、表单 GET/POST/multipart、dialog 两种打开方式、按钮 Enter、SVG viewBox、插槽变化与 HTML/XML MIME 对照。所有本次服务已关闭。

结构、源码语法与本地引用检查通过；这些检查不代表全部页面交互重跑。尚未完成所有浏览器/设备、屏幕阅读器、完整键盘矩阵、原生文件选择器、音频听取及全部练习组合。第 08 章媒体生成器属于作者工具，读者直接使用已配套的媒体文件。
