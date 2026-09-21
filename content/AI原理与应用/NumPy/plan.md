# NumPy 数值计算课程规划

学习目标：用 NumPy 表示和处理多维数值数据，正确判断形状、类型与内存关系，完成向量化计算、统计、随机采样和线性代数运算，并检查数值结果与资源成本。

前置知识：Python 变量、数值类型、列表与元组、切片、条件与循环、函数、模块导入和文件操作。矩阵、概率与微积分相关概念按对应章节单独列出。

归属：`content/AI原理与应用/NumPy/`。环境与运行见 [README.md](README.md)，教学约定见 [AGENTS.md](AGENTS.md)。

当前状态：**26 章正文已编写，均已从空内核顺序执行并保存真实输出**。课程包括主线 **19 章**、扩展 **7 章**，共 **26 章**。每行对应一份 Notebook，文件采用“二位序号-章节名称.ipynb”，例如 `01-数组创建与形状.ipynb`；下表提供全部正文链接。

## 范围与组织

主线覆盖数组创建、形状与轴、索引与赋值、视图与副本、广播、通用函数、统计聚合、排序与查找、随机数、矩阵计算、数值精度、数据读写和性能判断。扩展补齐特殊类型、掩码数组、离散数值计算、多项式、傅里叶变换和数组互操作。

“全面”以能够解释常用行为、处理边界并独立完成数值任务为目标，不逐项抄录全部 API。C-API、F2PY、自定义底层数据类型和底层 SIMD 开发只说明用途与入口，不纳入实现训练；稀疏矩阵、优化求解器和完整数学推导超出本课程范围。

每章提供独立输入，先用小数组展示当前操作，再增加必要机制。矩阵章先明确运算含义与输入条件，再调用 API；综合实践在一个 Notebook 内完成有限任务，不预先建立工程骨架。全部正文保存实际执行输出；依据编号对应篇末官方页面及定位，选学入口与已执行实验分别说明。

章节内分为“必讲”“边界”“选学”：必讲用于完成本章基本任务；边界须通过小型反例解释，属于基本验收；选学用于增加深度，不作为进入后续主线的前提。扩展章节整体按需学习，其中的必讲内容表示选读该章时的核心范围。先掌握常用操作，再解释机制，不按 API 数量分配课时。

## 主线章节

