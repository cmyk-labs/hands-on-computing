# Python 模块规划

编写规则统一见[全局协议](../../../AGENTS.md)、[Notebook 协议](../../../docs/notebook-protocol.md)及本课程 [AGENTS.md](AGENTS.md)。本规划中的校验、异常、入口与错误恢复条目表示相应主题的教学范围，不要求普通示例预先添加这些结构；全部示例默认输入满足其说明的条件。


主线 **30 个模块、30 个 .ipynb 文件**；选修 **6 个专题、6 个 .ipynb 文件**，全部展开共 **36 个文件**。每行对应一个 Notebook，主线按顺序学习，选修按需编写。

文件按“二位序号-模块名称.ipynb”命名，主线编号 01–30，选修编号 31–36，例如 `01-运行与代码书写.ipynb`、`31-描述器与元类.ipynb`。

## 主线模块

| 模块 | 计划内容 |
| --- | --- |
| **[1. 运行与代码书写](<01-运行与代码书写.ipynb>)** | 脚本与交互式执行、print/input/help、命名与关键字、注释、缩进、续行、基本错误阅读。 |
| **[2. 内置类型与运算](<02-内置类型与运算.ipynb>)** | 内置类型总览、int/float/complex、bool、None、变量与名称绑定、动态类型、字面值、类型转换、算术与位运算、增强赋值（augmented assignment）、优先级与求值顺序。 |
| **[3. 字符串](<03-字符串.ipynb>)** | 索引与切片、常用方法、转义、原始字符串、f-string、str.format 与 format；了解旧式 % 格式化。 |
| **[4. 容器与对象引用](<04-容器与对象引用.ipynb>)** | list/tuple/range、dict、set/frozenset、增删改查与 del、字典视图、排序、解包；共享引用、可变性、身份与相等、可哈希性、浅拷贝与深拷贝。 |
| **[5. 条件与循环](<05-条件与循环.ipynb>)** | 真值判断、比较与逻辑运算、短路求值、成员检测、if/elif/else、for/while、break/continue/pass、循环 else、enumerate/zip/reversed、all/any/sum/min/max、推导式、赋值表达式、基本模式匹配与 guard 条件。 |
| **[6. 函数与参数](<06-函数与参数.ipynb>)** | 定义、调用、返回值、形参与实参、位置与关键字实参、默认值、`*args`/`**kwargs`、实参解包、仅限位置形参与仅限关键字形参、文档字符串；可变对象作为默认值、参数重新绑定与对象修改。 |
| **[7. 作用域、闭包与高阶函数](<07-作用域、闭包与高阶函数.ipynb>)** | 命名空间、global/nonlocal、函数对象、lambda、闭包、递归、map/filter、排序 key；循环中定义函数时的变量绑定、递归深度。 |
| **[8. 模块与包](<08-模块与包.ipynb>)** | import/from/as、常规包与命名空间包、搜索路径、绝对与相对导入、程序入口、python -m、`__all__`、包资源、循环导入与导入副作用；os/sys 基础、dir；了解 `__future__`。 |
| **[9. 类与对象](<09-类与对象.ipynb>)** | 类与实例、self、类属性与实例属性、方法、`__init__`、property、classmethod/staticmethod、封装、非公开名称约定、名称改写（name mangling）；共享可变类属性。 |
| **[10. 继承与对象协议](<10-继承与对象协议.ipynb>)** | 继承与组合、多态、鸭子类型（duck typing）、super、方法解析顺序（MRO）、抽象基类、常用特殊方法、相等与哈希、NotImplemented、类模式匹配。 |
| **[11. 异常处理与调试](<11-异常处理与调试.ipynb>)** | 异常层次、try/except/else/finally、raise、自定义异常、异常链、异常组与 except*、assert、traceback、breakpoint/pdb；异常传播、清理过程中的异常、断言与输入校验。 |
| **[12. 文件与路径](<12-文件与路径.ipynb>)** | pathlib、文件模式、Unicode 与编码、文本与二进制数据、bytes/bytearray、memoryview、sys.stdin/stdout/stderr、with 读写文件、分块读写、seek/tell、io.StringIO/BytesIO、tempfile/shutil；换行、覆盖与资源关闭。 |
| **[13. 迭代器与生成器](<13-迭代器与生成器.ipynb>)** | 可迭代对象、iter/next、迭代协议、生成器函数与表达式、yield/yield from、send/throw/close；惰性求值、耗尽与清理。 |
| **[14. 装饰器](<14-装饰器.ipynb>)** | 包装函数、装饰器语法、带参数装饰器、叠加顺序、functools.wraps；元数据保留与调试。 |
| **[15. 上下文管理器](<15-上下文管理器.ipynb>)** | with 的执行过程、`__enter__`/`__exit__`、异常处理、contextlib.contextmanager、ExitStack；资源释放。 |
| **[16. 类型标注基础](<16-类型标注基础.ipynb>)** | 变量、函数与容器标注、联合类型、Optional、Any、Literal、类型别名与 type 语句；静态检查与运行时行为。 |
| **[17. 泛型与静态类型检查](<17-泛型与静态类型检查.ipynb>)** | 类型参数语法（Python 3.12）、TypeVar/ParamSpec/TypeVarTuple、Callable 与迭代类型标注、TypedDict、Protocol、Self、Final、ClassVar、overload、类型收窄（type narrowing）与 TypeGuard、前向引用、TYPE_CHECKING、类型检查器与第三方类型声明。 |
| **[18. 数据类与枚举](<18-数据类与枚举.ipynb>)** | dataclass 字段、默认值与 default_factory、生成的方法、frozen、继承、Enum；数据对象的设计。 |
| **[19. 文本与数据格式](<19-文本与数据格式.ipynb>)** | re、JSON、CSV、tomllib、格式转换与输入校验、JSON 支持的类型与限制；了解 pickle 及可信数据要求。 |
| **[20. 数值、日期与时间](<20-数值、日期与时间.ipynb>)** | math、decimal、fractions、statistics、random/secrets、datetime、zoneinfo；浮点误差、数值精度、随机数用途和时区。 |
| **[21. 标准库容器与函数工具](<21-标准库容器与函数工具.ipynb>)** | collections、heapq、bisect、itertools、functools.partial、缓存；容器选择、惰性处理、缓存参数与失效。 |
| **[22. 命令行、日志与配置](<22-命令行、日志与配置.ipynb>)** | sys.argv、argparse、退出状态、环境变量、配置读取、logging、subprocess；重复日志、子进程参数传递与超时。 |
| **[23. SQLite 与事务](<23-SQLite 与事务.ipynb>)** | 连接、查询、SQL 参数绑定、事务、提交与回滚、结果处理、连接关闭。 |
| **[24. 自动化测试](<24-自动化测试.ipynb>)** | unittest 的定位、pytest、测试发现与断言、fixture、参数化、unittest.mock、monkeypatch、临时文件、输出捕获、测试隔离与 mock 的替换位置；了解 doctest。 |
| **[25. 项目组织与打包](<25-项目组织与打包.ipynb>)** | Python 环境与依赖管理、项目布局、PEP 8、代码检查、pyproject.toml、构建后端、wheel、源码分发包、命令行入口、安装检查与持续集成；依赖可复现、敏感配置与版本兼容。 |
| **[26. 线程与进程](<26-线程与进程.ipynb>)** | 并发与并行、threading/multiprocessing、锁、队列、concurrent.futures、线程池与进程池、竞态与死锁、进程启动方式、数据传递与序列化、资源清理；仅在所讲进程启动方式需要时使用入口隔离，并解释其作用。 |
| **[27. 异步编程](<27-异步编程.ipynb>)** | 协程、事件循环、async def/await、asyncio 任务、async for/with、异步迭代器与生成器、TaskGroup、超时、取消、Semaphore、asyncio.to_thread、contextvars；阻塞事件循环、取消传播与资源清理。 |
| **[28. CPython 运行机制](<28-CPython 运行机制.ipynb>)** | Python 与 CPython、编译与字节码、dis、导入查找与 sys.modules 缓存、引用计数、循环引用与垃圾回收、弱引用、GIL；自由线程（free-threading）的版本概览、语言保证与实现细节。 |
| **[29. 性能分析与优化](<29-性能分析与优化.ipynb>)** | timeit、cProfile、tracemalloc、工作负载与基准、耗时与内存；先测量再优化、优化前后正确性与收益比较。 |
| **[30. 综合工程实践](<30-综合工程实践.ipynb>)** | 一个文件分析命令行项目逐步加入配置、日志、测试、打包和批处理；输入条件、异常处理、运行说明、资源关闭与性能比较。 |

