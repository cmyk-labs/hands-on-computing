# FastAPI

使用小型 HTTP API 示例学习 FastAPI。章节安排见 [plan.md](plan.md)，教学约定见 [AGENTS.md](AGENTS.md)，代码写法参考 [Python 编程规范](../../编程语言/python/Python编程规范.md)与 [FastAPI 编程规范](FastAPI编程规范.md)。

## 环境与版本

沿用 hands-on-computing Conda 环境。本次运行环境为 Windows、Python 3.12.14；示例使用 FastAPI 和 Pydantic v2，课程依赖版本集中在 [requirements.txt](requirements.txt)。

Notebook 用于阅读并执行代码，Uvicorn 用于需要真实网络的示例。通用阅读工具见[开始使用](../../../docs/START_HERE.md)。

接口测试使用 pytest、HTTPX 与 AnyIO；需要显式管理异步应用生命周期时使用 asgi-lifespan，均通过本目录的依赖清单安装。

应用配置使用 pydantic-settings，数据库示例使用 SQLModel、SQLAlchemy 和本地 SQLite，异步访问使用 aiosqlite。示例不要求单独安装数据库服务。

身份实验使用 PyJWT 和 pwdlib 的 Argon2 支持，只需本地测试用户与运行时生成的临时密钥。

表单与文件上传使用 python-multipart，WebSocket 服务使用 websockets。浏览器示例使用课程附带的小页面，不需要 Node.js 工具链。

客户端生成使用 openapi-python-client，服务端模板使用 Jinja2；生成客户端的示例直接沿用课程 Python 环境。

## 准备环境

Step 1：首次使用时按 [Conda 官方说明](https://docs.conda.io/projects/conda/en/stable/user-guide/install/windows.html)安装 Miniconda，并打开安装后提供的命令提示符。

Step 2：创建 Python 环境；已有同名环境时跳过。

```bash
conda create -n hands-on-computing python=3.12
```

Step 3：激活环境；每次打开新终端都执行。

```bash
conda activate hands-on-computing
```

## 安装课程依赖

Step 1：从项目根目录进入课程目录。

```bash
cd content/Web与应用开发/FastAPI
```

Step 2：安装课程依赖；首次使用或清单变更后执行。

```bash
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 运行章节

Step 1：在已激活环境、工作目录为 content/Web与应用开发/FastAPI 的终端启动 Notebook。

```bash
python -m notebook
```

Step 2：打开章节，选择该环境的 Python 3 (ipykernel)，重启内核后从上到下运行。

Step 3：遇到真实服务实验时，按章节说明在独立终端启动服务，完成调用和浏览器操作后关闭服务。

Step 4：阅读结束后，在 Notebook 服务的终端按 Ctrl+C，并按提示确认停止。

当前依赖组合中，Starlette 的 TestClient 使用 HTTPX 时会显示弃用提示；这一版本仍支持该兼容路径。保存输出保留真实提示，后续更换客户端版本时需重新核对示例。版本行为见 [Starlette 1.6.0 源码的导入分支](https://github.com/Kludex/starlette/blob/1.6.0/starlette/testclient.py#L29-L48)。

## 本地服务的运行选择

当前 Windows / Uvicorn 0.53.0 环境按下表运行服务示例。各章给出具体命令、端口和关闭步骤。

| 学习操作 | 本课程的运行方式 |
| --- | --- |
| 启动 API、调用接口 | 单 worker 本地服务 |
| 修改源码后观察新结果 | 正常停止服务，再重新启动 |
| 对照两个进程的内存和资源 | 在 8150、8151 各启动一个独立服务，分别请求与关闭 |

2026-09-22 复查：本机自动化启动环境中，独立隐藏控制台下的源码变更仍未替换旧 PID；共享端口 --workers 2 的三轮启动均观察到 WinError 10022。部分轮次随后有两个 worker 响应，但启动与控制台信号退出仍未通过完整验收。第 15 章保留机制与环境边界说明，采用上表的可执行流程；两个独立服务的实验不代表共享端口多 worker 部署已经验证通过。


## 综合交付与流式响应的检查范围

第 16 章在正文逐步组合接口后，通过 [独立服务脚本](scripts/16-api-delivery/app.py) 监听本机 8160 端口。Notebook 向本次子进程提供临时数据库路径与凭据，实际检查创建、认证、归属、校验和约束错误，再正常停止、重启并读取 SQLite 中的记录；完成后确认 Engine 释放、进程退出、端口关闭及临时目录删除。没有新增依赖，凭据不写入 Notebook 输出或文件。

第 20 章用真实 HTTP 分别检查完整接收和延迟消费后关闭。客户端只读取第一条事件，不保证服务端只生成一条；检查依据为事件内容与顺序、响应关闭以及 active、closed 的最终状态，产出数仅核对本例 1～3 条的范围。

2026-09-22，第 16、20 章已从空内核顺序重跑并保存输出；第 20 章的浏览器正常完成、首条后关闭与手动关闭另行检查。上述结果不覆盖共享端口多 worker、自动重载、HTTPS、账号系统或全新环境安装。

操作依据：[Conda 环境管理](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html#creating-an-environment-with-commands)、[pip 依赖清单](https://pip.pypa.io/en/stable/reference/requirements-file-format/)、[Jupyter 安装](https://jupyter.org/install)。

2026-09-22 安装复验：在独立的全新 Conda Python 3.12.14 环境中，沿用原清华安装源联合安装本仓库 7 份 requirements.txt；48 项直接依赖版本全部匹配，pip check 无冲突。主要模块导入及数值计算、模型拟合、Excel／Parquet 往返、图形导出和 FastAPI 请求检查通过。此项验证共同环境的安装与代表性功能，不代表各课程分别建环境或全部章节重新执行。
