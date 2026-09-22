# 总目录索引

这里集中链接正文分类和项目，按需要标明阅读顺序，不复制正文或存放引用的原始资料。

## 正文分类

已建立以下 11 个中文一级分类，每个目录的 README.md 说明收录范围。已有课程列在下方；分类目录存在不代表其中所有计划内容都已完成。

| 分类目录 | 计划收录范围 |
| --- | --- |
| [开发环境与工具](../content/开发环境与工具/) | 文件与路径、终端与 Shell、开发环境、Git、依赖与常用工具 |
| [编程语言](../content/编程语言/) | Python、Java 等语言的语法、特性、对象模型与运行机制 |
| [数据结构与算法](../content/数据结构与算法/) | 数据结构、排序、搜索、算法与复杂度 |
| [计算机系统](../content/计算机系统/) | 组成原理、操作系统、内存、进程线程与编译 |
| [计算机网络](../content/计算机网络/) | TCP/IP、DNS、HTTP、网络通信与排障 |
| [数据库与存储系统](../content/数据库与存储系统/) | SQL、数据库、索引、事务、缓存、NoSQL 与存储方案 |
| [Web与应用开发](../content/Web与应用开发/) | Web 前后端、API、移动端、桌面应用与相关框架 |
| [软件工程](../content/软件工程/) | 测试、调试、设计、重构、架构与性能分析方法 |
| [基础设施与运维](../content/基础设施与运维/) | Linux 运维、容器、云、部署、CI/CD 与可观测性 |
| [信息安全](../content/信息安全/) | 认证授权、密码学、网络与应用安全、隐私、安全开发与响应 |
| [AI原理与应用](../content/AI原理与应用/) | 数值计算与数据处理基础、数学基础、机器学习、深度学习、模型结构与训练；模型调用、多模态、RAG、Agent、评估、微调、推理与部署 |

具体技术与章节按实际任务添加；每个知识点选择一个主要归属，其他位置通过链接引用。目录与依赖规则见[项目协作协议](../AGENTS.md)。

## 已有课程

已有 10 套课程的正文或已完成章节，共 247 篇 Notebook；篇数只统计实际存在的正文。长代码按步骤补充注释，复杂短代码就地解释形状、状态或参数含义；输出旁说明预期值或可观察特征，便于对照实际结果。先按环境说明准备，再打开章节目录选择内容；标明“预期异常”的独立单元用于观察原始报错，查看后继续下一单元。六份编程规范可独立阅读，入口见下表“代码写法”。

| 技术 | 分类 | 篇数 | 章节目录 | 环境与运行 | 代码写法 |
| --- | --- | --- | --- | --- | --- |
| Python | 编程语言 | 36 | [Python 章节](../content/编程语言/python/plan.md) | [环境说明](../content/编程语言/python/README.md) | [编程规范](../content/编程语言/python/Python编程规范.md) |
| JavaScript | 编程语言 | 30 | [JavaScript 章节](../content/编程语言/javascript/plan.md) | [环境说明](../content/编程语言/javascript/README.md) | [编程规范](../content/编程语言/javascript/JavaScript编程规范.md) |
| TypeScript | 编程语言 | 29 | [TypeScript 章节](../content/编程语言/typescript/plan.md) | [环境说明](../content/编程语言/typescript/README.md) | [编程规范](../content/编程语言/typescript/TypeScript编程规范.md) |
| HTML | Web与应用开发 | 17 | [HTML 章节](../content/Web与应用开发/html/plan.md) | [环境说明](../content/Web与应用开发/html/README.md) | [编程规范](../content/Web与应用开发/html/HTML编程规范.md) |
| CSS | Web与应用开发 | 26 | [CSS 章节](../content/Web与应用开发/css/plan.md) | [环境说明](../content/Web与应用开发/css/README.md) | [编程规范](../content/Web与应用开发/css/CSS编程规范.md) |
| FastAPI | Web与应用开发 | 23 | [FastAPI 章节](../content/Web与应用开发/FastAPI/plan.md) | [环境说明](../content/Web与应用开发/FastAPI/README.md) | [FastAPI 编程规范](../content/Web与应用开发/FastAPI/FastAPI编程规范.md) · [Python 编程规范](../content/编程语言/python/Python编程规范.md) |
| NumPy 数值计算 | AI原理与应用 | 26 | [章节规划](../content/AI原理与应用/NumPy/plan.md) | [环境说明](../content/AI原理与应用/NumPy/README.md) | [Python 编程规范](../content/编程语言/python/Python编程规范.md) |
| pandas 数据处理 | AI原理与应用 | 26 | [章节规划](../content/AI原理与应用/pandas/plan.md) | [环境说明](../content/AI原理与应用/pandas/README.md) | [Python 编程规范](../content/编程语言/python/Python编程规范.md) |
| Python 数据可视化 | AI原理与应用 | 6 | [章节目录](../content/AI原理与应用/python-data-visualization/plan.md) | [环境说明](../content/AI原理与应用/python-data-visualization/README.md) | [Python 编程规范](../content/编程语言/python/Python编程规范.md) · [JavaScript 编程规范](../content/编程语言/javascript/JavaScript编程规范.md) · [HTML 编程规范](../content/Web与应用开发/html/HTML编程规范.md) |
| 数学基础 | AI原理与应用 | 28 | [章节目录](../content/AI原理与应用/mathematical-foundations/plan.md) | [环境说明](../content/AI原理与应用/mathematical-foundations/README.md) | [Python 编程规范](../content/编程语言/python/Python编程规范.md) |

## 建议阅读顺序

NumPy、pandas 与数学基础可按“阅读知识点介绍 → 运行代码示例 → 对照注释观察结果”学习。数学公式与推导保留在讲解中，纯文字选学入口按需阅读。

- Python 入门：按 Python 主线章节学习，再按需要选择进阶专题。
- Web 前端基础：HTML → CSS → JavaScript → TypeScript。已有相关基础时，按章节前置知识选择起点；浏览器应用与框架专题后续补充。
- FastAPI：按[课程规划](../content/Web与应用开发/FastAPI/plan.md)选择主线或选修主题；测试文件入口、客户端生成步骤和本地服务的环境限制见各章与[运行说明](../content/Web与应用开发/FastAPI/README.md)。
- AI 数据基础：建议按 NumPy → pandas → [Python 数据可视化](../content/AI原理与应用/python-data-visualization/plan.md)学习数组、表格与图形表达，分别从[数组创建与形状](../content/AI原理与应用/NumPy/01-数组创建与形状.ipynb)、[Series与DataFrame](../content/AI原理与应用/pandas/01-Series与DataFrame.ipynb)和[Matplotlib基础绘图](../content/AI原理与应用/python-data-visualization/01-Matplotlib基础绘图.ipynb)进入。各课程保持小例子、必要边界和方法选择练习的写法；可视化按图表类型查阅，每种图在一个代码单元内讲解用途、数据、绘制与参数调整，并展示实际成图；每章附重点练习解析，交互工具综合图提供静态预览。NumPy、pandas 的版本边界与扩展范围见各自章节目录。
- 数学基础：按[章节目录](../content/AI原理与应用/mathematical-foundations/plan.md)学习数学表达、线性代数、微积分和概率统计，再选择数值计算、数学建模与扩展主题。共 25 章主线、3 章扩展；各章独立列出所需概念，综合实践包含 PCA 选学；积分已补充反常积分衔接，各章附重点练习的分层提示与解析。

## 项目

暂无综合实践项目。后续项目放在 projects/，完成后在此添加链接。

[返回中文项目首页](../README.zh-CN.md) · [English](../README.md)