### 数组基础与运算表达

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 01. [数组创建与形状](01-数组创建与形状.ipynb) | Python 列表、元组、模块导入、基本算术。 | 必讲：ndarray 与 Python 容器；array、asarray；零维、一维与多维数组；shape、ndim、size、轴；zeros、ones、full、empty；arange、linspace；同形数组的算术与比较。边界：零维数组与空数组不同，零长度轴；empty 不保证初始化内容；浮点步长。选学：like 系列、eye、diag。 | 从小型测量数据创建数组，核对形状、元素数与逐元素运算；对照标量形状、空序列和含零长度轴的形状，不读取未初始化值作为确定结果。 | N01、N02 |
| 02. [数据类型与类型转换](02-数据类型与类型转换.ipynb) | 数值类型、数组创建、形状。 | 必讲：dtype、数组标量与 Python 标量；布尔、有符号与无符号整数、浮点、复数；itemsize、nbytes；类型推断与 astype；iinfo、finfo。边界：整数溢出、窄化转换、Python 标量参与运算的类型提升。选学：casting、result_type 与复杂的混合类型组合。 | 核对不同类型数组的数值范围与存储量；用小型溢出和混合类型案例说明显式转换的条件与代价。 | N02、N03 |
| 03. [基本索引与切片](03-基本索引与切片.ipynb) | Python 切片、数组形状与轴。 | 必讲：正负索引、多维索引、切片与步长、省略号、newaxis；整数索引与切片对维数的影响；切片赋值。边界：越界与空切片；观察基本切片的共享修改现象。 | 提取二维、三维数组的指定区域，核对值和 shape；说明切片赋值影响的范围。 | N04 |
| 04. [条件筛选与简单整数索引](04-条件筛选与简单整数索引.ipynb) | 数组比较、基本索引、布尔逻辑。 | 必讲：单轴整数序列选取、与被选区域形状匹配的布尔掩码；where、nonzero、any、all；逻辑运算、位运算与括号。边界：筛选后的形状与空结果；数组整体真值不能替代逐元素条件。选学：select 与单轴 take。多索引数组的广播和重复位置更新留在高级索引主题。 | 按条件筛选测量值，按指定顺序选行；预测输出形状并检查空结果，不提前使用复杂混合索引。 | N04、N09 |
| 05. [形状变换与数组组合](05-形状变换与数组组合.ipynb) | shape、轴、基本索引与切片。 | 必讲：reshape 与维数推断；transpose、swapaxes、moveaxis；expand_dims、squeeze；concatenate、stack；split、array_split。边界：元素数不匹配、单例轴、拼接与增加新轴的区别。选学：atleast 系列、repeat、tile、pad、meshgrid 的索引约定；此处不要求预测是否复制。 | 将多个小批次整理为指定形状，核对元素对应关系和轴含义；网格作为选学示例。 | N01、N06 |
| 06. [视图副本与内存布局](06-视图副本与内存布局.ipynb) | 索引、切片、dtype、reshape 与转置。 | 必讲：变量别名、view、copy；基本切片与高级索引读取；shares_memory；reshape、ravel、flatten 的复制条件。边界：base 不能单独证明任意两数组共享；C/F 连续性、只读标志、视图保留原缓冲区。选学：strides 的地址推算、may_share_memory 的保守判断。 | 修改别名、视图和副本，检查原数组；对照转置前后的连续性和形状变换，结合共享检查验证复制行为。 | N02、N05 |
| 07. [广播与批量计算](07-广播与批量计算.ipynb) | 数组形状、轴、逐元素运算、形状变换。 | 必讲：尾轴对齐与广播兼容条件；标量、行列向量、批量维度；用 newaxis 表达方向。边界：广播与显式重复的区别，输出和中间数组规模。选学：broadcast_to、broadcast_arrays 及写入限制。 | 使用已给定的列均值和行缩放系数完成中心化与缩放，本章专注广播；先预测 shape 再运行；识别不兼容形状和意外生成大数组的表达式。 | N06、N08 |
| 08. [通用函数与向量化](08-通用函数与向量化.ipynb) | 广播、函数、类型转换、条件选择。 | 必讲：ufunc 与逐元素计算；算术、指数对数、三角函数和舍入；out、where、dtype；reduce、accumulate；向量化限幅 clip。边界：原地运算的类型条件，where 未写入位置，vectorize 不保证加速；clip 的上下界行为，不假定函数会检查下界小于上界。选学：复数函数、casting、reduceat、outer、frompyfunc；at 的重复位置语义在高级索引主题展开。 | 将有限循环改为数组表达式，核对数值和形状；使用已初始化的输出验证条件计算，并比较累计与归约；用区间内外和端点值核对 clip，并观察上下界颠倒的结果。 | N03、N07、N10 |
| 09. [高级索引与重复位置更新](09-高级索引与重复位置更新.ipynb) | 整数与布尔索引、广播、通用函数、视图与副本。 | 必讲：多索引数组的广播、成对选取与 ix_；高级索引读取的副本；重复索引直接更新与 ufunc.at。边界：混合基本索引时的轴位置和结果形状。选学：take_along_axis 与按轴选值。 | 核对成对选取和矩形选取；以小数组比较 a[idx] += value 与 add.at 的重复位置结果；先手算形状再运行。 | N04、N07、N08 |

