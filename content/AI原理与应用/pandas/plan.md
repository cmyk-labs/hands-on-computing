# pandas 数据处理课程规划

学习目标：用 pandas 读取、整理、清洗、连接和汇总表格数据，正确处理标签对齐、类型、缺失值与时间，并建立可复现、可检查的数据处理流程。

前置知识：Python 列表与字典、切片、布尔表达式、函数、模块导入、文件操作，以及数组形状、数据类型和逐元素运算。SQL、正则表达式等要求按章单独列出。

归属：`content/AI原理与应用/pandas/`。环境与运行见 [README.md](README.md)，教学约定见 [AGENTS.md](AGENTS.md)。

当前状态：**26 章正文已编写，均已从空内核顺序执行并保存真实输出**。课程包括主线 **22 章**、扩展 **4 章**，共 **26 章**。每行对应一份 Notebook，文件采用“二位序号-章节名称.ipynb”，例如 `01-Series与DataFrame.ipynb`；下表提供全部正文链接。

26 章均为一道重点练习补充两级提示和独立参考解析，覆盖方法选择与可核对结果；运行检查的具体范围见 README.md。

## 范围与组织

主线覆盖数据结构、读写、选择与赋值、索引对齐、写时复制、类型转换、缺失与重复、统计与函数应用、文本、分类、分组、连接、重塑、多级索引、时间与窗口、数据质量及内存控制。扩展涵盖 Arrow 与稀疏表示、表格展示和性能工具。

以 **pandas 3 系列**组织教学，Copy-on-Write（写时复制）和默认字符串类型纳入基础主线；旧教程中的写法在相应主题就地辨析，不把 pandas 2 的行为作为通用规则。各章从几行可直接检查的数据开始，独立给出输入，不依赖其他 Notebook 的中间文件。

“全面”指主要数据处理任务、关键机制和常见失败边界都有明确归属。罕见格式提供选型入口，不逐一展开 HDF5、ORC、SAS、SPSS、Stata、Iceberg 或远程存储；分布式系统、扩展类型开发、完整统计建模和图形设计不纳入实现训练。全部正文保存实际执行输出；选学入口与已执行实验分别说明。

章节内区分“必讲”“边界”“选学”：必讲用于完成基本任务；边界通过小型反例解释，属于基本验收；选学增加深度，不作为进入后续主线的前提。扩展章节整体按需学习，其中的必讲内容是选读该章时的核心范围。时间解析、对齐重采样、窗口计算各有独立任务，先理解时间表示再进行时间匹配。

## 主线章节

