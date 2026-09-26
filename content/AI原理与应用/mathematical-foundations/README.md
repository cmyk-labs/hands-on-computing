# 数学基础

本课程介绍数学表达、线性代数、微积分、矩阵求导、概率统计、信息量、数值计算与采样，以小型推导和 NumPy、SciPy、Matplotlib 实验理解成立条件与计算结果。章节安排见 [plan.md](plan.md)，教学约定见 [AGENTS.md](AGENTS.md)，代码参考 [Python 编程规范](../../编程语言/python/Python编程规范.md)。

**已完成 28/28 章正文与空内核执行，保存真实输出。**从 [数学符号与函数表达](01-数学符号与函数表达.ipynb)开始，或在[章节目录](plan.md)中选择主题。

## 如何学习

课程面向希望理解 AI 常用数学的读者，重点是概念、成立条件、短推导和小型计算。主线与扩展范围见章节目录。

前置知识：高中代数、方程与不等式、函数与平面坐标、基本三角函数；Python 基础语法和数组操作。

先手算或预测，再运行代码核对。每章篇末选取一道重点练习，提供两级提示和独立的参考解析；先完成题目，再按需要查看。解析侧重理由、边界和关键数值，其他练习保留自行推导与实验的空间。

几何与数值关系主要由代码实际成图展示；函数复合、方程组解集、重复抽样、bootstrap、后验预测和状态转移另配原创示意图。按图中引导把对象、方向与公式符号对应起来，再看计算；示意图辅助理解，不替代成立条件与推导。辅助学习示意图放在 `image/illustration/`，实际绘图仍保存在 Notebook 输出中；确需另存的实际成图与截图放在 `image/`。

积分内容包含无穷区间、无界端点与反常积分的收敛判断；联合分布章提供分段阅读安排与自查点。综合建模明确区分“观测减拟合”的统计残差和“预测减观测”的优化误差。

2026-09-22 优化后，28 章共 645 个代码单元已重新从空内核执行并保存真实输出，包括 3 个单独标记的预期异常反例；长代码和复杂计算已补充步骤、维度与原因注释，精简了固定输入的防御检查。章节执行沿用现有依赖；全新环境的安装复验范围见文末。

## 环境与依赖

沿用 hands-on-computing Conda 环境，工作目录为本课程目录，Notebook 内路径相对于该目录。通用阅读工具见[开始使用](../../../docs/START_HERE.md)。

| 工具 | 本轮使用版本 | 用途 |
| --- | --- | --- |
| Python | 3.12.14 | 执行代码 |
| NumPy | 2.5.3 | 数组、矩阵运算与采样 |
| SciPy | 1.18.1 | 数值积分、统计分布与梯度核对 |
| Matplotlib | 3.11.2 | 几何、函数与概率图形 |
| Notebook | 7.6.2 | 阅读与交互界面 |
| ipykernel | 7.3.0 | Python 内核 |

直接依赖固定在 [requirements.txt](requirements.txt)。2026-09-21 已在本机 Windows x64 的既有 Conda 环境补装 SciPy 并核对各包可导入，pip check 未发现依赖冲突；NumPy 和 Matplotlib 保留原版本。安装与章节执行分别检查。该清单不是所有传递依赖的完整锁文件，全新环境的联合安装复验范围见文末。

示例使用普通 CPU 和小型本地数据，无需 GPU、模型权重、账号或付费接口。首次安装需要网络，教学计算不要求在线数据服务。自动微分思想用局部导数与 NumPy 表达，不要求安装自动微分框架。

## 首次准备

Step 1：首次使用 Conda 时，按 [Windows 安装说明](https://docs.conda.io/projects/conda/en/stable/user-guide/install/windows.html)安装并打开 Conda 终端。

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
cd content/AI原理与应用/mathematical-foundations
```

Step 5：沿用项目现有安装源安装依赖。

```bash
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

Step 6：检查已安装包的依赖约束。

```bash
python -m pip check
```

## 日常运行

Step 1：在新终端激活课程环境。

```bash
conda activate hands-on-computing
```

Step 2：从项目根目录进入课程目录。

```bash
cd content/AI原理与应用/mathematical-foundations
```

Step 3：启动 Notebook。

```bash
python -m notebook
```

Step 4：打开章节，选择本环境的 Python 3 (ipykernel)，重启内核后从上到下运行。

第 02、03、06 章各有一个标明“预期 LinAlgError”的独立反例单元，用原始异常展示矩阵不满足条件时的行为。运行到这些单元后阅读错误，再继续下一单元；其他单元出现异常时按实际问题排查。

Step 5：完成后在启动 Notebook 的终端按 Ctrl+C，并按提示确认停止。

成功标准包括保存真实输出，核对公式、形状、残差或误差，说明随机实验的生成条件，并实际检查图形。有限次计算不替代数学证明。实际检查范围在当次交付中报告，未执行章节不计为通过。

环境依据：[Conda 环境管理](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html)、[pip 依赖清单](https://pip.pypa.io/en/stable/reference/requirements-file-format/)、[SciPy 工具链与兼容条件](https://docs.scipy.org/doc/scipy/dev/toolchain.html)。数学定义、定理与具体 API 来源在各章篇末定位。

2026-09-22 安装复验：在独立的全新 Conda Python 3.12.14 环境中，沿用原清华安装源联合安装本仓库 7 份 requirements.txt；48 项直接依赖版本全部匹配，pip check 无冲突。主要模块导入及数值计算、模型拟合、Excel／Parquet 往返、图形导出和 FastAPI 请求检查通过。此项验证共同环境的安装与代表性功能，不代表各课程分别建环境或全部章节重新执行。

## 本次修订与验证范围

2026-09-23 按新协议逐章检查全部 28 章，实际查看全部 76 个 PNG 图形输出和 6 幅 SVG 示意图。沿用 Windows、CPython 3.12.14、NumPy 2.5.3、SciPy 1.18.1、Matplotlib 3.11.2；第 01、04、15、17、21、23 章共 148 个 Code 单元完成空内核重跑并保存真实结果，其余章节核对既有输出。全课程 4 个预期异常逐项匹配。未把模拟结果当作定理证明，也未新增其他平台或后端的数值一致性声明。
