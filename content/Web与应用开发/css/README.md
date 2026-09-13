# CSS

普通样式的写法与工程约定见 [CSS 编程规范](CSS编程规范.md)。

环境：Chrome 152、Python 3.12；Python 仅用标准库提供本地预览服务。各章新特性的浏览器支持条件单独注明。课程安排见 [plan.md](plan.md)，Notebook 查看方式见[开始使用](../../../docs/START_HERE.md)。

首次使用时，先完成 [Python 运行环境准备](../../编程语言/python/README.md#准备环境)。

## 打开配套页面

Step 1：从项目根目录进入 CSS 目录。

```bash
cd content/Web与应用开发/css
```

Step 2：激活预览服务的 Python 环境。

```bash
conda activate hands-on-computing
```

Step 3：启动第一章本地服务。

```bash
python -m http.server 8101 --bind 127.0.0.1
```

Step 4：打开[第一章页面](http://127.0.0.1:8101/scripts/01-stylesheets-and-syntax/index.html)，在开发者工具查看元素与样式。

Step 5：修改文件后保存并刷新页面。

Step 6：结束后在服务终端按 Ctrl+C。

其他章节使用各自的端口和入口。开发者工具中的临时样式修改，需写回源文件才能保留。

操作依据：[Python 本地服务](https://docs.python.org/3.12/library/http.server.html#command-line-interface)；样式调试操作见对应 Notebook。
