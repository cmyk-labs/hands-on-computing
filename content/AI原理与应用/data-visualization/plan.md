# 数据可视化课程规划

编写规则统一见[全局协议](../../../AGENTS.md)、[Notebook 协议](../../../docs/notebook-protocol.md)及本课程 [AGENTS.md](AGENTS.md)。本规划中的校验、异常、入口与错误恢复条目表示相应主题的教学范围，不要求普通示例预先添加这些结构；全部示例默认输入满足其说明的条件。


学习目标：学会按数据和用途选择图形，组织绘图输入，用各工具画出常用图表，逐步调整颜色、坐标、标签、图例及图形专用参数，并完成静态与交互导出。

前置知识：Python 基础语法、函数与模块导入、NumPy 数组、pandas 表格选择与分组操作，以及均值、标准差和分位数等基本统计概念。其他要求在对应章节单独列出。

归属：`content/AI原理与应用/data-visualization/`。

当前状态：**6/6 章已完成，常见图形补充已完成执行、成图与交互检查**。课程包含 **3 章主线、2 章常规扩展、1 章特例扩展，共 6 章**；每个工具独立一篇 Notebook，Vega-Lite 与 Vega-Embed 围绕图表描述和嵌入合讲。文件采用“二位序号-章节名称.ipynb”，例如 `01-Matplotlib基础绘图.ipynb`。章节链接见下表，实际版本与运行入口见 [README.md](README.md)。

## 范围与组织

主线覆盖 Matplotlib 基础绘图、Seaborn 统计可视化和 Plotly 交互可视化，扩展介绍 Altair 声明式可视化与 Bokeh 交互绘图。数据组织与视觉映射、图形选择、坐标与颜色尺度、文字标注、误差表达、导出资源依赖和工具选型融入相应章节。

特例扩展章收录 Vega-Lite 与 Vega-Embed，按数据可视化主题归入本课程。Vega-Lite 使用 JSON 规范描述图表，Vega-Embed 通过 JavaScript 将图表嵌入网页；二者属于 Web 可视化生态，Altair 提供 Python 接口。本章以直接阅读和修改图表规范、嵌入与交互为重点，并说明各工具的职责；绘图仍采用单元内注释、小例子与逐步调整的写法。

特例章前置知识：JSON 对象与数组、JavaScript 变量与函数、Promise、HTML 元素与脚本加载。

每章先用小数据完成一张可理解的图，再逐类学习常用图表的绘制和调整，必要机制与边界随图讲解，最后用有限范围的综合应用组合已学写法。Matplotlib 承担较完整的绘图基础；其余工具突出各自的数据表达方式与适用任务。每章独立提供输入和导入，练习要求修改数据或参数后重新绘图，并解释变化。

章内按“基础必讲 → 综合实践 → 选学”安排层次；表中未标为选学的内容均须落实。Matplotlib 先讲 Figure 与 Axes、单图和标签，再逐步加入尺度、统计表达、颜色映射、多面板与导出；每次只增加当前任务需要的机制，综合实践复用已解释的设置。图形选择围绕比较、组成与占比、分布、关系、变化和不确定性组织，进阶增加层级与流向。练习要求说明所选图形突出与隐藏了哪些信息。

每种图形指定主要讲解章节，其他章节结合工具机制补充有价值的不同写法。饼图与环形图属于基础必讲内容；矩形树图、旭日图和桑基图归入 Plotly 进阶部分。

常用图表每种图集中在一个 Code 单元，按“适用场景 → 数据组织 → 最小绘制代码 → 常用参数调整 → 实际成图”展开。适用条件、输入含义、参数和观察要点写成代码注释；先写核心绘制，再逐步调整，实际图形紧跟单元输出。参数或方法的对照图可在同一单元并排展示。章节导航、公共概念、交互操作、练习与引用保留 Markdown，避免把读者需要的图表用法写成验收报告。

每章篇末提供一道重点练习的两级提示与独立参考解析；Matplotlib、Seaborn 增加分段阅读安排与自查点。Plotly、Altair、Bokeh 的综合图附实际浏览器截图，支持静态阅读与状态对照，交互操作仍通过代码和导出页面完成。

## 常见图形覆盖

