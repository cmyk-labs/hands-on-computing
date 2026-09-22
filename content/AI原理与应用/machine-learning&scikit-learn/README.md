# 机器学习与 scikit-learn

通过公式推导、Python + NumPy 手写实现和框架对照理解机器学习，完成数据处理、训练、评估与复现。

已完成前三章样例及空内核执行：学习任务与估计器、数据划分泛化与基线、回归与分类评估，共 3 篇 Notebook、38 个代码单元。从[学习任务与估计器](01-学习任务与估计器.ipynb)开始，或在[课程规划](plan.md)中选择已实现章节。其余主题尚未实施；现有 28 个主线主题和 8 个扩展主题用于维护范围，最终分章按推导与实现篇幅调整，不固定为 36 章。统一教学要求见[教学补充协议](AGENTS.md)。

算法章按“问题与直觉 → 假设和符号 → 公式与推导 → 小样本计算 → 手写实现 → 框架实现 → 对照实验 → 练习”阅读。适合用图解释的过程直接在代码单元输出中展示；公共准备流程首次展开，后续从 scripts/ 导入复用。

按需加入模型结构图、算法流程图和原理示意图辅助理解。优先使用适合本节且已核查出处、许可与清晰度的权威原图，没有可用原图时再依据权威资料用 SVG 或 Python 绘制；自绘风格、引用和检查要求见[图示协议](AGENTS.md#模型结构图与算法流程图)。

前置知识：Python 函数与类的基本使用、数组与表格操作、基础绘图、向量与矩阵、导数与梯度、条件概率与基本统计量；各主题按实际需要补充。

## 资源位置

| 目录 | 用途 |
| --- | --- |
| data/ | 落盘教学数据与数据说明；包括训练用图像数据集 |
| scripts/ | 已讲解的可复用模块与必要的章节专用脚本 |
| image/illustration/ | 辅助学习的模型结构、算法流程、机制与几何示意图 |
| image/ | 截图和需要另存或复用的实际成图；一般绘图直接保留 Notebook 输出 |

前三章使用 scikit-learn 随包内置数据和单元内的小型合成数组，不写出数据文件；尚无需要跨章抽取的公共流程，因此没有创建 data/ 或 scripts/。两张原创流程示意图放在 image/illustration/，四幅实际绘图保存在 Notebook 输出中。后续有实际内容时再按上述约定创建目录，完整要求见[课程协议](AGENTS.md#数据脚本与图片)。

## 环境与依赖

沿用项目约定的 hands-on-computing Conda 环境和 Python 3.12 基线。2026-09-22 在本机 Windows x64、Python 3.12.14 上核对以下版本，并完成前三章的空内核执行；依赖固定在 [requirements.txt](requirements.txt)。本次补装 scikit-learn、joblib、threadpoolctl 和 cloudpickle，其他已有依赖保持原版本；pip check 未发现依赖冲突。

| 依赖 | 验证版本 | 用途 |
| --- | --- | --- |
| scikit-learn | 1.9.1 | 内置数据、模型接口、划分与评估 |
| NumPy | 2.5.3 | 数组、手写计算与合成数据 |
| SciPy | 1.18.1 | scikit-learn 的数值计算依赖 |
| Matplotlib | 3.11.2 | 直接展示误差、预测和混淆矩阵 |
| Notebook | 7.6.2 | Notebook 阅读与运行界面 |
| ipykernel | 7.3.0 | Python 单元执行内核 |
| joblib | 1.6.0 | scikit-learn 的运行依赖 |
| threadpoolctl | 3.7.0 | 数值库线程管理依赖 |
| narwhals | 2.26.0 | scikit-learn 的数据接口依赖 |
| cloudpickle | 3.1.2 | joblib 的序列化依赖 |

前三章只需 CPU，安装依赖后运行无需联网、账号或付费接口。GPU 可用于后续适合的训练实验：本机本次查询为 NVIDIA GeForce RTX 3050 Laptop GPU，总显存 4096 MiB、当时可用 3497 MiB，驱动 566.07；可用显存随其他程序变化，运行前需重新检查。前三章未引入 PyTorch，尚未验证本课程的 PyTorch/CUDA 组合，也没有 GPU 实验结果；届时按实际模型、批次和显存余量选择设备，并记录版本与显存占用。

梯度训练与多层感知机等主题按需引入 PyTorch，并先解释张量、自动微分与优化器；它不是前三章的依赖。其他平台尚未复验，全新环境的联合安装范围见文末；不把本机执行结果视为所有平台的兼容性保证。

## 首次准备

Step 1：首次使用 Conda 时，按 [Conda Windows 安装说明](https://docs.conda.io/projects/conda/en/stable/user-guide/install/windows.html)安装 Miniconda，并打开其终端。

Step 2：创建项目环境；已有同名环境时跳过。

```bash
conda create -n hands-on-computing python=3.12
```

Step 3：激活环境。

```bash
conda activate hands-on-computing
```

Step 4：从项目根目录进入课程目录；完整路径加引号，避免 & 被终端解释为操作符。

```bash
cd "content/AI原理与应用/machine-learning&scikit-learn"
```

Step 5：安装已固定的课程依赖，沿用项目现有安装源。

```bash
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

Step 6：检查环境内的依赖关系。

```bash
python -m pip check
```

## 日常运行

通用 Notebook 阅读工具见[开始使用](../../../docs/START_HERE.md)。工作目录统一为本课程目录，代码中的路径从该目录出发；各章从空内核独立准备数据，不依赖其他 Notebook 的运行产物。

Step 1：在新终端激活项目环境。

```bash
conda activate hands-on-computing
```

Step 2：从项目根目录进入课程目录。

```bash
cd "content/AI原理与应用/machine-learning&scikit-learn"
```

Step 3：启动 Notebook。

```bash
python -m notebook
```

Step 4：打开章节，选择当前环境的 Python 3 (ipykernel)，重启内核后从上到下运行全部单元。

Step 5：完成后在启动 Notebook 的终端按 Ctrl+C，并按提示确认停止。

成功运行时，手写与库版的对照输出为 True，图形直接显示在相应单元下方。第 03 章特意展示常数目标的 R² 和分类指标零分母产生的 RuntimeWarning、UndefinedMetricWarning；相邻注释写明原因与预期返回值，这些警告不阻断后续单元。随机实验的分数仅描述本次数据与划分，不设固定准确率验收线。

本次已在实际 Jupyter Notebook 页面检查三章的公式、两张 SVG 示意图、四幅输出图和练习解析；内核元数据统一使用当前环境提供的 python3，对应界面中的 Python 3 (ipykernel)。

操作依据：[scikit-learn 安装与依赖](https://scikit-learn.org/stable/install.html)、[Conda 环境管理](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html)、[pip 依赖清单](https://pip.pypa.io/en/stable/reference/requirements-file-format/)、[Jupyter 安装](https://jupyter.org/install)。

[返回总目录索引](../../../paths/README.md#已有课程)

2026-09-22 安装复验：在独立的全新 Conda Python 3.12.14 环境中，沿用原清华安装源联合安装本仓库 7 份 requirements.txt；48 项直接依赖版本全部匹配，pip check 无冲突。主要模块导入及数值计算、模型拟合、Excel／Parquet 往返、图形导出和 FastAPI 请求检查通过。此项验证共同环境的安装与代表性功能，不代表各课程分别建环境或全部章节重新执行。
