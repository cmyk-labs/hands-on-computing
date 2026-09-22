# 数据可视化

本课程介绍常用图表怎样绘制和调整，使用 Matplotlib、Seaborn、Plotly、Altair、Bokeh，以及 Vega-Lite、Vega-Embed 特例扩展，覆盖比较、组成占比、变化、分布、关系、不确定性、层级与流向图形，并学习静态与交互导出。章节安排见 [plan.md](plan.md)，教学约定见 [AGENTS.md](AGENTS.md)，代码参考 [Python 编程规范](../../编程语言/python/Python编程规范.md)。

**6/6 章已完成。**图形覆盖见[章节目录](plan.md)，从 [Matplotlib基础绘图](01-Matplotlib基础绘图.ipynb)开始，或按表达目的选择图形。

## 如何学习

首次学习可按 Matplotlib、Seaborn、Plotly 主线逐章运行，再按需要选择 Altair、Bokeh 和 Vega-Lite 扩展。Matplotlib、Seaborn 章内给出分段阅读安排与自查点，便于把图形选择、统计含义和外观设置分开消化。

常用图表按类型展开，每种图集中在一个 Code 单元：注释说明适用场景和数据组织，代码从核心绘制逐步加入常用参数，运行后在下方看到实际成图。先运行例子，再修改数据、颜色、坐标或图形专用参数，观察变化；依赖前文导入或数据的地方在注释中说明。综合示例用于练习组合已学图形。

Figure 与 Axes 的对象关系、Bokeh 的共享对象联动，以及 Vega-Lite 到网页嵌入的流程配有概念示意图。先确定设置作用于哪个对象或步骤，再对照实际代码和成图；示意图不代替图表输出与交互操作。

每章篇末选取一道重点练习，提供两级提示和独立的参考解析。先完成绘图和解释，再核对理由；浏览器操作题仍需亲自检查，解析不代替实际观察。

Plotly、Altair、Bokeh 的综合图附有实际浏览器截图，共 5 张，包含悬停、选择前后及滑块状态。静态阅读器可以查看这些预览；要操作交互图，仍需支持相应输出的 Notebook 前端或导出的 HTML。

## 环境与依赖

沿用 hands-on-computing Conda 环境。工作目录为本课程目录，Notebook 内路径相对于该目录。通用阅读工具见[开始使用](../../../docs/START_HERE.md)。

| 工具 | 已验证版本 | 用途 |
| --- | --- | --- |
| Python | 3.12.14 | 执行代码 |
| NumPy | 2.5.3 | 小数组和教学模拟 |
| pandas | 3.0.6 | 表格与字段映射 |
| Matplotlib | 3.11.2 | 静态绘图与导出 |
| SciPy | 1.18.1 | Seaborn 密度估计等统计计算 |
| Seaborn | 0.13.2 | 统计可视化 |
| Plotly | 7.1.0 | 交互图与 HTML |
| Altair | 6.3.0 | 声明式图表 |
| Bokeh | 3.10.0 | 交互工具与布局 |
| jupyter-bokeh | 4.1.0 | Bokeh 的 Jupyter 前端扩展 |
| vl-convert-python | 1.9.0.post1 | Altair HTML 导出、第 06 章静态预览与本地资源生成 |
| Vega | 6.2.0 | 第 06 章浏览器图形运行时 |
| Vega-Lite | 6.4.1 | 第 06 章图表规范编译；转换接口选择 6.4 |
| Vega-Embed | 7.0.2 | 第 06 章网页嵌入 |
| Notebook | 7.6.2 | 阅读与交互界面 |
| ipykernel | 7.3.0 | Python 内核 |

直接依赖固定在 [requirements.txt](requirements.txt)。2026-09-21 已在本机 Windows x64 的既有 Conda 环境完成补装、导入检查，pip check 未发现依赖冲突；NumPy、pandas 和 Matplotlib 保留原版本。安装与章节执行分别检查。该清单不是所有传递依赖的完整锁文件，全新环境的联合安装复验范围见文末。

第 06 章沿用现有依赖。Vega、Vega-Lite、Vega-Embed 是浏览器资源，本地版由已安装的 vl-convert-python 生成，CDN 版使用章节中固定版本的脚本地址；不另作 pip 安装，也不需要 Node.js 或 npm 构建。本章在 Windows 的 Chromium 153.0.8010.52 中检查，其他浏览器引擎尚未复验。

示例使用普通 CPU、小型本地教学数据和浏览器，无需 GPU、账号或付费接口。首次安装需要网络。HTML 是否需要网络取决于资源导出方式，相关章节分别说明；Plotly 静态导出为选学，Kaleido 及其 Chrome/Chromium 条件不包含在主线安装中。