本表按表达目的查找图形，章节编号对应下方正文链接。所列图形均已在正文中讲解并运行，交互示例已检查实际浏览器页面；选学导出的未执行范围见环境说明。

| 表达目的 | 图形 | 主要讲解章节 | 教学重点与其他工具写法 |
| --- | --- | --- | --- |
| 比较大小 | 柱状图 | 01 | 各工具结合自身接口复用 |
| 比较大小 | 水平条形图 | 01 | 标签与排序 |
| 比较大小 | 分组柱状图 | 01 | 组内比较；05 提供交互写法 |
| 组成与占比 | 堆叠柱状图 | 01 | 总量与组成；04、05、06 提供工具写法 |
| 组成与占比 | 百分比堆叠图 | 04 | 分组内归一化与总量信息 |
| 组成与占比 | 饼图 | 01 | 部分与整体、百分比与标签；03、06 提供交互及规范写法 |
| 组成与占比 | 环形图 | 01 | 圆环宽度与整体含义；03、06 提供工具写法 |
| 展示变化 | 折线图 | 01 | 03 说明排序与交互 |
| 展示变化 | 面积图 | 01 | 填充区域；04 提供声明式写法 |
| 展示变化 | 堆叠面积图 | 01 | 分量与总量；04、06 提供工具写法 |
| 观察分布 | 直方图 | 01、02 | 分箱与频数口径 |
| 观察分布 | 核密度图 | 02 | 带宽与边界 |
| 观察分布 | ECDF | 02 | 累计比例 |
| 观察分布 | 箱线图 | 02 | 分位数与原始观测 |
| 观察分布 | 小提琴图 | 02 | 密度形状与原始观测 |
| 观察分布 | 分类散点图 | 02 | 原始观测点、条带图与蜂群图的对照 |
| 分析关系 | 散点图 | 01、02 | 颜色、点形与重叠 |
| 分析关系 | 气泡图 | 03 | 大小编码、单位与悬停 |
| 分析关系 | 热力图 | 01 | 02 提供相关性矩阵，04 提供矩形图元写法 |
| 分析关系 | 回归关系图 | 02 | 拟合线、区间与解释边界 |
| 分析关系 | 联合分布图 | 02 | 二维关系与边缘分布 |
| 分析关系 | 成对关系图 | 02 | 变量两两比较与对角线分布 |
| 表达不确定性 | 误差条 | 01、02 | 统计口径与区间含义 |
| 表达不确定性 | 误差带 | 01 | 区间上下界；05 提供 Band 写法 |
| 展示层级 | 矩形树图 | 03 | 进阶，父子层级与面积 |
| 展示层级 | 旭日图 | 03 | 进阶，路径与层级占比 |
| 展示流向 | 桑基图 | 03 | 进阶，节点、连接与流量 |

2026-09-22 已将 6 章按上述图表单元写法重构，合并分散的数据准备与绘制说明，保留原有图形覆盖；164 个代码单元均重新从空内核顺序执行并保存真实输出。静态图、SVG 导出与交互 HTML 已检查，代表性的本地或内嵌资源交互已在全新浏览器上下文中阻断外部请求后复查。检查范围与未验证事项见环境说明。

科研图表的视觉目标贯穿全部章节，以 Matplotlib 和 Seaborn 作为主要静态示范。交互图保留一致的字体、颜色含义和标注方式。课程聚焦绘图与数据表达；完整统计推导、模型训练和仪表盘应用开发由各自专题承载。

## 章节规划

