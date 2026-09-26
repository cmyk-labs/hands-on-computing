# Python

环境：Python 3.12、hands-on-computing Conda 环境；依赖版本见 [requirements.txt](requirements.txt)，课程安排见 [plan.md](plan.md)。

通用代码风格见 [Python 编程规范](Python编程规范.md)；课程约定与教学要求见 [AGENTS.md](AGENTS.md)。

## 准备环境

Step 1：首次使用时按 [Conda 官方说明](https://docs.conda.io/projects/conda/en/stable/user-guide/install/windows.html)安装 Miniconda，并打开安装后提供的命令提示符。

Step 2：创建 Python 环境；已有同名环境时跳过。

```bash
# 完成后环境列表中新增 hands-on-computing；安装日志和依赖明细随解析结果变化。
conda create -n hands-on-computing python=3.12
```

Step 3：激活环境；每次打开新终端都执行。

```bash
# 终端提示当前环境为 hands-on-computing，成功激活通常没有额外输出。
conda activate hands-on-computing
```

## 安装课程依赖

Step 1：从项目根目录进入 Python 目录。

```bash
# 切换到课程目录；成功时通常没有输出。
cd content/编程语言/python
```

Step 2：安装课程依赖；首次使用或清单变更后执行。

```bash
# 安装成功或显示 Requirement already satisfied；具体下载日志随环境变化。
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 运行章节

Step 1：在已激活环境、工作目录为 content/编程语言/python 的终端启动 Notebook。

```bash
# 终端显示本地 Notebook 访问地址；端口与令牌由本次启动决定。
python -m notebook
```

Step 2：打开章节，选择该环境的 Python 3 (ipykernel)，重启内核后从上到下运行。

标明“预期异常”的单元用于直接观察原始错误；看到指定异常后继续下一单元，其他异常应先排查。

Step 3：结束后在终端按 Ctrl+C，并按提示确认停止。

第 35 章使用临时 CPython 运行包，第 36 章的交互游戏需要桌面与键盘；具体条件见对应章节。

## C 扩展工具准备（仅第 34 章）

Step 1：从 [Microsoft 官方页面](https://visualstudio.microsoft.com/visual-cpp-build-tools/)下载并启动 Build Tools 安装器；已有 Visual Studio 时打开 Visual Studio Installer，选择“修改”。

Step 2：选择“使用 C++ 的桌面开发”，保留 MSVC x64/x86 构建工具及 Windows SDK，然后安装。

Step 3：安装完成后重新打开 Conda 终端，激活课程环境。

```bash
# 终端提示当前环境为 hands-on-computing，成功激活通常没有额外输出。
conda activate hands-on-computing
```

随后按“运行章节”打开第 34 章。此工具链用于本课程的 Windows x64 C 扩展示例；Python 依赖仍按 requirements.txt 安装。组件选择见 [Microsoft 安装说明](https://learn.microsoft.com/en-us/cpp/build/vscpp-step-0-installation?view=msvc-170)。

操作依据：[Conda 环境管理](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html#creating-an-environment-with-commands)、[pip 依赖清单](https://pip.pypa.io/en/stable/reference/requirements-file-format/)、[Jupyter 安装](https://jupyter.org/install)。

2026-09-22 安装复验：在独立的全新 Conda Python 3.12.14 环境中，沿用原清华安装源联合安装本仓库 7 份 requirements.txt；48 项直接依赖版本全部匹配，pip check 无冲突。主要模块导入及数值计算、模型拟合、Excel／Parquet 往返、图形导出和 FastAPI 请求检查通过。此项验证共同环境的安装与代表性功能，不代表各课程分别建环境或全部章节重新执行。

## 本次修订与验证范围

2026-09-23 至 09-26 按新协议逐章检查全部 36 章、全部随章源码和图示。使用 Windows x64、CPython 3.12.14 与既有 hands-on-computing 环境；依赖未升级。第 05–10、12–15、17–19、22–36 章共 646 个 Code 单元从空内核顺序执行并保存真实输出，其余 8 章核对既有输出。全课程 98 个预期异常与声明逐项匹配；练习的重点条件变体另行运行。

第 25、30、33 章完成临时构建、安装和消费者/入口检查；第 34 章在 MSVC 下实际编译扩展并通过 27 项测试；第 35 章临时 CPython 3.14.7 常规构建、自由线程 GIL 开/关三条件均已运行，运行包随后清理；第 36 章完成 dummy 驱动下的绘图、事件、有限游戏循环和 16 项测试。远程 CI、C 扩展其他平台/abi3 兼容和真实桌面键盘操作未验证；无窗口检查不代表桌面交互通过。
