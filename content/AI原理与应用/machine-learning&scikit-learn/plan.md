# 机器学习与 scikit-learn 课程规划

学习目标：通过公式推导、Python + NumPy 手写实现和框架对照理解机器学习模型的假设、目标与训练过程，使用 scikit-learn 完成数据处理、训练、可靠评估和复现，并在适合的主题中用 PyTorch 对照梯度训练。

前置知识：Python 函数与类的基本使用、NumPy 数组与广播、表格筛选与缺失值处理、基础绘图；向量与矩阵运算、导数与梯度、概率分布、条件概率和基本统计量。各章另外列出实际需要的概念，不要求开始时掌握全部推导。

课程归属：`content/AI原理与应用/machine-learning&scikit-learn/`。正式标题为“机器学习与 scikit-learn”，可简称“ML & scikit-learn”；目录用 `&` 分隔机器学习主题与工具名称。

当前状态：前三章样例已完成，共 **3 篇 Notebook、38 个代码单元**，均已从空内核顺序执行并保存真实输出。已覆盖任务与接口、数据划分与基线、回归与分类评估；其余主题尚未实施。现有 **28 个主线主题、8 个扩展主题**保留为覆盖清单，后续按完整推导和手写实现的篇幅拆分、排序，不固定最终章节数；下表只为已有正文添加链接。环境入口见 [README.md](README.md)，统一协议见 [AGENTS.md](AGENTS.md)。

## 课程结构与来源依据

原有 36 个主题由本项目依据 scikit-learn 知识范围和实践流程编排，并非直接采用某一门权威课程的目录。现增加正式课程与作者教材作为结构和理论定位的依据；分章、教学顺序与取舍仍属于本项目安排，不以引用数量证明课程质量。