| 编号 | 章节名称 | 定位 | 计划内容 | 实践与验收目标 |
| --- | --- | --- | --- | --- |
| 01 | [Matplotlib基础绘图](01-Matplotlib基础绘图.ipynb) | 主线 | Figure、Axes 与 Axis；以显式操作 Axes 的写法组织示例；折线图、散点图、柱状图、直方图、图像与热力图；水平条形图、分组与堆叠柱状图、饼图与环形图、面积图与堆叠面积图；子图与布局；坐标尺度、刻度、图例、标注、误差条与误差带；数值到颜色的归一化、色图与色条，比较图的统一颜色范围；字体、样式与图表导出。区分坐标轴尺度与颜色尺度，说明对数尺度的输入条件、缺失数据的显示和散点重叠。依据 M。 | 使用明确标为教学模拟的测量数据，逐步完成单图和多面板结果图；比较同一数据在不同颜色归一化下的显示，核对跨图同色是否表示同值；检查轴标签与单位、色条、误差定义、布局和导出后的可读性。 |
| 02 | [Seaborn统计可视化](02-Seaborn统计可视化.ipynb) | 主线 | 长表与宽表、字段与视觉属性的映射；axes-level 与 figure-level 函数的返回对象、子图组合和尺寸设置；变量关系、分面与多图组织；直方图、核密度估计（KDE）与经验累积分布函数（ECDF），箱线图、小提琴图与原始观测点，条带图与蜂群图对照；回归关系、联合分布、成对关系与相关性热力图；统计聚合与误差区间；样式、显示上下文与调色板。说明分箱、带宽、离散或有界数据的密度估计边界；区分数据离散程度与估计不确定性，检查汇总口径。依据 S。 | 用一张本地小表完成分组分布、变量关系和汇总比较；核对长宽表转换后的观测与映射，以 axes-level 函数组合自定义子图，并比较 figure-level 分面；对照不同分布图及原始点，说明样本量、统计量、区间含义和图形取舍，完成统一风格的静态导出。 |
| 03 | [Plotly交互可视化](03-Plotly交互可视化.ipynb) | 主线 | Plotly Express 入门、图形结构与定制、气泡图、饼图与环形图；进阶矩形树图、旭日图与桑基图；悬停提示、缩放、图例与层级交互和 HTML 导出；区分内嵌与外部 JavaScript 资源及其离线条件。静态导出作为选学，说明 Kaleido 依赖；使用 Kaleido v1 时核查可用的 Chrome 或 Chromium 浏览器及版本兼容条件。依据 P。 | 将小型数据探索结果制作成交互图，在本地浏览器逐项检查悬停、缩放和图例操作；核对导出后的标签、配色与数据一致，并检查所选资源方式的离线可用性；选学实际导出静态文件并检查清晰度与裁切。 |
| 04 | [Altair声明式可视化](04-Altair声明式可视化.ipynb) | 扩展 | 数据、图元与视觉编码；定量、类别、顺序和时间字段；聚合与分箱；堆叠柱状图与百分比堆叠图、面积图与堆叠面积图、矩形热力图；参数、交互选择、条件和过滤；HTML 保存、默认外部 JavaScript 依赖与内嵌资源的离线保存条件。依据 A。 | 用相同数据比较不同编码方式，完成一个可选择或过滤的图表；检查字段类型、聚合口径和选择前后的显示范围；实际打开保存的 HTML 复查交互，并说明资源依赖及离线检查结果。 |
| 05 | [Bokeh交互绘图](05-Bokeh交互绘图.ipynb) | 扩展 | 基础图形与数据源、颜色和大小映射、分组与堆叠条形图、Band 区间带、交互工具、布局、Notebook 展示与 HTML 导出。区分独立 HTML 中运行的浏览器端交互与需要 Bokeh server 执行的 Python 回调；选学最小 CustomJS 回调，使用时另需 JavaScript 函数与事件基础。依据 B。 | 从本地小数据制作带交互工具的多图布局；检查各图的颜色和单位是否一致，并实际打开导出页面核对显示与交互；选学验证 CustomJS 在独立 HTML 中的效果，明确本例是否需要持续运行 Python 服务。 |
| 06 | [Vega-Lite与Vega-Embed可视化](06-Vega-Lite与Vega-Embed可视化.ipynb) | 特例扩展 | Vega-Lite、Vega、Vega-Embed 与 Altair 的职责；JSON 规范的 data、mark、encoding 与字段类型；arc 图元、饼图与环形图、堆叠柱状图与面积图；数据变换、图层和多视图；参数、选择、条件与过滤；使用 JavaScript 的 vegaEmbed 嵌入 HTML，处理异步结果与错误；资源版本、CDN 与本地资源的运行条件。依据 V、A。 | 从小型内嵌数据完成单图和选择联动图；核对 JSON 规范、数据与成图之间的对应关系，在浏览器实际检查悬停、选择、过滤和复位；比较外部资源与本地资源方式，说明联网条件并复查离线显示。 |