### 数据结构与基本操作

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 01. [Series与DataFrame](01-Series与DataFrame.ipynb) | Python 列表、字典、模块导入、数组形状。 | 必讲：Series、DataFrame、Index 的分工；从列表、字典和数组构造；行列标签、轴、shape、dtypes；head、tail、info；单列与多列选择、简单列计算。边界：标量、Series、DataFrame 结果的区别。 | 创建小型测量表，核对标签、形状与类型；先认识标签，不提前展开全部索引机制。 | P01、P02 |
| 02. [CSV与JSON数据读写](02-CSV与JSON数据读写.ipynb) | 文件与路径、字典与列表、DataFrame。 | 必讲：read_csv、to_csv、read_json、to_json；分隔符、表头、索引列、usecols、dtype、编码；缺失标记、日期解析；JSON 的 orient 与 JSON Lines。边界：前导零编号、错误行、文本往返不能自动恢复全部信息。选学：json_normalize 的嵌套记录展开。 | 读写自制小文件，核对列名、编号、类型与缺失项；比较不同 JSON 结构；日期和缺失值先使用显式参数，机制在对应主题展开。 | P03 |
| 03. [行列选择与条件筛选](03-行列选择与条件筛选.ipynb) | Python 切片、布尔表达式、行列标签。 | 必讲：[]、loc、iloc、at、iat；标签与位置切片；行列同时选择；isin、between、复合条件；sample 的 n、frac、replace、random_state。边界：整数标签、空结果、缺失标签与样本规模；带标签掩码的对齐条件。选学：where、mask、加权采样、query 的用途；可空掩码的三值逻辑在类型与缺失主题展开。 | 对同一表按位置、标签和条件选择，核对结果顺序；固定输入顺序和 random_state 重复采样，检验有无放回及样本规模。 | P04、P28 |
| 04. [索引管理与自动对齐](04-索引管理与自动对齐.ipynb) | Series 与 DataFrame、标签选择、算术运算。 | 必讲：Index、RangeIndex；set_index、reset_index、rename、reindex、align；算术、赋值和布尔 Series 的标签对齐；DataFrame 与 Series 的 add、sub、mul、div，axis="index" 匹配行标签，axis="columns" 匹配列标签；fill_value 单独用两个 DataFrame 讲解。边界：默认按列标签匹配 Series；单侧与双侧缺失的填充差别；索引唯一性；to_numpy 的位置语义与类型变化。选学：索引的集合关系。 | 对乱序标签验证运算与赋值的对齐；同一张表分别按行、列标签减去基准 Series，核对标签和数值；另用两个 DataFrame 检查单侧缺失与双方同位置均缺失的结果；检查 reindex 引入的缺失值。 | P01、P02、P04、P08 |
| 05. [赋值更新与写时复制](05-赋值更新与写时复制.ipynb) | 标签对齐、loc、Python 赋值与对象引用。 | 必讲：列创建、assign、insert、drop、pop、条件赋值；DataFrame.update 的标签对齐更新；别名、派生对象、copy 与 Copy-on-Write。边界：update 修改调用对象、只保留原表行列范围、默认用非缺失值覆盖；链式赋值、列上的 inplace 调用、NumPy 共享数组的只读行为。选学：update 的 overwrite、errors 与冲突检查。 | 分别修改别名和派生对象，检查副作用；用 loc 改写链式赋值；以打乱标签及新增标签的更新表核对 update 的修改范围。 | P04、P05、P29 |
| 06. [数据类型与转换](06-数据类型与转换.ipynb) | 数值与字符串、数组 dtype、缺失值基本概念。 | 必讲：NumPy dtype 与扩展类型；object、默认 str、显式 string；可空整数、浮点与布尔；astype、to_numeric、convert_dtypes、select_dtypes。边界：解析失败、数值范围、缺失语义与可空布尔三值逻辑；to_numpy 与 array。选学：infer_objects、降位宽、Arrow 后端入口。 | 转换混合输入并保留解析失败记录；核对范围、dtype 与缺失标记；用小型真值表观察可空布尔运算。 | P02、P06、P07、P10、P20 |
| 07. [缺失值重复值与清洗](07-缺失值重复值与清洗.ipynb) | 类型转换、可空布尔、条件筛选、索引与列。 | 必讲：None、NaN、NaT、pd.NA；isna、notna；dropna、fillna、ffill、bfill、replace；combine_first 按标签补齐缺失值；duplicated、drop_duplicates。边界：空字符串与无穷值、skipna、min_count、含 NA 的筛选；combine_first 返回新结果且可扩展标签，与 update 的更新范围不同；重复数据行与重复标签。选学：interpolate 的条件与限制。 | 制定列级缺失与去重规则，核对行数、键及类型；用乱序标签验证补齐优先级、原表是否改变和结果标签范围。 | P04、P07、P08、P29 |
| 08. [统计排序与函数应用](08-统计排序与函数应用.ipynb) | 聚合、轴、函数、缺失值处理。 | 必讲：count、size、sum、mean、std、quantile、describe；value_counts、nunique；sort_values、sort_index；map、apply、agg、transform 的输入输出差别。边界：numeric_only、skipna、ddof、稳定排序。选学：rank、nlargest、累计运算、相关与协方差（含有效配对与缺失值边界）；优先选择已有内置操作。 | 生成统计与排序结果，核对有效样本数、口径和结果形状；为简单任务比较内置操作与函数应用。 | P02、P09 |

