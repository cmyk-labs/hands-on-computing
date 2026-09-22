# pandas 数据处理

本课程收录表格读写、清洗、索引对齐、分组合并、重塑、时间处理与数据质量实践。学习目标和章节范围见 [plan.md](plan.md)，教学约定见 [AGENTS.md](AGENTS.md)，代码写法参考 [Python 编程规范](../../编程语言/python/Python编程规范.md)。

**26 章正文已编写并完成空内核执行，包含 22 章主线和 4 章扩展；HTML 实际页面已检查并附截图。** 从 [Series与DataFrame](01-Series与DataFrame.ipynb)开始，或在[章节目录](plan.md)中按主题选择。

每章选取一道重点练习，提供两级提示和独立参考解析；先完成题目，再核对方法选择、标签、类型、缺失和业务口径。分组、连接与宽长转换采用 pandas 官方原图，按图注与章末来源区分通用机制和本例数据。

标签对齐、写时复制、分箱、时间关系、分组连接、重塑、窗口与分块处理按需配有图示。先追踪一条记录、一个标签或一个时间边界，再对照代码输出；综合实践用数据流程图区分接受的记录与问题记录。辅助学习示意图放在 `image/illustration/`，实际截图保留在 `image/`。

## 环境与依赖

沿用 `hands-on-computing` Conda 环境和 Python 3.12 基线。2026-09-20 在本机 Windows x64 环境核对到 Python 3.12.14，pandas 3.0.6、NumPy 2.5.3、Notebook 7.6.2、ipykernel 7.3.0 均可导入；时区数据包为 tzdata 2026.3。依赖固定在 [requirements.txt](requirements.txt)。26 章均已在该环境从空内核顺序执行并保存输出；首次安装的联合复验范围见文末。

pandas 和 NumPy 用于示例计算，Notebook 用于交互界面，ipykernel 用于执行 Python 单元；tzdata 为跨平台时区数据提供支持。通用阅读工具见[开始使用](../../../docs/START_HERE.md)。工作目录统一为 `content/AI原理与应用/pandas/`，路径相对于该目录。

依赖清单包含课程使用的文件引擎、展示和表达式依赖；SQLite 主实践使用 Python 标准库，不需要外部数据库服务。2026-09-20 以下版本已成功导入，pip check 未发现依赖冲突。

| 功能 | 使用的依赖 | 当前安排 |
| --- | --- | --- |
| Excel 文件读写 | openpyxl 3.1.5 | 多工作表、编号、日期和类型往返已运行 |
| Parquet、Feather 与 Arrow 后端 | PyArrow 25.0.1 | 文件往返及类型互操作已运行；默认 str 使用 pyarrow 存储 |
| 外部数据库与 read_sql_table | SQLAlchemy 及相应驱动 | 仅介绍入口；SQLite 主实践已运行，不安装外部驱动 |
| Styler 和简单图形 | Jinja2 3.1.6、Matplotlib 3.11.2 | HTML 导出与页面显示已检查，三张图已检查；正文附真实页面截图 |
| 表达式计算 | NumExpr 2.14.2 | 两种引擎、类型边界与有限规模计时已运行 |
| 编译加速入口 | Numba、Cython | 仅介绍用途，不增加安装依赖 |

课程使用普通 CPU 和小型自制数据，不要求 GPU、在线接口、账号或付费服务。分块实验记录有限规模的实际耗时及表格内存估计；这些不是其他设备的性能保证，也不等于进程峰值内存。首次安装需要网络。

## 引用版本

课程运行基线为 pandas 3.0.6。篇末保留便于阅读的官方在线文档，并补充 v3.0.6 标签下的文档或 API 源码作固定版本对照；在线页面会随发布更新，不能仅凭链接认定版本一致。整数索引布尔 Series 的 iloc 行为存在指南与本版本实现差异，相关章节同时列出指南与实现源码，并明确文档约定的用法。

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
cd content/AI原理与应用/pandas
```

Step 5：安装基础依赖；沿用项目现有安装源。

```bash
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