### 统计与线性代数

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 10. [统计聚合与分布摘要](10-统计聚合与分布摘要.ipynb) | 轴、广播、均值与方差的基本含义。 | 必讲：sum、prod、最值与位置、累计计算；axis、keepdims、聚合 dtype；mean、average、var、std、ddof；中位数、分位数与百分位数；NaN 感知聚合。边界：空数组、零长度轴、全缺失输入；sum 的单位元与 max 的 initial；无有效样本时的结果和警告。选学：axis 元组、cov、corrcoef、histogram、bincount、digitize 的区间约定。 | 生成统计摘要，手算核对部分结果；改变轴、ddof 和缺失值；分别验证空输入的求和、无 initial 的最值和指定 initial 的最值。 | N10、N11、N24 |
| 11. [排序查找与集合操作](11-排序查找与集合操作.ipynb) | 数组索引、布尔掩码、轴。 | 必讲：sort、argsort 与稳定性；searchsorted；unique 的计数与逆索引；isin、交并差集。边界：查找的有序前提、重复值、沿轴选取排序结果。选学：lexsort、partition、argpartition 与 Top-k。 | 稳定排序并恢复 unique 前的数据；选学实验核对 Top-k 成员，区分部分选择与完整有序结果。 | N04、N09、N12 |
| 12. [随机数与可复现采样](12-随机数与可复现采样.ipynb) | 数组形状、频数、均值、概率分布的基本含义。 | 必讲：default_rng、Generator 与 BitGenerator 的分工；整数、均匀与正态采样；choice、权重、有无放回；shuffle、permutation；种子和调用顺序。边界：不保证跨版本逐位一致；样本统计不等于理论值。选学：二项、泊松、多元正态的参数条件；状态保存、SeedSequence 与派生流；旧 RandomState 的兼容用途。 | 记录版本、生成器、种子和调用顺序后重复采样；核对范围、形状及有无放回约束，再观察样本分布。 | N13 |
| 13. [向量矩阵与张量运算](13-向量矩阵与张量运算.ipynb) | 向量、矩阵、点积、转置、数组广播。 | 必讲：逐元素乘法与矩阵乘法；matmul、dot；一维输入和批量矩阵形状；转置、共轭转置、trace 与范数；以 ndarray 表达矩阵。边界：输入维数改变时的运算语义。选学：vdot、inner、outer、tensordot、einsum 与轴收缩。 | 对小矩阵核对直接计算和矩阵乘法，说明批量维度；选学示例检查复数内积和轴收缩。 | N14 |
| 14. [数值精度与结果验证](14-数值精度与结果验证.ipynb) | 浮点类型、算术运算、聚合。 | 必讲：有限精度、舍入、消减与累积误差；NaN、Inf、isfinite；局部 errstate；isclose、allclose、绝对与相对容差；array_equal、numpy.testing；形状、类型和数值分别检查。边界：近零容差、广播比较、非有限值。选学：seterr 的全局作用；log1p、expm1、logaddexp 的稳定计算场景。 | 比较不同 dtype 和表达式的误差；为近零、较大数值、NaN 及形状不一致输入选择检查条件，说明容差依据。 | N03、N09、N10、N15、N24、PY01 |
| 15. [线性方程与最小二乘](15-线性方程与最小二乘.ipynb) | 矩阵乘法、线性方程组、秩、范数、数值容差。 | 必讲：solve 的方阵与满秩条件；lstsq 的近似解与返回值；matrix_rank、cond；残差与病态输入。边界：奇异、欠定与超定系统，残差小不能独自证明解可靠。选学：inv、pinv 的适用区别；det 与 slogdet。 | 求解小型系统并计算残差；用最小二乘拟合简单观测；对照奇异和病态输入，检查秩与条件数。 | N14、N15、N26 |
| 16. [矩阵分解与重构](16-矩阵分解与重构.ipynb) | 矩阵乘法、转置、秩、特征值、正交性、数值容差。 | 必讲：QR、SVD、对称或 Hermitian 矩阵的 eigh；输出形状、重构与正交性检查。边界：共轭转置、SVD 的完整与缩减形状、数值秩的容差。选学：正定条件下的 Cholesky、一般方阵的 eig；不展开分解算法的完整证明。 | 对小矩阵分别重构并检查误差；核对输出维数与正交性；Cholesky 选学示例包含不满足正定条件的输入。 | N14、N15、N26 |