### 文本分类与表格组合

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 09. [文本数据与模式提取](09-文本数据与模式提取.ipynb) | Python 字符串、正则表达式基础、缺失值。 | 必讲：str 访问器；大小写、空白、长度、切片；contains、match、fullmatch；split、extract、replace。边界：字面字符串与正则参数、捕获组、缺失结果、文本 dtype。选学：extractall、cat、字符串规范化。 | 清洗标识与地址文本，提取字段并保留不匹配项；以标点、空串和缺失输入核对规则。 | P10 |
| 10. [分类数据分箱与编码](10-分类数据分箱与编码.ipynb) | 数据类型、排序、频数与区间。 | 必讲：Categorical、CategoricalDtype；类别、编码、顺序与缺失；类别管理；cut、qcut；get_dummies。边界：有序与无序比较、分箱端点、未见类别、编码列集合对齐。选学：IntervalIndex、factorize、from_dummies。 | 定义固定类别顺序，比较等宽和等频分箱；核对缺失、未见类别与边界值，输出稳定的编码列集合。 | P11、P14 |
| 11. [分组聚合与组内变换](11-分组聚合与组内变换.ipynb) | 分类、聚合、索引、函数。 | 必讲：split-apply-combine；单键、多键分组与命名聚合；认识多键聚合结果的 MultiIndex：层级、层级名称、元组标签；reset_index 将分组键转回普通列；在此基础上按索引级别分组；agg、transform、filter；size 与 count。边界：as_index、sort、dropna、observed；缺失键与未观测分类。选学：apply、group_keys、Grouper；组内排名、累计、shift、diff。 | 输出分组摘要和组内标准化结果，检查组键、行数与索引；识别多键聚合结果的层级与元组标签，核对 reset_index 前后的分组键和聚合值；显式设置影响结果的参数；自定义 apply 只在内置操作不足时展开。 | P12、P15、P25 |
| 12. [表格连接拼接与比较](12-表格连接拼接与比较.ipynb) | 表格键、索引、分组、缺失值。 | 必讲：concat 的轴与 join；merge、join 的内外连接；一对一、一对多、多对多；validate、indicator、suffixes。边界：空键匹配、重复键导致行数膨胀、拼接标签对齐。选学：concat 的 keys、交叉连接、反连接与 compare；时间近邻匹配另在时间对齐主题讲解。 | 连接自制订单和明细表，核对键关系、未匹配项与行数；加入重复键检查 validate 是否能发现问题。 | P13、P25 |
| 13. [宽长转换与透视汇总](13-宽长转换与透视汇总.ipynb) | 分组聚合、普通索引与 MultiIndex 基础、表格键。 | 必讲：melt、pivot、pivot_table；stack、unstack；crosstab；explode。边界：重复键与聚合、缺失组合、分类和总计；重排与信息压缩的区别。选学：wide_to_long 与多列展开。 | 宽长转换并在满足条件时恢复；对重复键指定聚合，检查透视总量与展开后的记录数。 | P14 |
| 14. [多级索引与高级选择](14-多级索引与高级选择.ipynb) | MultiIndex 的层级与元组标签、标签选择、排序与重塑。 | 必讲：MultiIndex 的显式构造；xs、部分键；swaplevel、reorder_levels、sort_index。边界：排序对切片的影响，按层级聚合与对齐。选学：IndexSlice；RangeIndex、DatetimeIndex、CategoricalIndex、IntervalIndex 的适用入口。 | 为地区和日期标签建立多级索引，完成截面选择与层级变换；核对排序条件及结果标签。 | P15 |

