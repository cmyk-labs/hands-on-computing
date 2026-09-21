# NumPy 数值计算

本课程收录多维数组、向量化、统计、随机采样、线性代数与数值计算实践。学习目标和章节范围见 [plan.md](plan.md)，教学约定见 [AGENTS.md](AGENTS.md)，代码写法参考 [Python 编程规范](../../编程语言/python/Python编程规范.md)。

**26 章正文已编写并完成空内核执行，包含 19 章主线和 7 章扩展。** 从 [数组创建与形状](01-数组创建与形状.ipynb)开始，或在[章节目录](plan.md)中按主题选择。

## 环境与依赖

沿用 `hands-on-computing` Conda 环境和 Python 3.12 基线。2026-09-20 在本机 Windows x64 环境核对到 Python 3.12.14，NumPy 2.5.3、Notebook 7.6.2、ipykernel 7.3.0 均可导入。基础依赖固定在 [requirements.txt](requirements.txt)。已链接章节均已在该环境从空内核顺序执行并保存输出；首次安装流程尚未在全新环境复验。

NumPy 用于示例计算，Notebook 用于交互界面，ipykernel 用于执行 Python 单元。通用阅读工具见[开始使用](../../../docs/START_HERE.md)。示例工作目录统一为 `content/AI原理与应用/NumPy/`，路径相对于该目录。

课程使用普通 CPU 和小型自制数据，不要求 GPU、数据集账号或付费服务。性能章保存本机实际计时及数组存储量，不将其视作其他设备的耗时或进程峰值内存保证。首次安装需要网络；课程不依赖 SciPy、绘图库或 GPU 框架。

## 引用版本

课程引用固定到 NumPy 2.5 文档系列，运行环境保留补丁版本 2.5.3。ascontiguousarray 的至少一维返回条件，以及 mean 对 float16 的中间计算与结果类型，在相应章节单独说明。

## 首次准备

Step 1：首次使用 Conda 时，按 [Conda Windows 安装说明](https://docs.conda.io/projects/conda/en/stable/user-guide/install/windows.html)安装 Miniconda，并打开其终端。

Step 2：创建课程环境；已有同名环境时跳过。

```bash
conda create -n hands-on-computing python=3.12
```

Step 3：激活课程环境。

```bash
conda activate hands-on-computing
```

Step 4：从项目根目录进入课程目录。

```bash
cd content/AI原理与应用/NumPy
```

Step 5：安装基础依赖；沿用项目现有安装源。

```bash
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

本轮沿用已有 NumPy 与 Notebook 版本；同一 Conda 环境中另为 pandas 文件交换、展示与表达式章节补齐依赖，见其[环境说明](../pandas/README.md)。若遇到依赖冲突，应报告冲突包和版本，再调整课程配置；不另外创建 uv/venv 环境。

## 日常运行

以下操作用于运行已有章节。

Step 1：在新终端激活课程环境。

```bash
conda activate hands-on-computing
```

Step 2：从项目根目录进入课程目录。

```bash
cd content/AI原理与应用/NumPy
```

Step 3：启动 Notebook。

```bash
python -m notebook
```

Step 4：打开章节，选择该环境的 Python 3 (ipykernel)，重启内核后从上到下运行。

Step 5：完成后在启动 Notebook 的终端按 Ctrl+C，并按提示确认停止。

文件读写示例使用自制小数据；[测量 CSV](date/19-measurements.csv) 保留在 date/，供综合实践直接读取，其余临时文件按章关闭和清理。内存布局、高级索引、病态方程和频谱示意图位于 image/，正文就地引用，阅读图片不需要安装绘图库。数值、形状、类型和内存共享的成功条件按章给出。互操作扩展仅验证本地 CPU 数组，未验证 GPU 框架、静态类型检查器或编译扩展。

操作依据：[NumPy 安装](https://numpy.org/install/)、[Conda 环境管理](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html)、[pip 依赖清单](https://pip.pypa.io/en/stable/reference/requirements-file-format/)、[Jupyter 安装](https://jupyter.org/install)。

2026-09-21 复验：修订的 06、09、14、15、16、19、20、21、25 章共 9 份 Notebook 已在上述环境从空内核顺序执行，保存真实输出；常量列、相邻大整数与浮点数、数值退化拒绝及 CSV 往返检查通过。全课程 Notebook 格式、代码语法与本地链接检查通过。首次全新安装和上述未覆盖平台仍未复验。