### 数据与实践

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 17. [数组读写与内存映射](17-数组读写与内存映射.ipynb) | 文件与路径、dtype、数组形状。 | 必讲：npy、npz、save、savez、load；savetxt、loadtxt、genfromtxt；分隔符、表头、编码、缺失项和类型。边界：文本往返的类型损失、allow_pickle 与不可信输入、资源关闭。选学：memmap、mmap_mode；原始二进制的字节序与元数据。 | 用本地小数组完成文件往返，核对值、shape、dtype；文件实验均关闭资源并清理临时产物。选学实验：以小文件观察映射读取。 | N16 |
| 18. [性能内存与迭代](18-性能内存与迭代.ipynb) | 向量化、广播、内存布局、文件读写。 | 必讲：先检查正确性，再计时；重复测量、规模与准备成本；临时数组、out、连续性和分块。边界：nbytes 不等于进程峰值内存，广播仍可能产生大输出。选学：nditer、ndindex；sliding_window_view 的重叠内存与复杂度；BLAS 线程和共享数组并发；外部加速工具入口。 | 测量有限规模循环、数组表达式与分块计算的实际耗时和存储量；设置输入上限，不规定固定加速倍数。 | N02、N07、N17 |
| 19. [数值数据处理综合实践](19-数值数据处理综合实践.ipynb) | 索引、广播、统计聚合、随机采样、数组读写、数值验证。 | 必讲：自制多通道测量数据的形状检查、无效值定位、按轴统计、缩放、排序和导出；组合处理步骤并记录随机输入条件。边界：空输入、零方差列、全缺失列与不兼容形状。 | 从空内核完成可复现处理；用可手算的小样本检查形状、有限值和文件往返；明确模拟数据、统计口径和异常输入策略。 | N04、N08、N11、N13、N15、N16、N24 |

## 扩展章节

| 章节 | 前置知识 | 计划内容 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 20. [字符串与结构化数组](20-字符串与结构化数组.ipynb) | dtype、索引、类型转换。 | 必讲：定长字符串与字节串、StringDType、numpy.strings；结构化 dtype、字段访问与混合记录。边界：字符串截断、记录布局、object 类型与存储。选学：多字段选择及复杂记录布局。 | 处理自制混合字段记录，核对字符串长度和字段类型；对照 object 与结构化数组的表达方式。 | N18 |
| 21. [日期时间与时间差](21-日期时间与时间差.ipynb) | dtype、类型转换、日期时间的基本概念。 | 必讲：datetime64、timedelta64、时间单位、算术与 NaT。边界：单位换算、时间范围、月份与年份的特殊换算条件、时区支持限制。选学：工作日函数和自定义工作日历。 | 统一自制时间记录的单位，计算间隔并检查 NaT；分别核对合法和不适合直接换算的单位组合。 | N18 |
| 22. [掩码数组与无效数据](22-掩码数组与无效数据.ipynb) | 布尔掩码、缺失值、聚合。 | 必讲：numpy.ma 的 data 与 mask；屏蔽无效值、filled、compressed；掩码传播与聚合。边界：与布尔筛选、NaN 的差异；转换时掩码可能丢失。 | 保持原形状屏蔽无效观测，核对聚合与有效计数；检查转换结果是否保留掩码。 | N19 |
| 23. [离散数据的数值计算](23-离散数据的数值计算.ipynb) | 数组、采样间隔、导数与定积分的基本含义。 | 必讲：diff、gradient、trapezoid、interp 的输入条件和边界。边界：采样间隔、不等距输入、端点处理、插值范围。选学：convolve、correlate 的离散定义、mode 与边界效应；不将相关等同于卷积。 | 用已知低次函数核对差分、梯度、积分与插值；改变间隔观察误差；选学实验用短序列手算卷积和相关。 | N10、N25 |
| 24. [多项式表示与拟合](24-多项式表示与拟合.ipynb) | 数组、函数、最小二乘、导数与定积分的基本含义。 | 必讲：numpy.polynomial 的 Polynomial；系数顺序、求值、拟合、导数与积分；domain、window。边界：系数表示与区间映射、拟合误差、高次拟合风险。选学：根、常见正交多项式族与旧 poly1d 的识别。 | 用已知低次多项式核对系数、求值和拟合；比较映射前后的表示，不把拟合结果当作真实规律。 | N20 |
| 25. [傅里叶变换与频谱表示](25-傅里叶变换与频谱表示.ipynb) | 复数、正弦信号、采样率、频率与周期。 | 必讲：fft、ifft、rfft、irfft；fftfreq、rfftfreq、fftshift；输出顺序、频率单位、实信号对称性与归一化。边界：幅值与功率、采样限制和补零含义。选学：多维变换、窗函数的使用条件。 | 定位已知频率的合成信号分量，逆变换并检查误差；明确采样率、点数与归一化约定。 | N21 |
| 26. [数组互操作与类型标注](26-数组互操作与类型标注.ipynb) | Python 类型标注、数组缓冲区、视图与副本。 | 必讲：ArrayLike、NDArray、DTypeLike；asarray 的复制条件；缓冲区转换和共享。边界：标注不能替代形状检查，零复制受所有权、设备和表示约束。选学：数组接口、__array__、__array_ufunc__、__array_function__；DLPack；Array API、NumPy 2 迁移以及底层扩展的用途入口。 | 以本地数组和缓冲区核对转换、共享及只读行为；类型标注保留运行时检查，不强制安装 GPU 框架。 | N22、N23 |