| 编号 | 来源与定位 | 在本课程中的作用 |
| --- | --- | --- |
| T01 | [Stanford CS229 官方讲义](https://cs229.stanford.edu/main_notes.pdf)，2026-08-23 版：第 1—6 章监督学习，第 7 章神经网络与反向传播，第 8—9 章泛化与正则化，第 10—12 章 K-means、EM 与 PCA。 | 提供算法关系和推导的定位；仅选取本课程范围内内容，不照搬后续大模型与强化学习部分。 |
| T02 | [An Introduction to Statistical Learning 作者官网](https://www.statlearning.com/)：Python 版及各章主题，重点为 Regression、Classification、Resampling methods、Linear model selection and regularization、Tree-based methods、Support vector machines、Unsupervised learning。 | 参考从基础模型到评估、模型选择和复杂模型的教学组织及章末实验；具体公式仍须查阅作者提供的正文并记录节号或页码，首页不能充当推导依据。 |
| E01 | Dive into Deep Learning 的 [3.4 从头实现线性回归](https://d2l.ai/chapter_linear-regression/linear-regression-scratch.html)与 [3.5 简洁实现](https://d2l.ai/chapter_linear-regression/linear-regression-concise.html)。 | 参考“手写 → 框架对照”的教学安排；本项目采用自己的简洁代码组织，不引入该书的训练封装作为隐藏前提。 |
| F01 | [PyTorch 自动微分教程](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html)：Computing Gradients、Disabling Gradient Tracking、计算图与梯度累积。 | 用于首次框架对照时解释自动求导与训练步骤；具体框架版本和所用 API 在实施时验证。 |
| V01 | [Jupyter Notebook 格式](https://nbformat.readthedocs.io/en/latest/format_description.html#display-data)：Code cell outputs 与 display_data；[IPython 图形输出](https://ipython.readthedocs.io/en/stable/interactive/plotting.html)。 | 支持在代码单元直接展示并保存真实静态图形输出；图像文件只在引用、复用或导出时另存。 |

篇末 M01—M35 是已核查的 scikit-learn 官方主题与接口入口；前三章的实际引用与推导定位见各章末尾，其余主题的推导安排仍是待实施目标，不代表已逐式核查或运行。正式写章前，按课程协议为每段推导核对直接支持的原文、条件和定位，必要时补原始论文；只知道官方主题标题或 API 名称不能通过来源验收。

## 定位与范围

以“任务与数据 → 建立基线 → 解释模型 → 训练与比较 → 分析错误 → 保存和复现”为主线。机器学习部分解释为何这样建模，scikit-learn 部分展示如何正确实现；二者在同一主题内结合。章节顺序、实验规模和验收目标属于本项目教学安排，技术依据见篇末来源表。

- **主线必讲**：任务与数据表示、泛化与数据泄漏、预处理和流水线、损失与正则化、常见回归和分类算法、模型选择与诊断、特征选择与文本表示、降维与聚类、混合模型与 EM、异常检测和综合实践。
- **扩展选学**：判别分析、高斯过程、多层感知机、流形学习、半监督学习、在线学习、多标签与多输出、投票与堆叠。扩展内容不作为主线的隐藏前提。
- **章内选学**：在已有主题上补充一种方法或边界；标明需要额外掌握的概念。实验特性和额外工具只在有明确教学用途时引入。
- **范围边界**：优化讲清当前模型所需的目标、推导和求解，不展开完整运筹优化体系；神经网络限于小型多层感知机。PyTorch 用于适合主题的框架对照，首次使用时补足必要基础；完整深度学习框架教程、大模型、强化学习、因果推断、分布式训练和生产服务平台不纳入本课程。XGBoost、LightGBM、CatBoost、UMAP 和重采样工具不是本课程默认依赖。
- **覆盖口径**：覆盖常用方法和独立实验流程，不按 API 清单逐项写章。协方差估计、核近似、双聚类、交叉分解等专题暂不单独实施；如后续纳入，先核查来源并调整规划。

## 主线主题

以下表格维护知识范围与观察目标，各算法的最低推导和完整基础实现要求见“逐主题推导与实现安排”。手算一次或调用一次框架只是其中的观察环节，不能代替手写算法。基础流程前置，完整模型搜索安排在掌握基础模型之后；具体阅读顺序在分章时确定。

### 任务、数据与实验流程

先学会组织数据和判断结果，再展开算法推导。入门章中的模型调用只说明当下需要的接口和用途，不提前要求读者掌握全部优化细节。

| 章节 | 前置知识 | 必讲内容与必要边界 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| [01. 学习任务与估计器](01-学习任务与估计器.ipynb) | 数组形状、函数与对象。 | 样本、特征、目标；回归、分类与无监督任务；特征矩阵 X 和目标 y；估计器、变换器及 fit、predict、transform 的职责；参数与拟合后属性。区分库名 scikit-learn 与导入名 sklearn。 | 用内置小数据完成一次划分、拟合和预测；逐项说明输入与输出形状。先观察调用流程，再学习其模型原理。 | M01、M34 |
| [02. 数据划分泛化与基线](02-数据划分泛化与基线.ipynb) | 样本、特征、目标、平均值与比例，一元函数求导。 | 训练、验证、测试的用途；训练误差与泛化、过拟合与欠拟合；Dummy 基线；随机与分层划分；重复实体、时间顺序和标签泄漏。先划分，再学习预处理参数。 | 比较训练与保留数据上的基线结果；识别一例泄漏，并为独立样本、同一实体多次观测、时间数据选择合理划分。 | M02、M03、M04、M17 |
| [03. 回归与分类评估](03-回归与分类评估.ipynb) | 预测值、真实值、平均值与条件比例。 | MAE、MSE、RMSE、R²；混淆矩阵、准确率、精确率、召回率和 F1；标签、分数和概率的区别；多类别平均方式。先用固定预测解释指标，ROC、PR 和概率损失随专题深化。 | 手算小样本指标并与库结果对照；解释误差单位、正类、macro 与 weighted 的差别，说明 R² 可为负，准确率可能掩盖少数类错误。 | M04、M33 |
| 04. 数值预处理与缺失值 | 均值、方差、数组按列运算、缺失值。 | 标准化、区间缩放、稳健缩放与按样本归一化的区别；SimpleImputer 与缺失指示；训练统计量复用。说明稀疏数据中心化、离群点、全空列与模型原生缺失支持的条件。选学：KNN 插补。 | 在小表上核对缩放和填补值；只在训练部分拟合，对验证部分调用 transform，保留特征与样本对应关系。 | M02、M05、M06 |
| 05. 类别编码与特征构造 | 表格列、分类变量、函数与数组。 | 独热编码与有序编码、未知类别、稀疏输出；多项式与交互特征；分箱和 FunctionTransformer。目标编码作为选学，解释其利用标签及内部交叉拟合的必要性。 | 构造带未知类别的小表并观察编码列；核对交互项和输出维度。修改编码方式时说明假设，不将任意类别编号解释为自然顺序。 | M05、M07 |
| 06. 流水线与混合类型数据 | fit 与 transform、缺失值、类别编码。 | Pipeline、ColumnTransformer；按列组合处理、特征名称与剩余列；嵌套参数和整体拟合。区分训练时 fit_transform 与推断时 transform；说明流水线不能自动修复错误的数据划分。 | 将数值与类别处理接到同一个模型；观察输出列与预测顺序，比较手工处理和流水线的结果。选学自定义变换器时遵守估计器接口。 | M02、M07、M35 |
| 07. 交叉验证与模型选择 | 数据划分、评估指标、流水线、模型参数。 | K 折、分层、分组和时间划分；cross_validate；GridSearchCV 与 RandomizedSearchCV；scoring、负损失、refit 与搜索结果。预处理和特征选择在每个训练折内拟合；保留最终测试集。选学嵌套交叉验证。 | 使用小型候选集合搜索整个流水线；读懂各折分数与最佳参数；输出划分索引核对组和时间边界。折间标准差只作描述，不直接称为置信区间。 | M02、M03、M07、M08 |

### 回归、分类与集成学习

每个正式讲授的独立算法都按“公式与推导 → 小样本计算 → Python 手写基础版 → 框架版 → 对照实验”展开，讲清输入、假设、目标或决策规则、关键参数和失效条件。手写版完成约定任务，保留训练、停止与预测所需步骤；工程优化和额外变体明确其范围，不用框架调用代替核心实现。

| 章节 | 前置知识 | 必讲内容与必要边界 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 08. 线性回归 | 点积、矩阵乘法、平方误差、最小二乘。 | 线性模型、截距、残差与平方损失；最小二乘求解和 LinearRegression；系数、共线性和外推边界。选学：稳健回归与分位数回归。 | 在可手算数据上核对预测与残差，再用含噪数据检查验证误差；不把预测系数解释成因果效应，不用显式求逆作为默认解法。 | M09 |
| 09. 正则化与模型复杂度 | 线性回归、向量范数、训练与验证误差。 | Ridge、Lasso、ElasticNet 的目标和惩罚；多项式复杂度、尺度与正则化强度；偏差、方差与噪声的区别。 | 改变阶数和惩罚强度，观察系数及训练、验证误差；只根据验证流程选择配置。误差曲线用于理解现象，不声称一次实验证明一般定理。 | M09、M17 |
| 10. 梯度下降与随机优化 | 导数、梯度、损失函数、标准化。 | 批量、随机与小批量更新；学习率、迭代与停止条件；SGDRegressor 和 SGDClassifier 的作用；模型与优化器的区别。 | 用短 NumPy 循环计算平方损失的梯度与更新；改变学习率观察收敛和震荡，说明随机更新不保证每一步损失下降；核对库实现的目标与参数约定。 | M09、M10 |
| 11. 逻辑回归 | 线性模型、条件概率、对数、交叉熵。 | sigmoid、对数损失、决策边界、概率输出与分类阈值；多项逻辑回归；正则化及求解器兼容条件。 | 手算少量样本的概率和损失，再使用 LogisticRegression；核对 classes_ 与概率列的对应关系，区分分类标签与概率质量。 | M09、M04、M33 |
| 12. 近邻方法 | 距离、排序、平均值、特征尺度。 | 近邻搜索、KNeighborsClassifier 与 KNeighborsRegressor；邻居数、距离与权重；维度和推断成本。 | 手算一个查询点的邻居及预测；改变尺度和邻居数观察边界，解释为什么不能直接混合不同量纲。选学：搜索结构与半径近邻。 | M11 |
| 13. 朴素贝叶斯 | 条件概率、贝叶斯公式、对数与概率分布。 | 条件独立假设、先验与似然；GaussianNB、MultinomialNB 和 BernoulliNB 的数据条件；平滑和对数概率。 | 用小型计数表核对类别比较，再拟合合适的估计器；解释分类表现与概率校准的区别。选学：ComplementNB 与 CategoricalNB。 | M12 |
| 14. 支持向量机与核方法 | 向量内积、距离、线性分类、正则化。 | 间隔、支持向量、软间隔与核；线性和 RBF 分类、SVR；C、gamma、尺度与计算成本；决策分数不等同于概率。 | 在二维数据上观察支持向量和边界，比较线性与非线性输入；限制核方法样本规模。选学：核岭回归的用途对照。 | M13、M09 |
| 15. 决策树 | 条件判断、计数比例、方差与信息熵。 | 分类与回归树、候选切分、不纯度下降；深度、叶节点限制和代价复杂度剪枝；类别输入与缺失值支持按实现核查。 | 手算一次切分得分并查看浅树；改变深度比较训练与验证表现，观察树预测的分段特征和不稳定性。 | M14 |
| 16. 袋装法与随机森林 | 决策树、有放回抽样、平均与投票。 | Bagging、随机特征与 RandomForest；ExtraTrees；树数、特征抽样、袋外评估及其适用条件。 | 比较单树和森林在固定划分上的结果，再用多次种子观察波动；说明袋外分数的用途，不把它当作任意搜索后的独立测试分数。 | M15、M02 |
| 17. 提升法与梯度提升 | 浅树、损失与梯度、验证集。 | AdaBoost 的顺序加权思想；GradientBoosting 的加法模型与负梯度；HistGradientBoosting；学习率、迭代数和早停。类别与缺失值支持按具体实现区分。 | 在平方损失下展示一轮残差拟合，再比较两种梯度提升实现；早停只使用训练过程允许的验证数据，不预设某模型总是最佳。 | M15 |

### 诊断、特征与可靠预测

| 章节 | 前置知识 | 必讲内容与必要边界 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 18. 特征选择与学习曲线 | 流水线、交叉验证、相关性和正则化。 | 过滤式、模型式与递归特征选择；学习曲线和验证曲线；冗余特征与搜索成本。特征筛选不能在全量数据上先拟合。 | 在带无关特征的数据上比较保留方案；按训练样本量和参数绘制曲线，提出下一步实验并说明证据限制。 | M16、M17、M02 |
| 19. 类别不平衡与决策阈值 | 混淆矩阵、概率与分数、交叉验证。 | 类别比例、balanced accuracy、ROC-AUC、PR 曲线与 AP；class_weight、sample_weight；阈值与误判代价。加权、排序能力与阈值调整解决不同问题。 | 在训练数据内部选择阈值，使用独立数据比较混淆矩阵和约定代价；明确正类和阈值选择规则。重采样只说明需要折内实施，不引入额外库作为必修依赖。 | M04、M09、M18 |
| 20. 概率校准 | 概率预测、对数损失、训练与验证分离。 | 可靠性图、Brier 分数、log loss；sigmoid 与 isotonic 校准；CalibratedClassifierCV。Brier 分数同时受校准与区分能力影响。 | 比较校准前后的可靠性图和概率损失；校准器使用与基础模型拟合数据分离的预测，保留最终测试集；说明小样本分箱的波动。 | M19、M04 |
| 21. 模型解释与错误分析 | 已拟合模型、评估指标、相关性、基础绘图。 | 系数与树重要性的含义和限制；置换重要性、部分依赖图与个体条件期望；残差与分类错误切片；相关特征对解释的影响。 | 在开发用验证数据上检查错误样本和特征依赖，提出改进假设；解释结果描述已拟合模型，不据此宣称因果关系；调整后需保留独立终评。 | M20、M04、M02 |
| 22. 文本特征与稀疏学习 | 字符串、计数、稀疏表示、流水线。 | 词袋、n-gram、TF-IDF、HashingVectorizer；词表、分词与中文字符特征；稀疏输入和线性分类。词表及 IDF 仅从训练文本学习。 | 使用自制小语料建立完整文本流水线，查看特征名和稀疏矩阵局部；核对未见词的行为。小语料结果只验证流程，不作为实际业务效果证据。 | M21、M10、M12 |

### 无监督学习与综合实践

无监督示例区分“解释这批样本的结构”和“对新样本执行变换或预测”。没有真实标签时不报告分类准确率；用于下游监督任务的降维和筛选仍在训练折内拟合。

| 章节 | 前置知识 | 必讲内容与必要边界 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 23. 主成分分析与矩阵分解 | 矩阵乘法、正交投影、协方差、SVD。 | PCA 的投影与重构、解释方差和成分数；中心化与缩放；TruncatedSVD 与稀疏输入；NMF 的非负条件。选学：ICA 的任务入口。 | 用小矩阵核对投影与重构，再在流水线中比较降维前后表现；说明高解释方差不保证更好的分类结果，主成分符号可能不同。 | M22、M02 |
| 24. K均值与聚类评估 | 距离、均值、平方和、无监督任务。 | KMeans 的分配与中心更新、初始化与局部解；簇数、惯性和轮廓系数；有参考标签时使用 ARI 等外部指标；MiniBatchKMeans 入口。 | 手算一轮更新，展示初始化和尺度影响；比较不同簇数与形状，说明簇编号任意，不能直接与类别编号算准确率。 | M23 |
| 25. 层次聚类与密度聚类 | 距离、邻域、聚类评估。 | 凝聚聚类与连接准则；DBSCAN 的核心点、边界点和噪声；HDBSCAN 的密度层次入口；尺度、距离与参数条件。选学：OPTICS 和谱聚类。 | 对月牙、不同密度和噪声数据比较结果，展示参数改变的影响；说明各估计器是否能直接预测新样本，不给所有聚类器套用 predict。 | M23 |
| 26. 高斯混合与EM算法 | 高斯分布、协方差、条件概率、对数似然。 | 潜变量与软分配；EM 的期望与最大化步骤；GaussianMixture、协方差类型、初始化与局部最优；AIC、BIC 和协方差正则化。选学：BayesianGaussianMixture。 | 在一维混合数据上核对一次责任度和参数更新，再观察完整拟合；核对每行责任度和为 1，区分分量数选择与真实机制识别。 | M24 |
| 27. 异常检测与密度估计 | 距离、概率密度、训练与测试区分。 | 离群点检测与新颖性检测；IsolationForest、LocalOutlierFactor 和 OneClassSVM；异常分数、标签与阈值。选学：KernelDensity 与带宽。 | 在有已知扰动的合成数据上比较方法；明确正常数据假设、异常比例和分数方向，核对 LOF 两种模式的接口边界；不自动把全部异常点删除。 | M25 |
| 28. 机器学习综合实践 | 数据划分、流水线、模型选择、诊断和文件读写。 | 独立分类与回归任务：定义预测时点和可用字段，建立 Dummy 与简单模型基线，有限搜索、错误分析、最终测试、完整流水线保存与重新加载。保存格式、可信来源和版本兼容边界。 | 使用离线小数据分别完成两个可独立运行的练习；先固定流程再终评，报告真实指标及限制；重载后在同一新输入上核对预测、列顺序与容差。选学以聚类或异常检测完成探索任务。 | M02、M03、M07、M08、M26、M34 |

## 扩展主题

扩展算法正式实施时同样完成推导、手写与框架对照；标为入口或概览的内容不计作完整算法教学。

| 章节 | 前置知识 | 必讲内容与必要边界 | 实践与验收目标 | 依据 |
| --- | --- | --- | --- | --- |
| 29. 判别分析 | 多元高斯分布、协方差、贝叶斯分类与投影。 | LDA、QDA 的分布与协方差假设、决策边界；收缩估计；LDA 的有监督降维及其与 PCA 的区别。 | 在不同协方差条件下比较边界和验证结果；说明维度、样本量和估计稳定性。 | M27 |
| 30. 高斯过程 | 多元高斯分布、核函数、条件概率与矩阵求解。 | 函数先验、核与后验预测；GaussianProcessRegressor；预测均值、标准差、噪声与核参数优化。选学：高斯过程分类。 | 在一维小数据上绘制预测和模型假设下的不确定性；改变核与噪声观察结果，不把预测区间当作无条件正确性保证。 | M28 |
| 31. 多层感知机 | 矩阵乘法、链式法则、损失与梯度更新。 | 隐藏层、激活、前向传播与反向传播；MLPClassifier 和 MLPRegressor；尺度、正则化、早停与收敛警告。 | 手算或用 NumPy 核对一个小网络的前向计算，再训练小型 MLP；观察初始化与训练条件的影响，不将本章扩展成深度学习框架教程。 | M29 |
| 32. 流形学习与非线性降维 | 距离、近邻、线性降维与散点图。 | 非线性低维表示；Isomap、局部线性嵌入与 t-SNE 的目的；局部结构、随机性和超参数；可视化与可泛化变换的区别。 | 在小型流形和数字数据上比较投影，改变邻域或 perplexity；说明 t-SNE 不显式保留全局距离，图上分离不能代替分类评估。 | M30 |
| 33. 半监督学习 | 概率分类、近邻图、校准和独立测试。 | 标注与未标注样本；SelfTrainingClassifier、LabelPropagation 和 LabelSpreading；伪标签、分布假设与错误传播。 | 只隐藏训练部分标签，比较同一标注预算下的监督与半监督结果；测试数据及其标签不参与训练，不预设增加未标注数据必然改进。 | M31 |
| 34. 在线学习与计算资源 | 小批量训练、稀疏特征、迭代器和性能测量。 | partial_fit、类别全集、固定特征表示；增量预处理与模型更新的配合；warm_start 的区别；批次大小、内存和 n_jobs 的作用范围。选学：增量 PCA。 | 对固定顺序的数据流先预测再更新；比较批次大小的结果与成本，说明增量训练不等于自动适应漂移；不把 Pipeline 假定为自动提供 partial_fit。 | M10、M22、M32、M35 |
| 35. 多标签与多输出 | 多类别分类、二维目标数组、评估平均方式。 | 多类别、多标签和多输出目标的区别；一对其余与一对一；MultiOutput 包装器与分类器链；目标编码和指标条件。 | 用小型多标签与多目标数据核对目标形状、逐目标结果及整体指标；说明子集准确率与逐标签指标的不同。 | M33、M04 |
| 36. 投票与堆叠 | 多个基模型、交叉验证、概率校准与流水线。 | 硬投票、软投票、加权与 Stacking；元模型和折外预测；分类与回归组合；训练成本及嵌套评估。 | 使用少量互补模型比较组合与单模型；元模型只用符合划分要求的折外预测训练，保留独立测试集，核对增加复杂度是否有实际收益。 | M15、M03、M19 |

## 逐主题推导与实现安排

本表将课程协议落实到现有暂定主题，供分章和实施使用。“理论定位”指出需要核对的来源主题；写作前还须核对具体公式与适用条件。M 编号对应篇末官方页面，T 编号对应课程依据。每个正式讲授的独立算法都要完成其基础版；表中标为概览的变体若升级为正式算法教学，先补全其推导、手写和对照安排。

下表的模块名是后续抽取位置约定，不代表文件已存在。公共数据、预处理、评估和绘图分别按需复用 scripts/data.py、scripts/preprocess.py、scripts/metrics.py、scripts/plots.py；当前主题的首次完整讲解仍在 Notebook 中。算法模块只在后续确有复用时创建，不提前批量建文件。

框架列中的 scikit-learn 和 PyTorch 均使用 README.md 中届时实际验证的版本；当前版本待验证。PyTorch 对照先安排最小张量、自动微分和优化器讲解，传统算法无需因此引入 PyTorch。

| 主题编号 | 推导或机制范围与理论定位 | 手写范围 | 框架对照与后续复用 |
| --- | --- | --- | --- |
| 01 | 样本、特征、目标与估计器职责；M01、M34。 | 小数据的形状与输入输出观察；作为接口导览，不宣称完成算法教学。 | scikit-learn 最小调用；数据加载经首次讲解后抽取到 data.py。 |
| 02 | 保留集与泛化、均值和多数类基线、泄漏条件；T01 第 8—9 章、M02—M04。 | 索引划分、均值和多数类预测，解释随机、分组与时间划分的选择。 | train_test_split 与 Dummy 估计器；复用 data.py 中显式配置的加载和划分函数。 |
| 03 | 回归误差、混淆计数、比例与平均方式；M04、M33。 | 逐项计算必讲指标，与少量可手算输入对照。 | sklearn.metrics；抽取 metrics.py。 |
| 04 | 缩放统计量、归一化与插补规则；M05、M06。 | 学习训练统计量并用于变换，实现必讲基础缩放与单变量插补。 | 预处理与插补估计器；抽取 preprocess.py。 |
| 05 | 编码映射、交互项、分箱及标签使用边界；M05。 | 建立并应用类别映射，构造交互项和分箱；目标编码正式展开时另补折内拟合。 | sklearn.preprocessing；复用 preprocess.py。 |
| 06 | 拟合与变换的组合顺序、列选择和状态归属；M07。 | 先展开按列处理和训练组合，再封装未拟合流水线的构造函数，不开发通用 Pipeline 框架。 | Pipeline、ColumnTransformer；preprocess.py 返回新建流程。 |
| 07 | 交叉验证估计、模型选择与独立终评；T01 第 9 章、M03、M08。 | 手写小型折循环与有限参数枚举，每折重新拟合处理流程。 | cross_validate 与搜索器；按需抽取 selection.py。 |
| 08 | 最小二乘目标、梯度与正规方程条件；T01 第 1 章、M09。 | 完整线性回归拟合与预测，梯度迭代及停止条件；基础矩阵求解可用于已知解对照。 | LinearRegression；选学 PyTorch 同目标训练；后续复用 linear_regression.py。 |
| 09 | 惩罚目标、Ridge 求解、Lasso 和 ElasticNet 更新所需条件；T01 第 9 章、M09。 | 实现必讲惩罚模型的基础求解与预测；涉及非光滑更新先核查相应推导。 | Ridge、Lasso、ElasticNet；复用线性模型基础，按需抽取 regularization.py。 |
| 10 | 梯度、批量与随机更新、学习率和停止条件；T01 第 1 章、M10。 | 手动计算梯度和批量、随机、小批量更新，运行完整训练。 | SGD 估计器与选学 PyTorch 优化器；首次展开后按需抽取 optim.py。 |
| 11 | Bernoulli 似然、对数损失及梯度，多类别扩展；T01 第 2—3 章、M09。 | 二分类和正式展开的多项模型的完整训练与预测；保留稳定计算及类标对应。 | LogisticRegression；选学 PyTorch；后续复用 logistic_regression.py。 |
| 12 | 距离、邻居选择和加权预测规则；M11。 | 暴力近邻搜索、分类投票与回归预测；快速索引结构作为概览。 | KNeighborsClassifier、KNeighborsRegressor；后续复用 neighbors.py。 |
| 13 | 贝叶斯规则、条件独立、分布估计与平滑；T01 第 4 章、M12。 | Gaussian、Multinomial、Bernoulli 基础版的统计量学习和对数概率预测。 | 对应 Naive Bayes 估计器；后续复用 naive_bayes.py。 |
| 14 | 间隔与惩罚目标、核与对偶、基本求解；T01 第 5—6 章、M13。 | 线性分类先完成基础优化；核分类、SVR 正式展开时各自分配完整求解与预测，不以线性版本代替。 | 对照所选目标和求解约定的 SVM 估计器；按变体组织 svm.py。 |
| 15 | 不纯度、切分收益、预测与剪枝条件；M14，T02 的 Tree-based methods。 | 分类与回归树的候选切分、递归构建、停止和预测；剪枝正式展开时补全基础过程。 | DecisionTree 估计器；后续复用 trees.py。 |
| 16 | 自助采样、特征抽样、聚合与袋外估计；M15。 | 复用已讲解的树，完成袋装和随机森林训练与预测；ExtraTrees 展开时实现相应随机切分。 | Bagging、RandomForest、ExtraTrees；按需抽取 forests.py。 |
| 17 | 加法模型、AdaBoost 权重更新与梯度提升的目标；M15。 | 分别完成 AdaBoost 和平方损失梯度提升的基础训练与预测；直方图提升正式展开时另设实现主题。 | AdaBoost、GradientBoosting、HistGradientBoosting；复用 trees.py，按算法拆分模块。 |
| 18 | 特征选择准则、样本量和复杂度曲线；M16、M17。 | 手写小型选择、递归消除及曲线采样流程，基模型使用已讲解实现。 | 特征选择与曲线工具；selection.py、plots.py。 |
| 19 | 混淆计数、排序曲线、加权目标与阈值代价；M04、M18。 | 手算并实现阈值扫描、相应指标和加权损失中的关键计算。 | sklearn.metrics、阈值工具和模型权重参数；metrics.py。 |
| 20 | 校准目标、概率损失、sigmoid 与单调约束；M19。 | 完成 sigmoid 校准的拟合与预测；单调校准正式展开前补核求解来源并实现基础版。 | CalibratedClassifierCV；按需抽取 calibration.py。 |
| 21 | 置换导致的评分变化、PDP 和 ICE 的计算定义；M20。 | 实现置换评分、局部网格预测和聚合，解释相关特征条件。 | sklearn.inspection；metrics.py、plots.py，按需抽取 inspection.py。 |
| 22 | 词袋、TF-IDF、稀疏和哈希表示；M21。 | 构建小语料词表、计数与 TF-IDF 变换，再复用已讲解分类器。 | 文本向量器和分类流水线；按需抽取 text_features.py。 |
| 23 | PCA 投影与重构、SVD 联系、NMF 目标；T01 第 12 章、M22。 | 完成 PCA 拟合、变换和重构，可使用基础特征分解；NMF 等独立算法另分配推导与完整基础迭代。 | PCA、TruncatedSVD、NMF；按算法拆分后复用 decomposition.py。 |
| 24 | 簇内平方和、分配与中心更新、评估条件；T01 第 10 章、M23。 | 完成初始化、分配、中心更新、停止与新样本分配，说明空簇处理。 | KMeans；MiniBatchKMeans 为入口，正式展开时补完整更新；kmeans.py。 |
| 25 | 连接准则、邻域与密度连通；M23。 | 分别实现凝聚过程与 DBSCAN 的完整扩展过程；HDBSCAN 目前为概览，不计完整实现。 | AgglomerativeClustering、DBSCAN；拆分后分别抽取模块。 |
| 26 | 混合似然、责任度、EM 更新与条件；T01 第 11 章、M24。 | 一维或受限协方差 GMM 的完整 E 步、M 步、停止与概率计算，不只展示一次更新。 | GaussianMixture；明确手写版协方差类型；gmm.py。 |
| 27 | 异常分数、局部密度、隔离路径与单类目标；M25。 | 按算法拆分 IsolationForest、LOF、OneClassSVM 的基础实现；KDE 如正式选学同样完成公式和密度计算。 | 对应异常与密度估计器；复用已讲解距离或树操作，各算法单独模块。 |
| 28 | 完整实验流程、可信保存与环境条件；M02、M26。 | 组合已有数据、处理、模型和评估模块，不另造通用训练平台；显式展示最终拟合与评估步骤。 | scikit-learn 完整流水线及选定保存方式；复用相应模块，核对重载预测。 |
| 29 | 高斯条件分布、判别函数和投影；T01 第 4 章、M27。 | 完成 LDA、QDA 的参数学习与预测，分别明确协方差假设；降维部分单独核对。 | LinearDiscriminantAnalysis、QuadraticDiscriminantAnalysis；discriminant.py。 |
| 30 | 高斯条件分布、核矩阵和后验预测；M28。 | 固定核参数下的完整 GPR 拟合与预测均值、方差；核参数学习正式展开时另补目标和求解。 | GaussianProcessRegressor；核与噪声条件对齐；gaussian_process.py。 |
| 31 | 前向传播、链式法则与反向传播；T01 第 7 章、M29。 | 完成小型 MLP 的前向、手动反向、参数更新与预测，不以自动微分代替手写反向。 | PyTorch 张量、自动微分和优化器；可另对照 MLP 估计器；mlp.py。 |
| 32 | 距离或邻域保持目标、低维表示与随机优化；M30。 | Isomap、LLE、t-SNE 正式展开时分别推导并实现小规模基础版，按独立算法拆分，不用一张库图代表手写。 | 对应流形估计器；复用 distances 或 neighbors 的已讲解操作，模块按算法命名。 |
| 33 | 伪标签选择与图传播更新；M31。 | 复用已讲解分类器完成自训练循环，再分别实现正式讲授的传播更新与停止条件。 | SelfTrainingClassifier、LabelPropagation、LabelSpreading；semi_supervised.py。 |
| 34 | 批次更新、数据流评估与状态；M10、M32、M35。 | 在已手写的 SGD 基础上实现先预测再更新的流式循环；增量预处理说明坐标与状态一致性。 | partial_fit；复用 optim.py、preprocess.py，不假定 Pipeline 自动支持增量训练。 |
| 35 | 任务分解、目标编码和链式条件输入；M33。 | 复用已讲解基模型，实现逐目标训练、预测和分类器链的数据组织。 | Multiclass、MultiOutput 与链式估计器；multioutput.py。 |
| 36 | 投票、概率平均及折外预测构成的元学习；M15、M03。 | 复用已讲解模型，手写聚合与无泄漏折外预测训练流程。 | Voting、Stacking 估计器；复用 selection.py，按需抽取 ensembles.py。 |

## 教学组织与交付顺序

教学组织遵循 [Notebook 协议的七条原则](../../../docs/notebook-protocol.md#课程编写的七条原则)，算法顺序、推导、手写标准、框架对照、首次讲解与复用、图形展示和验收统一以 [AGENTS.md](AGENTS.md) 为准，不在规划另设宽松版本。每个知识点以简短 Markdown 介绍接代码示例，公式保留数学排版；适合用图解释的过程在代码单元直接展示，保存真实静态输出。复杂算法按步骤展开，不把整章挤成两个单元。

1. **基础样章**：前三章已从本地草稿整理为正文，完成来源核查、基线与指标的手写对照、最小依赖组合和空内核执行。预处理目前只演示 fit 与 transform 的边界；完整方法随对应主题实施。已讲解流程在后续出现实质复用时再抽取到 scripts/。
2. **首个完整算法样章**：以线性回归完成推导、手算、手写训练、框架对照与直接成图；基本梯度更新随需要就地介绍，再将系统的优化方法作为独立主题展开。样章同时核对公式与代码对应、数值正确性和公共模块复用。
3. **监督学习与可靠评估**：基础模型建立后展开完整交叉验证与搜索，再逐类实施模型，补齐特征选择、诊断、校准和文本任务。主题 17 的不同提升算法、25 的层次与密度算法、27 的不同异常检测方法优先按完整推导和实现拆分；23、32 等多算法主题同样核对篇幅，不为保留原编号省略必要内容。
4. **无监督学习与综合实践**：完成降维、聚类、混合模型、异常检测和两个独立综合练习。
5. **扩展主题**：按实际需求实施，不要求读者学完扩展章才能完成主线综合实践。

完成一章后才添加正文链接、更新实际篇数与实施状态；不会因已经列出章节名就标记完成。每章练习同时包含结果解释和至少一次条件变化或方法选择，重点练习提供分层提示与解析，预测题不提前展示答案。

## 数据、成本与验收

- **输入来源与归属**：主线优先使用自制数据、scikit-learn 内置小数据和可控生成数据；少量手算输入可就地定义，所有落盘教学数据统一放入 data/。数据说明记录来源、许可、字段、单位、目标和生成条件，不覆盖原始数据；合成数据不代替真实业务效果评估。下载数据仅作为有明确许可、规模与网络说明的选学。
- **脚本与图形**：首次展开数据与公共操作，再将已讲解流程抽取到 scripts/；后续导入时说明返回值和关键条件，不跨验证折复用拟合状态。当前算法的核心实现保留在 Notebook。图形直接展示并保存单元输出；需要正文引用、复用或导出的实际成图与截图放 image/，辅助学习示意图放 image/illustration/。具体编号、扩展名和展示要求见课程协议。
- **学习示意图**：按主题需要安排模型结构、算法步骤或几何原理示意，并结合图示优化相邻讲解；优先使用适合本节且使用条件已核查的权威原图，没有可用原图时再依据权威资料用 SVG 或 Python 绘制。选图、自绘风格与制作要求遵循[图示协议](AGENTS.md#模型结构图与算法流程图)，布局服从算法关系；来源、许可、简化范围及字体清晰度纳入章节检查。
- **运行成本**：小型教学示例以普通 CPU 可复现为基础，不依赖付费接口或账号；适合 GPU 的训练可在显存足够并留有余量时使用，设备、依赖和实际显存占用按课程协议记录。前三章使用 CPU，未执行 GPU 分支。通常使用几十至几千个样本、有限特征和少量候选参数；首次搜索优先 3 折和不超过 10 组候选。较慢方法另限样本量；这些是编写预算，实际耗时和内存须运行后报告。
- **数据边界**：从预测问题决定独立样本、分组或时间划分；调参、特征选择、校准、阈值和错误分析都属于开发流程。最终测试数据不参与这些选择；发现终评问题后继续修改时，须如实说明测试集已被使用。
- **结果核对**：观察输入输出形状、特征名、类别顺序、指标含义和必要数值关系。随机模型写明种子与稳定观察点；不以固定准确率或所有模型的预定排名作为通过标准，不声称一次种子代表普遍表现。
- **执行验收**：实施后的每章从空内核顺序运行并保存真实输出，检查图形、练习和引用的一致性。数学数值对照核对假设、损失缩放、正则化和浮点容差；库实现与简化教学实现无需参数逐位相同。
- **保存与复现**：综合实践保存完整预处理和模型，说明输入约定及环境版本；只加载可信来源的本地模型文件，临时模型和缓存不提交。实际依赖与运行步骤集中在 README.md，未执行的分支单独说明。

## 参考与引用来源

2026-09-22 已核查下列 scikit-learn 官方页面的相关内容，用于确定主题、接口范围和必要边界。链接为 stable 文档入口，页面会更新；正式写章时须按实际验证的版本重新核对具体 API、默认参数、公式及适用条件，并在章末保留直接定位。这里的来源清单不代表对应实验已经执行；超出官方说明的完整证明须先补核原始论文或其他第一方依据。

| 编号 | 官方页面与本规划使用的定位 |
| --- | --- |
| M01 | [Getting Started](https://scikit-learn.org/stable/getting_started.html)：Fitting and predicting、Transformers、Pipelines、Model evaluation。 |
| M02 | [Common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html)：Inconsistent preprocessing、Data leakage、Controlling randomness。 |
| M03 | [Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html)：保留集、Computing cross-validated metrics、分层、分组与时间序列划分。 |
| M04 | [Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)：指标选择、scoring、分类与回归指标、Dummy estimators。 |
| M05 | [Preprocessing data](https://scikit-learn.org/stable/modules/preprocessing.html)：缩放、归一化、Encoding categorical features、Discretization、Generating polynomial features、Custom transformers。 |
| M06 | [Imputation of missing values](https://scikit-learn.org/stable/modules/impute.html)：单变量与近邻插补、缺失指示、全空特征及估计器支持。 |
| M07 | [Pipelines and composite estimators](https://scikit-learn.org/stable/modules/compose.html)：Pipeline、嵌套参数、ColumnTransformer、TransformedTargetRegressor。 |
| M08 | [Tuning hyper-parameters](https://scikit-learn.org/stable/modules/grid_search.html)：网格与随机搜索、多指标和 refit、嵌套交叉验证示例及计算预算。 |
| M09 | [Linear Models](https://scikit-learn.org/stable/modules/linear_model.html)：Ordinary Least Squares、Ridge、Lasso、Elastic-Net、Logistic regression、稳健与分位数回归；核方法选学另见 [Kernel ridge regression](https://scikit-learn.org/stable/modules/kernel_ridge.html)。 |
| M10 | [Stochastic Gradient Descent](https://scikit-learn.org/stable/modules/sgd.html)：模型与优化技术的区别、分类与回归、停止条件、Mathematical formulation。 |
| M11 | [Nearest Neighbors](https://scikit-learn.org/stable/modules/neighbors.html)：搜索、分类、回归、距离与近邻算法选择。 |
| M12 | [Naive Bayes](https://scikit-learn.org/stable/modules/naive_bayes.html)：条件独立假设、各分布版本、平滑与概率输出限制。 |
| M13 | [Support Vector Machines](https://scikit-learn.org/stable/modules/svm.html)：分类、回归、Scores and probabilities、Kernel functions、Mathematical formulation。 |
| M14 | [Decision Trees](https://scikit-learn.org/stable/modules/tree.html)：分类与回归、Mathematical formulation、缺失值、Minimal Cost-Complexity Pruning。 |
| M15 | [Ensemble methods](https://scikit-learn.org/stable/modules/ensemble.html)：Gradient-boosted trees、Random forests、Bagging、Voting、Stacked generalization、AdaBoost。 |
| M16 | [Feature selection](https://scikit-learn.org/stable/modules/feature_selection.html)：低方差、单变量、递归及模型式选择、Using as part of a pipeline。 |
| M17 | [Validation and learning curves](https://scikit-learn.org/stable/modules/learning_curve.html)：偏差与方差的诊断、Validation curve、Learning curve。 |
| M18 | [Tuning the decision threshold](https://scikit-learn.org/stable/modules/classification_threshold.html)：概率与决策、阈值优化、训练数据与阈值选择数据分离。 |
| M19 | [Probability calibration](https://scikit-learn.org/stable/modules/calibration.html)：Calibration curves、CalibratedClassifierCV、sigmoid 与 isotonic、概率损失的解释边界。 |
| M20 | [Permutation importance](https://scikit-learn.org/stable/modules/permutation_importance.html)：模型依赖性、相关特征与树重要性比较；[PDP and ICE](https://scikit-learn.org/stable/modules/partial_dependence.html)：定义、相关特征和合成输入的解释限制。 |
| M21 | [Feature extraction](https://scikit-learn.org/stable/modules/feature_extraction.html)：Text feature extraction、词袋、TF-IDF、分词、稀疏与哈希表示。 |
| M22 | [Matrix decomposition](https://scikit-learn.org/stable/modules/decomposition.html)：PCA、IncrementalPCA、TruncatedSVD、NMF 与 ICA。 |
| M23 | [Clustering](https://scikit-learn.org/stable/modules/clustering.html)：K-means、Hierarchical clustering、DBSCAN、HDBSCAN、OPTICS、Spectral clustering、Clustering performance evaluation。 |
| M24 | [Gaussian mixture models](https://scikit-learn.org/stable/modules/mixture.html)：GaussianMixture、EM、协方差类型、模型选择与 BayesianGaussianMixture。 |
| M25 | [Novelty and Outlier Detection](https://scikit-learn.org/stable/modules/outlier_detection.html)：任务假设、IsolationForest、LOF 模式与 OneClassSVM；[Density Estimation](https://scikit-learn.org/stable/modules/density.html)：KernelDensity 与带宽。 |
| M26 | [Model persistence](https://scikit-learn.org/stable/model_persistence.html)：保存方式比较、可信来源与环境兼容，主线只实现选定的一种本地保存方式。 |
| M27 | [Linear and Quadratic Discriminant Analysis](https://scikit-learn.org/stable/modules/lda_qda.html)：概率模型、降维、协方差收缩及求解器。 |
| M28 | [Gaussian Processes](https://scikit-learn.org/stable/modules/gaussian_process.html)：Gaussian Process Regression、核、预测分布与参数优化。 |
| M29 | [Neural network models](https://scikit-learn.org/stable/modules/neural_networks_supervised.html)：多层感知机、训练、正则化、Mathematical formulation 与实现边界。 |
| M30 | [Manifold learning](https://scikit-learn.org/stable/modules/manifold.html)：Isomap、LLE、t-SNE、局部与全局结构及 Practical use。 |
| M31 | [Semi-supervised learning](https://scikit-learn.org/stable/modules/semi_supervised.html)：未标注目标、Self Training、Label Propagation。 |
| M32 | [Scaling strategies](https://scikit-learn.org/stable/computing/scaling_strategies.html)：数据流、特征提取和增量算法；[Parallelism and resource management](https://scikit-learn.org/stable/computing/parallelism.html)：joblib、OpenMP、BLAS 与资源配置。 |
| M33 | [Multiclass and multioutput algorithms](https://scikit-learn.org/stable/modules/multiclass.html)：目标类型、原生支持与元估计器、分类器链。 |
| M34 | [Toy datasets](https://scikit-learn.org/stable/datasets/toy_dataset.html)：内置数据、来源、字段及代表性限制；[Generated datasets](https://scikit-learn.org/stable/datasets/sample_generators.html)：分类、回归与聚类生成器。 |
| M35 | [Developing estimators](https://scikit-learn.org/stable/developers/develop.html)：fit、参数、拟合后属性与兼容接口；[Glossary](https://scikit-learn.org/stable/glossary.html)：partial_fit、warm_start、random_state。 |