### 时间数据与外部数据

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 15. [日期时间时区与时间差](15-日期时间时区与时间差.ipynb) | 日期、时间、时区的基本含义，索引与类型转换。 | 必讲：Timestamp、DatetimeIndex、to_datetime、date_range；format、errors、unit、origin、utc；dt、时间切片；tz_localize、tz_convert；Timedelta、to_timedelta。边界：夏令时歧义和不存在时间、NaT、精度与范围。选学：Period、时间偏移与工作日历。 | 统一自制时间输入、计算间隔、转换时区；检查夏令时歧义及不存在时间，记录实际时间单位，不假定所有输入都是纳秒精度。 | P16、P25 |
| 16. [时间对齐与重采样](16-时间对齐与重采样.ipynb) | 时间索引、时区、时间差、表格连接与聚合。 | 必讲：asfreq 与 resample；上下采样与填充；closed、label；shift、diff；merge_asof 的近邻匹配。边界：时间键排序、by 分组、direction、tolerance、allow_exact_matches；匹配方向与填充可能引入未来数据。选学：重采样的 origin、offset；merge_ordered。 | 对不规则观测重采样并核对桶边界；按时间关联事件与测量值，检查方向、容差、未匹配项和分组内对应关系。 | P13、P16、P30 |
| 17. [滑动窗口与累计窗口](17-滑动窗口与累计窗口.ipynb) | 时间索引、聚合、分组、时间差。 | 必讲：rolling 的行数窗口与时间窗口；min_periods、center、closed；expanding。边界：窗口起止、缺失观测与有效样本数，中心窗口可能包含未来观测。选学：ewm 的权重和缺失处理；分组窗口的输出索引与对齐。 | 用可手算序列核对窗口成员和移动指标；对照固定行数与时间长度，检查默认 min_periods 的差别；选学输出检查索引。 | P17 |
| 18. [SQL数据交换](18-SQL数据交换.ipynb) | SQL SELECT、WHERE、表与主键、连接和资源关闭。 | 必讲：read_sql_query、to_sql；SQLite 连接、查询参数、dtype、日期解析；if_exists、index。边界：事务条件、数据库类型映射与连接关闭。选学：chunksize、批次写入、外部数据库连接和 read_sql_table 的额外要求。 | 使用临时 SQLite 数据库往返读写，检查列、键和记录；验证参数化查询并关闭连接。 | P03、P18 |
| 19. [Excel与列式文件](19-Excel与列式文件.ipynb) | 文件读写、dtype、缺失值、表格索引。 | 必讲：read_excel、ExcelFile、ExcelWriter、to_excel；多工作表；Parquet 读写；openpyxl 与 PyArrow 的用途。边界：编号和日期解析、引擎选择、索引保存与 dtype 往返。选学：Feather、列选择、压缩及其他格式入口。 | 对自制工作簿和 Parquet 文件往返读写，检查值、索引和类型；在本章编写时补齐并验证相应依赖。 | P03、P20、P26 |

### 质量规模与综合实践

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 20. [数据质量与可复现流程](20-数据质量与可复现流程.ipynb) | 清洗、连接、分组、函数与异常处理。 | 必讲：列名、dtype、必填值、键唯一性、范围、集合成员和行数约束；equals、compare、assert_frame_equal；pipe；保留原始输入和显式参数。边界：浮点容差与排序约定；同一原始输入、参数及约定环境得到一致输出，属于可复现性；仅对明确要求的步骤检查再次处理结果不变的幂等性。 | 以正常与异常输入验证规则，错误定位到原输入；从同一原始数据重复运行；对约定的去重或规范化步骤单独检查幂等，不要求单位换算、累计等任意变换都幂等。 | P08、P13、P19 |
| 21. [内存控制与分块处理](21-内存控制与分块处理.ipynb) | dtype、聚合、CSV 读写、函数。 | 必讲：info、memory_usage(deep=True)；列裁剪、类型选择、分类压缩；chunksize、可合并统计量与分块均值的计数权重。边界：跨块去重、全局排序和连接；避免循环 concat；内存估计不等于进程峰值。选学：超过内存时其他工具的选择入口。 | 比较完整读取与分块统计，核对结果并记录实际内存估计和耗时；限制规模，不以大文件或固定加速比验收。 | P02、P13、P21 |
| 22. [表格数据处理综合实践](22-表格数据处理综合实践.ipynb) | 数据读写、清洗、分组、连接、重塑、时间与质量检查。 | 必讲：自制订单、明细和事件数据的类型约定、清洗、键校验、关联、汇总与导出；明确金额单位、时区与口径；输出结果表和错误记录。边界：空输入、重复键、缺失值、时间匹配和随机抽样条件。 | 从空内核完成可复现处理，手算核对部分样本；检查连接基数、总量、时间边界和导出往返；主实践使用 CSV、JSON 或 SQLite，不依赖远程服务。 | P03、P07、P12、P13、P14、P16、P18、P19、P28、P30 |

