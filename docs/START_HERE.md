# 开始使用

Step 1：打开所学技术目录的 README.md，按步骤准备环境。

Step 2：在支持 Notebook 的编辑器中打开对应 .ipynb 文件。

Step 3：按章节说明执行代码或运行配套文件。

正式内容见[总目录索引](../paths/README.md)，交付进度见[项目方案](project-plan.md#当前状态与交付顺序)。

## 可选：使用 Jupyter 阅读

需要已有可用的 Python 3.12 环境；在要阅读的技术目录打开终端。Python 课程按其技术目录 README 安装依赖后，可直接从 Step 2 开始。

Step 1：安装 Notebook 阅读工具。

```bash
python -m pip install notebook==7.6.2 -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

Step 2：启动 Jupyter Notebook。

```bash
python -m notebook
```

Step 3：在浏览器文件列表中打开 .ipynb。

Step 4：结束后在终端按 Ctrl+C，并按提示确认停止。

代码所需内核和课程依赖见技术目录 README。安装依据：[Jupyter 官方说明](https://jupyter.org/install)。

## 编写与反馈

- 新增或修改课程前阅读[项目协议](../AGENTS.md)、[全局七条原则](../AGENTS.md#课程编写的七条原则)、[Notebook 格式与执行方法](notebook-protocol.md)及适用目录的 AGENTS.md；从规划、样章到后续正文和随章示例均按这些要求编写。
- 内容问题提供文件位置与权威依据；运行问题提供工作目录、版本、命令和已去除敏感信息的错误输出。
- 检查与交付按[协作与验收](../AGENTS.md#协作与验收)执行；本入口不另行维护一份验收规则。