## 交付顺序与实验成本

第 01 章教学写法已确认。本轮按规划完成全部主线与扩展章节，先完成 NumPy，再推进 pandas；每章分别核查来源、执行和审校，完成一章即补入下一章。扩展章节仍保留选读定位。

| 阶段 | 预期成果 | 资源安排 |
| --- | --- | --- |
| 01–09 | 能解释数组形状、类型、选择与批量计算 | 普通 CPU，小数组，默认不下载数据 |
| 10–16 | 能完成统计与矩阵计算，并验证数值结果 | 小型合成输入；分解实验限制矩阵规模 |
| 17–19 | 可复现的数组处理 Notebook | 少量本地临时文件；性能实验先设规模上限 |
| 20–26 | 能判断特殊表示与互操作条件 | 仍以本地 CPU 为主；不要求外部服务、GPU 或付费账号 |

示例已在 README.md 所列 Windows CPU 环境运行；性能章记录有限规模下的实际耗时和数组存储量，未测整套课程的进程峰值内存。首次安装需要网络；基础依赖及环境验证范围集中在 README.md。

## 规划依据与版本边界

核查日期：**2026-09-20**。本次查阅的官方 stable 文档标识为 **NumPy 2.5**；本地版本与依赖见 README.md。stable 链接会随发布更新，正文写作时须重新核对版本与具体 API。章节组合、例题和先后顺序属于本项目教学设计，以下依据支持知识范围与边界，不代表正文和实验已经验收。

主要来源为 **NumPy 官方文档（numpy.org）**，浮点表示补充 **Python 官方文档（docs.python.org）**。按主题列出直接页面与必要定位；API 总览用于确定范围，正文写作仍须核对所讲操作的具体 API 条件。

NumPy 官方文档：