## 科研图表的视觉目标

以下是本课程的设计选择，参考官方绘图文档及 Nature 的图表指南。Notebook 展示以屏幕阅读为准；论文导出按最终版面检查，具体投稿规格以目标期刊的要求为准，不直接把某一期刊的字号和尺寸作为课程统一值。

| 方面 | 计划采用的风格与检查重点 | 依据 |
| --- | --- | --- |
| 背景与线条 | 默认白底、深色文字；坐标轴和数据线层次清楚，网格仅在帮助读数时保留并适当弱化。图例、边框和装饰保持简洁，让数据成为视觉主体。 | M、S |
| 字体与字号 | 同一章使用一致的字体家族和字号层次，优先选择清晰的无衬线字体；中文使用本机可用字体并核对缺字、负号和数学符号。缩放到实际阅读尺寸后，标签仍须清楚。 | M、N |
| 配色与辨识 | 分类数据采用色盲友好的离散配色，同一组别跨图保持同色，并按需要辅以线型或点形；连续量采用顺序色图，有明确中心值的量再考虑发散色图。比较同一量的多图统一归一化方式与颜色范围，色条注明变量及适用单位；若任务需要不同范围，明确标示。避免只靠红绿区分组别。 | M、S、N |
| 布局与标注 | 多面板图整齐对齐，间距均衡；必要时使用 a、b、c 面板标识。图例与注释不遮挡数据，轴标签包含变量含义和适用单位，比较图明确坐标范围与尺度。 | M、N |
| 统计表达 | 说明图中展示的是原始观测、统计量还是估计结果；误差条或误差带注明计算口径，区分标准差、标准误与置信区间；检查分组、样本量和缺失值处理是否与图示一致。 | S |
| 样式教学 | 先解释少量必要参数，再介绍 Matplotlib 的 rcParams 与局部样式设置；Seaborn 从 white、ticks 或按任务需要选用的 whitegrid 入手。讲清 notebook 与 paper 上下文的用途，按显示尺寸调整；设置 paper 只是绘图配置，不代表已经满足投稿要求。 | M、S |
| 导出质量 | Matplotlib 和 Seaborn 的综合示例同时练习 PNG 与 SVG 或 PDF 导出，讲清图幅与位图分辨率的关系；逐张检查最终文件的清晰度、裁切、字体和留白。交互工具实际打开 HTML 检查，区分内嵌资源、外部网络资源与持续运行的服务；需要离线阅读时在断网条件下复查。 | M、P、A、B |

绘图风格随小示例逐步建立，样式参数在 Notebook 内就地说明；先让读者看懂每项设置，再复用已经解释过的设置。综合应用展示完整科研风格成图，练习至少包含一次调整图形或布局并说明理由。

## 供读者使用的示例网站