## 扩展章节

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 23. [Arrow数据类型与互操作](23-Arrow数据类型与互操作.ipynb) | 扩展 dtype、缺失值、格式读写、内存估计。 | 必讲：ArrowDtype、dtype_backend；PyArrow 读写引擎与存储后端的区别；字符串类型与操作支持。边界：NumPy 转换、复制与类型变化，Arrow 不保证总是零复制。选学：Arrow Table 往返及其索引元数据、内存共享条件。 | 用含缺失值的小表检查类型与操作结果；比较不同后端读取结果；核对转换后的标签、dtype 和缺失值。 | P20、P26、P31 |
| 24. [稀疏数据表示](24-稀疏数据表示.ipynb) | dtype、缺失值、内存估计、数组转换。 | 必讲：SparseArray、SparseDtype、fill_value、稀疏访问器；稀疏表示与计算。边界：填充值不等于缺失值；NumPy 转换与稠密化成本；存储优势取决于密度和表示。选学：与 SciPy 稀疏矩阵互操作的入口；有实际示例再引入依赖。 | 对不同密度和填充值的小数据比较表示及内存估计；核对稠密化前后结果，不假定稀疏格式总是更省内存。 | P22 |
| 25. [表格展示与结果导出](25-表格展示与结果导出.ipynb) | DataFrame、格式化、文件导出。 | 必讲：display 选项、option_context、to_string、to_html；Styler 的格式、缺失展示、条件样式与导出。边界：显示格式与底层值的区别。选学：plot、hist、boxplot 的简单数据检查，绘图后端及可选依赖。 | 输出小型 HTML 表格并检查实际页面；确认格式化没有改变数据；选学图形注明字段与单位。 | P23、P24、P26 |
| 26. [表达式与计算性能](26-表达式与计算性能.ipynb) | 函数、向量化、性能测量、结果比较。 | 必讲：内置运算、map、apply 与迭代的选择；先核对正确性再计时；eval、query 的用途与可信表达式边界。边界：NumExpr 的支持范围、规模条件与准备成本；不同引擎的类型限制。选学：Numba、Cython 的用途入口，有收益目标时才添加最小实验。 | 测量有限规模的同一任务，先核对标签、dtype 与数值；不预定加速倍数；选学依赖随实际实验补齐。 | P09、P27 |

## 交付顺序与实验成本

第 01 章教学写法已确认。本轮按规划完成全部主线与扩展章节，先完成 NumPy，再推进 pandas；每章分别核查来源、执行和审校，完成一章即补入下一章。扩展章节仍保留选读定位。

| 阶段 | 预期成果 | 资源安排 |
| --- | --- | --- |
| 01–08 | 能读写和清洗小表，解释标签、类型和修改行为 | 普通 CPU；单元内数据和少量本地文本文件 |
| 09–17 | 能处理文本、分类、多表与时间数据 | 小型自制输入；时间实验标明时区和时间单位 |
| 18–22 | 可校验、可复现的数据处理 Notebook | 本地 SQLite；Excel 与 Parquet 按需引入引擎；分块实验限制数据量 |
| 23–26 | 能评估表示、展示与性能工具的条件 | PyArrow、Jinja2、Matplotlib 与 NumExpr 已列入环境；Numba、Cython 仅作选学入口 |

不要求 GPU、在线数据接口、外部数据库或付费账号；使用模拟数据时明确标注。分块实验保存有限规模的实际耗时和表格内存估计，不将其称为进程峰值或固定加速收益。依赖版本、实际执行范围及未验证事项集中在 README.md。

## 规划依据与版本边界

核查日期：**2026-09-20**。本次官方文档标识为 **pandas 3.0.6**。官方页面会更新，正文写作时仍需按实际版本核查函数参数、默认值与具体边界。章节编排、输入主题和验收任务属于本项目教学设计。

主要来源为 **pandas 官方文档（pandas.pydata.org）**，Arrow Table 互操作补充 **Apache Arrow 官方文档（arrow.apache.org）**。按主题列出直接页面与定位；正文写作须进一步核对实际使用的 API 条件。