| 编号 | 官方页面与定位 |
| --- | --- |
| N01 | [Array creation](https://numpy.org/doc/stable/user/basics.creation.html)：序列转换、一维与二维创建、数组复制和组合；[Array creation routines](https://numpy.org/doc/stable/reference/routines.array-creation.html)：初始化、网格和矩阵构造。 |
| N02 | [The N-dimensional array](https://numpy.org/doc/stable/reference/arrays.ndarray.html)：数组属性、Internal memory layout、数组方法；[Data types](https://numpy.org/doc/stable/user/basics.types.html)：类型、溢出和扩展精度。 |
| N03 | [Data type promotion](https://numpy.org/doc/stable/reference/arrays.promotion.html)：Python 标量、数值精度与提升规则；[Data type routines](https://numpy.org/doc/stable/reference/routines.dtype.html)：类型检查、转换与数值范围。 |
| N04 | [Indexing on ndarrays](https://numpy.org/doc/stable/user/basics.indexing.html)：Basic indexing、Advanced indexing、Assigning values；[Indexing routines](https://numpy.org/doc/stable/reference/routines.indexing.html)：ix_、take、take_along_axis 和条件索引。 |
| N05 | [Copies and views](https://numpy.org/doc/stable/user/basics.copies.html)：索引、reshape 与判断共享；结合 N02 核查 strides 和连续性。 |
| N06 | [Array manipulation routines](https://numpy.org/doc/stable/reference/routines.array-manipulation.html)：形状、转置、维度、拼接、拆分和重复；[pad](https://numpy.org/doc/stable/reference/generated/numpy.pad.html)：边界填充模式。 |
| N07 | [Universal functions](https://numpy.org/doc/stable/reference/ufuncs.html)：可选参数、casting 与 ufunc 方法；[vectorize](https://numpy.org/doc/stable/reference/generated/numpy.vectorize.html)：Notes 中的便利性与性能定位；[ufunc.at](https://numpy.org/doc/stable/reference/generated/numpy.ufunc.at.html)：无缓冲更新与重复索引示例。 |
| N08 | [Broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html)：General broadcasting rules 与示例中的内存成本。 |
| N09 | [Logic functions](https://numpy.org/doc/stable/reference/routines.logic.html)：比较、逻辑、数组内容与等价性；[Bit-wise operations](https://numpy.org/doc/stable/reference/routines.bitwise.html)：位运算。 |
| N10 | [Mathematical functions](https://numpy.org/doc/stable/reference/routines.math.html)：指数对数、舍入、累计、差分、梯度、积分与插值；[clip](https://numpy.org/doc/stable/reference/generated/numpy.clip.html)：区间限幅、上下界广播及上下界颠倒时的 Notes 与示例。 |
| N11 | [Statistics](https://numpy.org/doc/stable/reference/routines.statistics.html)：均值方差、分位数、相关和直方图；[std](https://numpy.org/doc/stable/reference/generated/numpy.std.html)：axis、dtype、ddof 与 Notes。 |
| N12 | [Sorting, searching, and counting](https://numpy.org/doc/stable/reference/routines.sort.html)：排序、部分选择与搜索；[Set routines](https://numpy.org/doc/stable/reference/routines.set.html)：去重、集合与成员关系。 |
| N13 | [Random Generator](https://numpy.org/doc/stable/reference/random/generator.html)：构造、采样、置换与分布；[Compatibility policy](https://numpy.org/doc/stable/reference/random/compatibility.html)：随机流一致性的条件；[Parallel random number generation](https://numpy.org/doc/stable/reference/random/parallel.html)：SeedSequence 与派生流。 |
| N14 | [Linear algebra](https://numpy.org/doc/stable/reference/routines.linalg.html)：乘积、分解、范数、方程与广播；[solve](https://numpy.org/doc/stable/reference/generated/numpy.linalg.solve.html)、[lstsq](https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html)：输入条件、返回值和失败边界。 |
| N15 | [Floating point error handling](https://numpy.org/doc/stable/reference/routines.err.html)：错误策略与上下文；[allclose](https://numpy.org/doc/stable/reference/generated/numpy.allclose.html)：比较公式及近零容差；[Test support](https://numpy.org/doc/stable/reference/routines.testing.html)：数组断言。 |
| N16 | [Reading and writing files](https://numpy.org/doc/stable/user/how-to-io.html)：文本、二进制、复杂数据与大文件；[load](https://numpy.org/doc/stable/reference/generated/numpy.load.html)：mmap_mode、allow_pickle 和资源关闭。 |
| N17 | [Iterating over arrays](https://numpy.org/doc/stable/reference/arrays.nditer.html)：迭代顺序、缓冲和外循环；[sliding_window_view](https://numpy.org/doc/stable/reference/generated/numpy.lib.stride_tricks.sliding_window_view.html)：writeable 与 Notes；[Global Configuration Options](https://numpy.org/doc/stable/reference/global_state.html)：线性代数线程；[Thread Safety](https://numpy.org/doc/stable/reference/thread_safety.html)：共享可变数组的并发限制。 |
| N18 | [Strings and bytes](https://numpy.org/doc/stable/user/basics.strings.html)：定长与变长字符串、缺失值；[Structured arrays](https://numpy.org/doc/stable/user/basics.rec.html)：字段与布局；[Datetimes and timedeltas](https://numpy.org/doc/stable/reference/arrays.datetime.html)：单位、NaT、转换及工作日。 |
| N19 | [The numpy.ma module](https://numpy.org/doc/stable/reference/maskedarray.generic.html)：构造、掩码传播、填充与有效元素。 |
| N20 | [Polynomials](https://numpy.org/doc/stable/reference/routines.polynomials.html)：新旧接口、各多项式族与 Convenience Classes；[Polynomial.fit](https://numpy.org/doc/stable/reference/generated/numpy.polynomial.polynomial.Polynomial.fit.html)：domain、window、诊断结果与 convert().coef；[polyfit](https://numpy.org/doc/stable/reference/generated/numpy.polynomial.polynomial.polyfit.html)：Notes 中的拟合条件与高次拟合风险。 |
| N21 | [Discrete Fourier Transform](https://numpy.org/doc/stable/reference/routines.fft.html)：Implementation details、Normalization、Real and Hermitian transforms；[Window functions](https://numpy.org/doc/stable/reference/routines.window.html)：常用窗。 |
| N22 | [Interoperability with NumPy](https://numpy.org/doc/stable/user/basics.interoperability.html)：数组转换、协议与 DLPack；[Typing](https://numpy.org/doc/stable/reference/typing.html)：ArrayLike、DTypeLike、NDArray 和运行时差异；[Array API standard compatibility](https://numpy.org/doc/stable/reference/array_api.html)：标准支持及使用条件。 |
| N23 | [NumPy 2.0 migration guide](https://numpy.org/doc/stable/numpy_2_0_migration_guide.html)：类型提升、默认整数、复制关键字与命名空间迁移。 |
| N24 | [sum](https://numpy.org/doc/stable/reference/generated/numpy.sum.html)：空数组的单位元、dtype 与求和精度 Notes；[max](https://numpy.org/doc/stable/reference/generated/numpy.max.html)：空输入与 initial，initial 同时参与非空输入的比较。 |
| N25 | [convolve](https://numpy.org/doc/stable/reference/generated/numpy.convolve.html)：离散卷积定义、mode 与边界；[correlate](https://numpy.org/doc/stable/reference/generated/numpy.correlate.html)：互相关定义、共轭及默认 mode。 |
| N26 | [cond](https://numpy.org/doc/stable/reference/generated/numpy.linalg.cond.html)：条件数与范数；[qr](https://numpy.org/doc/stable/reference/generated/numpy.linalg.qr.html)：模式、输出形状和重构；[svd](https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html)：full_matrices、奇异值、重构与批量输入；[eigh](https://numpy.org/doc/stable/reference/generated/numpy.linalg.eigh.html)：Hermitian／实对称条件；[cholesky](https://numpy.org/doc/stable/reference/generated/numpy.linalg.cholesky.html)：正定条件与失败边界。 |

Python 官方文档：

| 编号 | 官方页面与定位 |
| --- | --- |
| PY01 | [Floating-Point Arithmetic: Issues and Limitations](https://docs.python.org/3.12/tutorial/floatingpoint.html)：二进制表示误差、舍入、误差累积与消减示例；用于说明浮点原理，NumPy 的聚合实现另见 N24。 |

正文采用 NumPy 2 系列行为；旧接口只在兼容场景说明。广播不等于没有中间内存，vectorize 不保证加速，固定种子不保证跨环境随机流一致，数值接近也不等于形状与类型正确；这些边界须进入相应实验。