本轮在同一 Conda 环境补装 PyArrow、Matplotlib、NumExpr 及所需依赖；pandas 和 NumPy 保持原版本。首次安装的联合复验范围见文末。若遇到依赖冲突，应报告冲突包和版本，再调整课程配置；不另外创建 uv/venv 环境。

## 日常运行

以下操作用于运行已有章节。

Step 1：在新终端激活课程环境。

```bash
conda activate hands-on-computing
```

Step 2：从项目根目录进入课程目录。

```bash
cd content/AI原理与应用/pandas
```

Step 3：启动 Notebook。

```bash
python -m notebook
```

Step 4：打开章节，选择该环境的 Python 3 (ipykernel)，重启内核后从上到下运行。

标明“预期异常”的单元会直接显示原始报错；阅读注释中的原因与实际异常类型后，继续运行下一单元。其他单元应正常执行。

Step 5：完成后在启动 Notebook 的终端按 Ctrl+C，并按提示确认停止。

文件和数据库实验在相应章节说明输入、关闭和清理方式。运行检查同时核对值、行列标签、顺序、dtype、缺失语义与必要的键约束；综合实践两次从空内核执行的文本输出一致。

2026-09-21 已通过本机临时 HTTP 服务在浏览器打开表格展示章生成的 HTML，核对中文标题、三行数值、百分比、红色粗体和缺测底色，并保存正文截图；检查服务已关闭。三张 Matplotlib 图已检查。读者可运行该章“导出并打开 HTML”单元，在清理单元之前将打印的文件路径粘贴到本地浏览器查看。未验证 Excel 桌面显示、外部数据库、SciPy 互操作、编译加速工具和其他版本环境；仅介绍入口的功能不计为已完成实验。

操作依据：[pandas 安装与可选依赖](https://pandas.pydata.org/docs/getting_started/install.html)、[Conda 环境管理](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html)、[pip 依赖清单](https://pip.pypa.io/en/stable/reference/requirements-file-format/)、[Jupyter 安装](https://jupyter.org/install)。

配套输入放在 date/：[商品 CSV](date/02-products.csv)、[测量工作簿](date/19-station-readings.xlsx)、[订单](date/22-orders.csv)、[明细](date/22-lines.csv)和[事件](date/22-events.csv)。这些都是小型自制教学数据，字段、单位与缺失约定见相应章节；读取后保留原文件。分组、连接、重塑、多级索引和时间窗口的辅助示意图放在 image/illustration/，由正文就地引用。

2026-09-21 复验：修订的 02、03、04、11、12、13、14、16、17、19、22、25、26 章共 13 份 Notebook 已从空内核顺序执行并保存真实输出，覆盖整数文本校验、索引语义、持久 CSV／Excel 读取和原有文件往返。全课程 Notebook 格式、代码语法与本地链接检查通过；未在 Excel 桌面程序检查工作簿外观，也未复验首次全新安装。

2026-09-22 练习反馈检查：26 道重点题的解析均已用原题输入实际计算核对。第 25 章调整 Styler 表格宽度与留白后，从空内核执行并保存真实输出；Chrome 153.0.8010.52 中核对标题、三行数据、百分比、红色粗体和缺测底色，更新实际截图，375 像素视口未横向溢出。其余章节的 Code 单元及保存输出保持原样，本轮未将它们记作全章重跑。

2026-09-22 安装复验：在独立的全新 Conda Python 3.12.14 环境中，沿用原清华安装源联合安装本仓库 7 份 requirements.txt；48 项直接依赖版本全部匹配，pip check 无冲突。主要模块导入及数值计算、模型拟合、Excel／Parquet 往返、图形导出和 FastAPI 请求检查通过。此项验证共同环境的安装与代表性功能，不代表各课程分别建环境或全部章节重新执行。