## 选修专题

| 模块 | 计划内容 |
| --- | --- |
| **[31. 描述器与元类](<31-描述器与元类.ipynb>)** | 属性查找、描述器（descriptor）、`__slots__`、`__new__`、类创建与元类。 |
| **[32. AST 与动态执行](<32-AST 与动态执行.ipynb>)** | AST、对象自省、代码检查与转换、compile/eval/exec；动态执行的限制与可信输入。 |
| **[33. 插件机制](<33-插件机制.ipynb>)** | 动态导入、插件发现、入口点、接口约定与错误处理。 |
| **[34. C 扩展](<34-C 扩展.ipynb>)** | 必要的 C 语言前置知识、Python/C API、引用管理、构建与兼容。 |
| **[35. 自由线程实践](<35-自由线程实践.ipynb>)** | 对应 Python 版本与构建、线程安全、扩展兼容、实际性能比较。 |
| **[36. Pygame 图形与游戏](<36-Pygame 图形与游戏.ipynb>)** | 绘制、事件、游戏循环、状态与资源管理。 |

以 Python 3.12 为基线，本课程使用 hands-on-computing Conda 环境，配置见本目录 [README.md](README.md)；其他版本特性单独注明。类先于自定义异常，装饰器和类型标注先于 dataclass；with 的文件用法在第 12 篇引入，完整机制在第 15 篇展开。

相关知识在篇内分节，易错点与工程注意随知识点讲解，不固定套用“核心／高阶／工程”三栏。必需的配套脚本及资源按需放在 `scripts/章节/` 下，例如 `scripts/08-modules-and-packages/`；Notebook 头部列明位置和用途，保留为唯一教学正文。检查结束后清理临时文件。

教学参考：[Python 官方教程](https://docs.python.org/zh-cn/3.12/tutorial/index.html)、[赫尔辛基大学 Python MOOC](https://programming-26.mooc.fi/)。知识与术语依据：[Python 语言参考](https://docs.python.org/zh-cn/3.12/reference/index.html)、[标准库](https://docs.python.org/zh-cn/3.12/library/index.html)、[术语对照表](https://docs.python.org/zh-cn/3.12/glossary.html)、[编程 FAQ](https://docs.python.org/zh-cn/3.12/faq/programming.html)；工程部分依据 [pytest](https://docs.pytest.org/en/stable/how-to/index.html) 和 [PyPA 打包指南](https://packaging.python.org/en/latest/tutorials/packaging-projects/)。本表为基于这些来源的主题编排，不代替全部 API 文档；正文写作前仍须逐点核查具体来源与适用条件。
