# HTML

普通页面的标记与工程约定见 [HTML 编程规范](HTML编程规范.md)。

环境：Chrome 152、Python 3.12；Python 只用于配套服务和资源工具，使用标准库。课程安排见 [plan.md](plan.md)，Notebook 查看方式见[开始使用](../../../docs/START_HERE.md)。

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

其他章节使用各自的端口和入口。第 8、11、14、17 章必须按章启动专用服务；第 8 章仅在重新生成媒体时需要 FFmpeg，现成素材可直接使用。

操作依据：[Python 本地服务](https://docs.python.org/3.12/library/http.server.html#command-line-interface)；专用服务的命令与条件见对应 Notebook。