pandas 官方文档：

| 编号 | 官方页面与定位 |
| --- | --- |
| P01 | [Intro to data structures](https://pandas.pydata.org/docs/user_guide/dsintro.html)：Series、DataFrame、构造、标签和算术对齐。 |
| P02 | [Essential basic functionality](https://pandas.pydata.org/docs/user_guide/basics.html)：查看数据、底层表示、描述统计、函数应用、重建索引、排序和 dtype；[Flexible binary operations](https://pandas.pydata.org/docs/user_guide/basics.html#flexible-binary-operations)：Matching / broadcasting behavior 中的 Series 轴匹配，以及 Missing data / operations with fill values 中两个 DataFrame 的单侧、双侧缺失示例。 |
| P03 | [IO tools](https://pandas.pydata.org/docs/user_guide/io.html)：CSV & text files、JSON、Excel files、Feather、Parquet、SQL queries；[json_normalize](https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html)：record_path、meta、sep 与嵌套数据。 |
| P04 | [Indexing and selecting data](https://pandas.pydata.org/docs/user_guide/indexing.html)：标签、位置、布尔索引、赋值、where、query、重复数据及索引对齐。 |
| P05 | [Copy-on-Write](https://pandas.pydata.org/docs/user_guide/copy_on_write.html)：Migrating、Chained Assignment、Read-only NumPy arrays 与 Patterns to avoid。 |
| P06 | [Nullable integer data type](https://pandas.pydata.org/docs/user_guide/integer_na.html)：构造、类型推断与运算；[Nullable Boolean data type](https://pandas.pydata.org/docs/user_guide/boolean.html)：含 NA 的索引与三值逻辑。 |
| P07 | [Working with missing data](https://pandas.pydata.org/docs/user_guide/missing_data.html)：缺失标记、NA semantics、计算、删除、填充和插值。 |
| P08 | [Duplicate Labels](https://pandas.pydata.org/docs/user_guide/duplicates.html)：重复标签的影响、检测与禁止；重复行另见 P04。 |
| P09 | [Essential basic functionality](https://pandas.pydata.org/docs/user_guide/basics.html)：Function application、Iteration 与统计；结合 P12 核查分组 UDF，结合 P27 核查性能。 |
| P10 | [Working with text data](https://pandas.pydata.org/docs/user_guide/text.html)：字符串类型、拆分替换、拼接和模式提取；[String dtype migration](https://pandas.pydata.org/docs/user_guide/migration-3-strings.html)：pandas 3 默认字符串、缺失标记、后端与兼容差异。 |
| P11 | [Categorical data](https://pandas.pydata.org/docs/user_guide/categorical.html)：类别管理、顺序、比较、缺失和内存；分箱与编码见 P14。 |
| P12 | [Group by](https://pandas.pydata.org/docs/user_guide/groupby.html)：分组、Aggregation、Transformation、Filtration、apply 与分类分组；Aggregation 中多键聚合的 MultiIndex 结果、as_index 与 reset_index。 |
| P13 | [Merge, join, concatenate and compare](https://pandas.pydata.org/docs/user_guide/merging.html)：拼接、键关系验证、时序连接与比较；[merge](https://pandas.pydata.org/docs/reference/api/pandas.merge.html)：how、validate、indicator 和空键匹配 Warning。 |
| P14 | [Reshaping and pivot tables](https://pandas.pydata.org/docs/user_guide/reshaping.html)：pivot、stack、melt、get_dummies、explode、crosstab、cut 与 factorize。 |
| P15 | [MultiIndex / advanced indexing](https://pandas.pydata.org/docs/user_guide/advanced.html)：Hierarchical indexing (MultiIndex) 中的层级、元组标签与层级名称；层级构造、选择、排序与各类索引。 |
| P16 | [Time series / date functionality](https://pandas.pydata.org/docs/user_guide/timeseries.html)：时间转换、索引、偏移、重采样、Period 和时区；[Time deltas](https://pandas.pydata.org/docs/user_guide/timedeltas.html)：解析、运算、归约与频率转换。 |
| P17 | [Windowing operations](https://pandas.pydata.org/docs/user_guide/window.html)：Rolling、Expanding、Exponentially weighted window 与窗口边界。 |
| P18 | [read_sql_query](https://pandas.pydata.org/docs/reference/api/pandas.read_sql_query.html)：连接、params、parse_dates、chunksize 与 dtype_backend；[read_sql_table](https://pandas.pydata.org/docs/reference/api/pandas.read_sql_table.html)：连接要求；[DataFrame.to_sql](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_sql.html)：con 的事务条件、if_exists、dtype、批量写入及连接关闭。 |
| P19 | [assert_frame_equal](https://pandas.pydata.org/docs/reference/api/pandas.testing.assert_frame_equal.html)：dtype、标签顺序、精确与容差比较；[DataFrame.pipe](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.pipe.html)：可组合处理函数；[DataFrame.drop_duplicates](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html)：subset、keep、ignore_index。流程可复现与特定步骤幂等的验收范围由本项目明确约定，不归为所有 pandas 操作的共同保证。 |
| P20 | [PyArrow Functionality](https://pandas.pydata.org/docs/user_guide/pyarrow.html)：Data Structure Integration、Operations、I/O Reading 和不同字符串类型；安装条件见 P26。 |
| P21 | [Scaling to large datasets](https://pandas.pydata.org/docs/user_guide/scale.html)：少读数据、有效 dtype、分块和其他工具入口。 |
| P22 | [Sparse data structures](https://pandas.pydata.org/docs/user_guide/sparse.html)：SparseArray、SparseDtype、稀疏访问器和计算。 |
| P23 | [Options and settings](https://pandas.pydata.org/docs/user_guide/options.html)：显示选项、option_context；[Table Visualization](https://pandas.pydata.org/docs/user_guide/style.html)：格式、样式、HTML 和导出。 |
| P24 | [Chart visualization](https://pandas.pydata.org/docs/user_guide/visualization.html)：Basic plotting、Other plots、缺失值与绘图后端。 |
| P25 | [What's new in 3.0.0](https://pandas.pydata.org/docs/whatsnew/v3.0.0.html)：字符串、Copy-on-Write、分类分组、时间精度推断、反连接与不兼容变化。 |
| P26 | [Installation](https://pandas.pydata.org/docs/getting_started/install.html)：Python 版本、依赖及各项可选功能要求。 |
| P27 | [Enhancing performance](https://pandas.pydata.org/docs/user_guide/enhancingperf.html)：Cython、Numba、eval；[DataFrame.query](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.query.html) 与 [DataFrame.eval](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.eval.html)：表达式引擎及不可信输入警告。 |
| P28 | [DataFrame.sample](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.sample.html)：n、frac、replace、weights、random_state，以及有无放回示例。 |
| P29 | [DataFrame.update](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.update.html)：按标签原地更新、left join、overwrite、errors 与非缺失值规则；[DataFrame.combine_first](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.combine_first.html)：按标签补齐、优先级及行列索引并集。 |
| P30 | [merge_asof](https://pandas.pydata.org/docs/reference/api/pandas.merge_asof.html)：排序要求、direction、by、tolerance、allow_exact_matches；结合 P16 核查时间键类型与时区。 |

Apache Arrow 官方文档：

| 编号 | 官方页面与定位 |
| --- | --- |
| P31 | [Pandas Integration](https://arrow.apache.org/docs/python/pandas.html)：本次页面标识为 Apache Arrow 25.0.1，仅取 DataFrames、Handling pandas Indexes 与 Memory Usage and Zero Copy 的对应内容；默认转换与 ArrowDtype 转换分别核查，当前 pandas 类型和时间精度以 P16、P20、P25 为准；正文再按实际 PyArrow 版本核查。 |

重点版本边界：pandas 3 的 Copy-on-Write 是默认且唯一的模式；默认 str 与显式 string 的缺失语义须区分；分类分组的 observed 和时间精度推断须按版本核查。连接空键、链式赋值和带标签赋值不能直接套用 SQL、Python 容器或纯位置数组的直觉。