推荐 **[Python Graph Gallery](https://python-graph-gallery.com/)**。该站按图形类型组织示例，并提供代码和说明，适合查找图形、配色、标注与布局方案；Matplotlib 和 Seaborn 两章分别提供对应专题入口。

| 章节 | 推荐示例网站入口 | 官方示例图库 |
| --- | --- | --- |
| Matplotlib基础绘图 | [Python Graph Gallery：Matplotlib](https://python-graph-gallery.com/matplotlib/) | [Matplotlib Examples](https://matplotlib.org/stable/gallery/index.html) |
| Seaborn统计可视化 | [Python Graph Gallery：Seaborn](https://python-graph-gallery.com/seaborn/) | [Seaborn Example Gallery](https://seaborn.pydata.org/examples/index.html) |

使用时先明确要表达的比较、分布、关系或变化，再寻找相应图形，阅读最小示例并替换为自己的小数据。课程优先选取符合科研表达目标的简洁图形，接口行为与适用条件由对应版本的官方文档核对；引用或改编具体示例时保留作者、来源和适用许可。

编写两章正文时，将推荐网站、官方图库和实际参考的具体示例页合并列入篇末“参考与引用来源”，注明各自用途并按网站去重，方便读者继续查阅。

## 实验成本与计划验收

实验按普通 CPU 电脑、少量本地数据和浏览器设计，无需 GPU 或付费接口。沿用 `hands-on-computing` Conda 环境与现有 Python 3.12 基线；实际安装版本、依赖检查和运行步骤集中在 [README.md](README.md)，直接依赖见 [requirements.txt](requirements.txt)。

第 06 章使用浏览器执行 JSON 规范与 JavaScript 嵌入示例，以小型内嵌数据和最少必要 HTML 展示图形。加载 CDN 资源需要网络，本地资源方式已在全新浏览器上下文断网检查；浏览器库不列入 pip 依赖。具体版本、资源生成方式和运行入口见环境说明。

Notebook 是每章唯一教学正文，工作目录为所属课程目录。小数组与小表优先在单元内构造，模拟数据明确标识并固定随机实验所需的种子。Matplotlib 与 Seaborn 的第一批示例先建立可复用的视觉基准，再展开综合图形。

计划验收包含三部分：

- **执行与数据：**Python 部分从空内核顺序执行并保存真实输出；浏览器部分按本章实际入口单独检查，核对长宽表转换、输入、分组、统计量与图形之间的对应关系；比较分箱、带宽和汇总方式变化后的图形，解释原始观测与统计表达的差别。
- **成图与导出：**实际查看 Notebook 图形及导出文件，核对字体、颜色、单位、图例、误差含义、面板布局与裁切；检查比较图的颜色归一化与色条是否一致，同时检查屏幕展示和预定导出尺寸下的可读性。
- **浏览器交互：**实际打开交互图与 HTML，检查悬停、缩放、图例切换，以及示例使用的选择、过滤或回调操作；记录资源方式、服务依赖及离线检查结果，未执行的功能或条件明确注明。

上述要求逐章验收，完成进度见开头与实际章节链接，具体检查结果在对应交付中报告。教学组织遵循 [Notebook 编写协议](../../../docs/notebook-protocol.md)，代码按实际语言参考 [Python 编程规范](../../编程语言/python/Python编程规范.md)、[JavaScript 编程规范](../../编程语言/javascript/JavaScript编程规范.md)和 [HTML 编程规范](../../Web与应用开发/html/HTML编程规范.md)。

## 官方与第一方依据

以下页面已于 2026-09-21 核查，常见图形图库与进阶图形页面于 2026-09-22 补充核查，用于确定课程范围和图表设计方向。正式知识正文编写前，仍须按实际安装版本核对具体 API 与边界；推荐示例网站见上节。

| 标识／网站 | 对应内容与定位 |
| --- | --- |
| M／Matplotlib | [Quick start guide](https://matplotlib.org/stable/users/explain/quick_start.html)：图形组成、显式与隐式接口、文字标注和坐标尺度；[官方图库](https://matplotlib.org/stable/gallery/index.html)：常用图形、统计图、缺失值显示与多面板示例；[样式与 rcParams](https://matplotlib.org/stable/users/explain/customizing.html)：样式设置与局部配置；[Choosing Colormaps](https://matplotlib.org/stable/users/explain/colors/colormaps.html)：顺序、发散和分类色图；[Colormap normalization](https://matplotlib.org/stable/users/explain/colors/colormapnorms.html)：Normalize、LogNorm、TwoSlopeNorm 及其颜色映射与色条示例；[Figure.savefig](https://matplotlib.org/stable/api/_as_gen/matplotlib.figure.Figure.savefig.html)：格式、分辨率与边界参数。 [图形类型总览](https://matplotlib.org/stable/plot_types/index.html)：条形、饼图、面积与区间图形入口。 |
| S／Seaborn | [User guide and tutorial](https://seaborn.pydata.org/tutorial.html)：关系与多图组织入口；[Data structures accepted by seaborn](https://seaborn.pydata.org/tutorial/data_structure.html)：Long-form vs. wide-form data 及转换示例；[Overview of seaborn plotting functions](https://seaborn.pydata.org/tutorial/function_overview.html)：Figure-level vs. axes-level functions、Specifying figure sizes；[Visualizing distributions of data](https://seaborn.pydata.org/tutorial/distributions.html)：分箱、KDE 带宽及边界、ECDF；[Visualizing categorical data](https://seaborn.pydata.org/tutorial/categorical.html)：原始观测点、箱线图与小提琴图；[Statistical estimation and error bars](https://seaborn.pydata.org/tutorial/error_bars.html)：数据离散程度与估计不确定性；[Controlling figure aesthetics](https://seaborn.pydata.org/tutorial/aesthetics.html)：样式、边框与显示上下文；[Choosing color palettes](https://seaborn.pydata.org/tutorial/color_palettes.html)：分类、顺序、发散与 colorblind 配色。 [官方示例图库](https://seaborn.pydata.org/examples/index.html)：分类散点、回归、联合分布、成对关系与热力图入口。 |
| P／Plotly | [Getting started](https://plotly.com/python/getting-started/)：图形创建、显示与定制入口；[Interactive HTML export](https://plotly.com/python/interactive-html-export/)：悬停、缩放、图例交互、HTML 保存及 include_plotlyjs 资源方式；[Static image export](https://plotly.com/python/static-image-export/)：Kaleido 安装、Chrome/Chromium 条件及图像导出，正文按实际版本核对兼容性。 [Python 图形目录](https://plotly.com/python/)：气泡与饼图入口；[矩形树图](https://plotly.com/python/treemaps/)、[旭日图](https://plotly.com/python/sunburst-charts/)、[桑基图](https://plotly.com/python/sankey-diagram/)：层级与流向数据组织及交互。 |
| A／Vega-Altair | [Overview](https://altair-viz.github.io/getting_started/overview.html)：数据、图元与视觉编码；[Encodings](https://altair-viz.github.io/user_guide/encodings/index.html)：字段类型、分箱、聚合和尺度；[Parameters, Conditions, & Filters](https://altair-viz.github.io/user_guide/interactions/parameters.html)：参数、选择、条件与过滤；[Saving Altair Charts](https://altair-viz.github.io/user_guide/saving_charts.html)：HTML 格式、外部 JavaScript 依赖、inline=True 离线保存及额外依赖条件。 [官方示例图库](https://altair-viz.github.io/gallery/index.html)、[百分比堆叠柱状图](https://altair-viz.github.io/gallery/normalized_stacked_bar_chart.html)：堆叠、面积与热力图编码。 |
| B／Bokeh | [First steps](https://docs.bokeh.org/en/latest/docs/first_steps.html)：基础图形、交互工具、布局与数据源；[Displaying and exporting](https://docs.bokeh.org/en/latest/docs/first_steps/first_steps_7.html)：Notebook 展示及文件导出；[JavaScript callbacks](https://docs.bokeh.org/en/latest/docs/user_guide/interaction/js_callbacks.html)：独立文档的交互边界、Python 回调对 Bokeh server 的要求，以及 CustomJS 示例。 [Bar charts](https://docs.bokeh.org/en/latest/docs/user_guide/basic/bars.html)：Grouping、Stacking；[Annotations](https://docs.bokeh.org/en/latest/docs/user_guide/basic/annotations.html)：Bands。 |
| V／Vega 项目 | [Vega-Lite View Specification](https://vega.github.io/vega-lite/docs/spec.html)：单视图规范、图元、编码、变换与视图组合；[Dynamic Behaviors with Parameters](https://vega.github.io/vega-lite/docs/parameter.html)：变量参数、选择参数及条件与过滤；[Embedding Vega-Lite](https://vega.github.io/vega-lite/usage/embed.html)：资源加载、HTML 容器与 vegaEmbed；[Vega-Embed 官方仓库](https://github.com/vega/vega-embed)：Basic Examples 与 API Reference，JavaScript／TypeScript 调用、Promise 返回值、配置及错误处理。 [Arc](https://vega.github.io/vega-lite/docs/arc.html)：饼图与环形图；[Stack](https://vega.github.io/vega-lite/docs/stack.html)、[Area](https://vega.github.io/vega-lite/docs/area.html)：堆叠与面积。 |
| N／Nature research figure guide | [Building and exporting figure panels](https://research-figure-guide.nature.com/figures/building-and-exporting-figure-panels/)：Panel arrangement、Fonts、Accessibility 小节。参考其布局、文字清晰度与颜色可辨识性要求；期刊专属尺寸与字号不作为本课程统一配置。 |