Plotly 章使用 plotly_mimetype 展示图形，需要 Notebook 前端支持该输出格式；Bokeh 在基于 JupyterLab 的界面中使用 [jupyter-bokeh 扩展](https://github.com/bokeh/jupyter_bokeh)，已纳入依赖。前端未呈现时，按章节打开导出的 HTML。2026-09-22 已在 Notebook 7.6.2 与 Chrome 153 中重新打开当前六章的可信副本，核对 Matplotlib 25 图、Seaborn 24 图、Plotly 14 图、Altair 19 图、Bokeh 15 图和 Vega-Lite 11 张静态预览，共 108 个图形输出；Bokeh 另核对实际画布。其他阅读器仍需按实际前端核对。

2026-09-22 按图表单元重构后，6 章的 164 个代码单元已重新从空内核执行并保存真实输出；静态成图、SVG 导出和交互 HTML 已检查。Plotly、Altair、Bokeh 与 Vega-Lite 的代表性交互此前已在全新浏览器上下文中阻断外部请求后复查通过。本轮补查 Notebook 前端时沿用保存输出，没有再次执行六章，静态预览通过也不代表网页交互已执行。

本轮在重新打开的 Notebook 中实际检查了 Plotly 悬停、图例隐藏与恢复、拖框缩放；Altair 综合图筛选后两组计数从 6 变为 3，双击恢复 6；Bokeh 滑块从 1 到 2 再回到 1、两图共享选择与纵轴缩放均符合预期，原始样本数据不变。

Notebook 7.6.2 快捷键设置组件读取 schema 的前端问题尚未修复，已定位到快捷键注册代码读取缺失插件。既有环境的 JupyterLab 4.6.3／Jupyter Server 2.21.0 与全新环境的 4.6.4／2.21.1 均复现该错误；新环境中 Altair 19 图仍正常渲染，不能把这些传递依赖的小版本变化视为修复。所检图形显示与交互正常；其他浏览器引擎及 Plotly 选学 Kaleido 静态导出仍未复验或执行。

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
cd content/AI原理与应用/data-visualization
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
cd content/AI原理与应用/data-visualization
```

Step 3：启动 Notebook。

```bash
python -m notebook
```

Step 4：打开章节，选择本环境的 Python 3 (ipykernel)，重启内核后从上到下运行。

Step 5：按章节说明打开导出文件，完成查看后执行对应清理操作。

Step 6：在启动 Notebook 的终端按 Ctrl+C，并按提示确认停止。

成功标准包括完整执行和保存真实输出、数据与图形一致、标签和单位清楚，以及相应交互可用。实际检查范围在当次交付中报告；未检查的离线条件或选学导出不计为通过。

## 第 06 章网页运行

Step 1：在 Notebook 中顺序运行第 06 章，生成静态预览、HTML 和 vega-runtime.js。

Step 2：复制输出的 file 地址，在本机浏览器打开；临时目录由本次运行生成，不使用文档中保存的旧地址。

Step 3：按正文检查悬停、滑块、范围选择、计数与双击清除。

Step 4：关闭页面，按正文的清理单元删除本次临时文件。

浏览器不能读取临时目录时，先将整个生成目录复制到可读取的位置；远程 Notebook 需先下载目录。保持 HTML 与 vega-runtime.js 的相对位置。本地资源版使用内嵌数据，可在断网时运行；CDN 版需要外部脚本可达。错误示例故意使用无效图元，显示失败信息是该例预期结果。

需要通过 HTTP 查看时，可用以下本地预览方式。

Step 1：在已激活课程环境的终端进入导出目录；将引号中的占位文字替换为本次实际目录。

```bash
cd "本次生成的导出目录"
```

Step 2：启动仅供本机访问的静态服务。

```bash
python -m http.server 8771 --bind 127.0.0.1
```

Step 3：在浏览器打开 http://127.0.0.1:8771/linked-local.html，检查图表与选择联动。

Step 4：完成后在该终端按 Ctrl+C 停止服务，再清理导出文件。

此服务只提供静态文件；交互在浏览器执行。服务运行时可以阻断外部网络来检查资源依赖，但不要把关闭本机服务造成的页面不可达当作 CDN 依赖问题。

第 06 章环境依据：[vl-convert-python](https://github.com/vega/vl-convert/tree/v1.9.0/vl-convert-python)、[Vega-Embed](https://github.com/vega/vega-embed/tree/v7.0.2)、[Python 本地 HTTP 服务](https://docs.python.org/3.12/library/http.server.html#command-line-usage)。

环境依据：[Conda 环境管理](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html)、[pip 依赖清单](https://pip.pypa.io/en/stable/reference/requirements-file-format/)、[Seaborn 安装](https://seaborn.pydata.org/installing.html)、[Altair 安装](https://altair-viz.github.io/getting_started/installation.html)、[Bokeh 安装](https://docs.bokeh.org/en/latest/docs/first_steps/installation.html)。具体绘图 API 与导出条件在各章篇末定位。

2026-09-22 安装复验：在独立的全新 Conda Python 3.12.14 环境中，沿用原清华安装源联合安装本仓库 7 份 requirements.txt；48 项直接依赖版本全部匹配，pip check 无冲突。主要模块导入及数值计算、模型拟合、Excel／Parquet 往返、图形导出和 FastAPI 请求检查通过。此项验证共同环境的安装与代表性功能，不代表各课程分别建环境或全部章节重新执行。
