# Python 编程规范

> 阅读定位：本文说明语言或平台规则、代码风格和一般工程建议，保留来源的原意及适用条件。本项目的实现取舍统一见[根协议](../../../AGENTS.md#课程编写的七条原则)，其中全部代码的最简原则也适用于本文示例。校验、异常、入口等章节是在讲相应机制；其写法不自动成为其他示例的必加结构。一般工程建议不能被当作给当前教学代码增加防护的依据。


第 3 版 · 来源核查日期：2026-09-13

本文面向 Python 脚本、应用和可复用库，整理代码风格、接口设计及工程维护的常用规范。阅读需要具备函数、类、模块和异常的基础知识；示例使用 Python 3.10 及以上语法，具体项目仍须遵守自己的最低支持版本。

本文为官方文档与第一方指南的选编、中文转述和工程整理。示例为本文编写；原文有条件或允许例外的建议，在这里保留其适用范围。引用定位集中在篇末，按对应章节查阅。

## 1 依据与适用原则

### 1.1 不同来源分别解决什么问题

| 来源 | 性质 | 本文采用的范围 |
| --- | --- | --- |
| PEP 8 | Python 标准库的代码风格指南，也供其他项目参考 | 布局、命名、导入、公共接口和常用写法 |
| PEP 257 | 文档字符串约定 | 文档字符串的位置、结构和应说明的内容 |
| PEP 387 | Python 自身的向后兼容政策 | 接口弃用与迁移沟通的参考；不照搬其过渡周期 |
| Python 语言参考与标准库文档 | 语言语义和 API 行为依据 | 默认参数、类型标注、异常、资源、日志与安全边界 |
| Google Python Style Guide | Google 的团队风格指南 | 函数组织、文档格式等有明确适用条件的实践 |
| PyPA 与 pip 文档 | Python 打包规范及工具维护者指南 | 项目元数据、源码布局、依赖声明、可重复安装与版本维护 |
| typing、pytest、Ruff 官方文档 | 对应领域的维护者指南 | 类型设计、测试组织、自动检查及工具边界 |
| Requests 官方文档 | HTTP 客户端维护者指南 | 连接与读取超时的 API 语义；不要求项目采用该库 |
| OWASP Cheat Sheet Series | OWASP 的应用安全实践指南 | 凭据管理、日志中的敏感数据处理 |
| Google Engineering Practices | Google 的工程评审指南 | 复杂度、测试有效性、文档同步和评审尺度 |

### 1.2 怎样理解规范的强度

**语言与 API 约束**描述程序的实际行为，例如默认参数何时求值、类型标注是否参与运行时检查。项目的风格选择不能改变这些行为。

**风格建议**描述优先采用的写法。本文以 PEP 8、PEP 257 为基础；项目已有明确约定时，按项目约定保持一致。PEP 8 明确允许这种选择，也要求避免仅为风格一致而破坏向后兼容。

**工程建议**用于解决特定的维护、测试或交付问题。是否采用 `src/` 布局、哪种格式化器、哪些检查进入持续集成，应结合项目类型决定。下文用“建议”“可采用”“适用于”等措辞保留这种选择空间。

修改既有代码时，优先解决当前问题并保持邻近代码一致。没有可读性、正确性或维护收益时，不为个人偏好批量改名、拆函数或重排文件。

## 2 代码布局与格式

### 2.1 缩进、换行与空行

- 每级缩进使用 4 个空格。既有文件使用制表符时，按项目的迁移安排处理，避免在同一缩进结构中混用。
- 长表达式优先利用圆括号、方括号或花括号换行；续行采用垂直对齐或清楚的悬挂缩进，避免依赖容易遗漏的行尾反斜杠。
- 顶层函数与类之间留两个空行；类内方法之间通常留一个空行。函数内部用空行区分少量逻辑阶段。
- 一行通常只写一条语句，不用分号把多个操作挤在一起。多分支控制流展开书写。
- 二元运算符前后断行都可以，但局部保持一致；PEP 8 对新代码建议在运算符前断行。

### 2.2 行宽与引号

PEP 8 建议代码行不超过 79 个字符，注释与文档字符串中的连续文本不超过 72 个字符。主要由同一团队维护、且团队达成一致时，代码行宽可以放宽到 99，连续说明文字仍按 72 换行。

自动格式化器可能采用不同默认值，例如 Ruff 默认行宽为 88。这属于工具或项目配置，不能把 79、88 或 99 写成 Python 的语法限制。项目选定后，应让编辑器和自动检查使用同一约定。

普通字符串的单引号和双引号没有 PEP 8 层面的优先级；保持局部一致，并尽量减少转义。文档字符串按 PEP 257 使用三重双引号。

### 2.3 空格与尾随逗号

- 赋值、比较等运算符两侧通常各留一个空格；逗号后留空格，括号内侧和函数调用的左括号前不额外加空格。
- 无类型标注的默认参数和调用中的关键字参数写成 `limit=10`；带类型标注的默认参数写成 `limit: int = 10`。
- 不用大量空格把不同语句的等号排成一列，不保留行尾空白。
- 已经按多行排列的参数或容器元素，可以保留尾随逗号，便于后续增删。单元素元组中的逗号则是语义所需。

```python
def format_label(name: str, count: int = 0) -> str:
    """生成包含名称与数量的标签。"""
    return f"{name}: {count}"


labels = [
    format_label("完成", count=3),
    format_label("待处理", count=2),
]
```

## 3 命名、导入与公共接口

### 3.1 让名称说明用途

| 对象 | PEP 8 推荐形式 | 示例与边界 |
| --- | --- | --- |
| 模块 | 简短的小写名称，必要时用下划线 | `report.py`、`file_reader.py` |
| 包 | 简短的小写名称 | `reports`；PEP 8 不鼓励包名使用下划线，但不是语法禁止 |
| 函数、方法、参数与变量 | `snake_case` | `read_report`、`retry_count` |
| 类 | `CapWords` | `ReportReader` |
| 表示错误的异常类 | `CapWords`，通常以 `Error` 结尾 | `ReportFormatError` |
| 模块级常量 | `UPPER_CASE_WITH_UNDERSCORES` | `DEFAULT_TIMEOUT`；命名不会阻止重新赋值 |
| 实例方法首参数 | `self` | 约定名称 |
| 类方法首参数 | `cls` | 约定名称 |
| 非公共成员 | 单前导下划线 | `_parse_header`；表达使用约定，不提供访问控制 |

名称应足以说明用途，同时避免冗长。不要单独用容易混淆的 `l`、`O`、`I` 作变量名；科学公式中的惯用短名称可在上下文中解释含义。

与 Python 关键字冲突时，可加尾随下划线，如 `class_`。双前导下划线主要用于类的名称改写、避免子类冲突，不是安全机制；两端双下划线的特殊名称只使用语言文档已定义的形式。

PEP 8 对标准库要求使用 ASCII 标识符，并鼓励面向全球读者的项目采用相近政策。普通项目的语言选择由目标读者与协作约定决定，不把“必须英文”扩写成 Python 的语法限制。

### 3.2 导入清楚、来源可辨

- 导入通常放在文件顶部、模块文档字符串之后，并早于模块级变量与常量。
- 按标准库、第三方依赖、本项目模块分组，组间留空行；多个独立模块通常分别写 `import`。
- 优先使用清楚的绝对导入；包内显式相对导入也可以，尤其适合绝对路径过长的情况。
- 避免 `from module import *`，以便读者判断名称来源。公开接口的受控重新导出属于需专门说明的例外。
- 使用 `from __future__ import ...` 时遵守其位置要求：位于模块文档字符串之后、其他普通语句之前。

### 3.3 明确哪些接口允许外部依赖

对外提供的函数、类和属性应有相应文档。用单前导下划线标记内部实现；需要明确模块导出范围时可使用 `__all__`。它主要影响星号导入等行为，不会阻止调用者直接访问其他名称。

修改公开名称、参数、返回值或异常行为时，应评估调用方兼容性。简单的数据属性可以直接公开；确实需要控制属性读写时再引入 `property`。属性访问应符合读者预期，不把昂贵操作或明显副作用隐藏在普通属性读取中。

## 4 函数、数据与状态

### 4.1 围绕清楚的职责组织函数

Google Python Style Guide 建议函数小而集中，但没有规定统一的最大行数。约 40 行是提醒作者重新考虑结构的尺度，不是超出就必须拆分的硬门槛。

判断是否拆分时，关注能否清楚命名、能否独立理解，以及调用者是否容易正确使用。Google 工程评审指南也强调解决当前需要，避免为尚未出现的需求增加通用框架或额外抽象。

**工程整理：** 据上述函数组织与复杂度建议，本文采用以下判断方式，不设置统一的函数数量或最小行数要求：

- 函数即使很短，只要表达独立职责、复用规则或隔离文件等外部操作，就有保留价值。只调用一次也不等于应该合并。
- 连续且紧密相关的步骤可以放在同一个函数中。仅转发参数、没有补充语义且增加阅读跳转的包装，可考虑合并；不要为达到某个行数而机械拆分。
- `if/elif` 表达少量直接的业务选择时，可以保留。是否改用分发表或其他结构，取决于扩展与阅读需要，不以减少分支数量为目标。

命名函数通常用 `def`；`lambda` 适合需要内嵌短函数的场景，不用它替代普通函数定义。推导式用于清楚的数据变换，复杂到需要反复解释时，应考虑展开为循环。

### 4.2 区分缺省值、空值与共享对象

默认参数在函数定义执行时求值，不会在每次调用时重新创建。每次调用都需要独立容器时，使用 `None` 等缺省标记，在函数内部创建。

```python
def add_tag(tag: str, tags: list[str] | None = None) -> list[str]:
    """追加标签；传入列表时原地修改，省略列表时创建新列表。"""
    if tags is None:
        tags = []
    tags.append(tag)
    return tags
```

这个接口特意允许修改调用方传入的列表，因此文档明确说明副作用。如果接口承诺保留输入，就应实现相应复制，并考虑浅拷贝是否足以满足数据结构的要求。

不要用 `tags = tags or []` 替代这里的判断：调用方传入的空列表也是假值，但与省略参数含义不同。业务允许 `None` 本身作为有效值时，还需要单独的缺省标记。

### 4.3 把实例自己的可变数据放到实例中

类属性适合有意共享的状态；每个实例独立拥有的列表、字典等，应在实例初始化时创建。使用 `dataclass` 时，默认工厂可以完成这种初始化。

```python
from dataclasses import dataclass, field


@dataclass
class Report:
    """保存报告标题与各实例独立的标签。"""

    title: str
    tags: list[str] = field(default_factory=list)
```

`default_factory` 接受无参数可调用对象，创建默认字段值时再调用。`dataclass` 自动生成部分方法，但字段标注本身不承担输入校验。

### 4.4 判断与返回值保持一致

- 判断 `None` 使用 `is None` 或 `is not None`；比较普通值是否相等使用 `==`，不要依赖解释器是否复用某个对象。
- 判断一个容器是否为空时可直接检查真值；如果还要区分 `None`、空容器、零等不同输入，应分别判断。
- 一个函数若有分支返回结果，其他正常分支也应明确其返回约定；需要表示“没有结果”时，明确返回 `None` 并说明含义。
- 迭代集合时，谨慎同时增删该集合；需要改变其内容时，考虑遍历副本或构造新集合。

## 5 类型标注与输入校验

### 5.1 标注真实的接口关系

类型标注用于静态检查、编辑器辅助与接口说明；Python 运行时不会自动强制执行函数和变量的标注。因此，文件、网络、命令行等入口的数据，仍须按实际业务约定校验。

采用类型检查的项目，应优先让接口的输入、输出关系清楚。显然可推断的局部变量通常不需要重复标注；是否覆盖全部函数，由项目的检查策略决定。

typing 官方指南建议：参数尽量表达实际需要的能力，具体实现的返回值尽量给出明确类型。例如只需遍历时可接受 `Iterable[str]`，确实需要索引访问时再考虑 `Sequence[str]`。

```python
from collections.abc import Iterable


def collect_names(names: Iterable[str]) -> list[str]:
    """依次收集名称；迭代器输入会在本次调用中被消费。"""
    return list(names)
```

不要为了表面通用而把需要修改的列表标成只读接口，也不要承诺实际上没有保留的类型关系。

**工程整理：** 结合类型标注的运行时边界与 Google 工程评审的复杂度建议，安排校验时应明确每一层的职责：

- 文件、网络、命令行等外部入口检查实际需要的格式、结构与取值。结构检查与业务规则可以分工，字段范围、归一化等共同规则尽量集中维护。
- 同一调用过程中，已由构造函数或属性赋值完成的校验，调用方通常无需对未改变的值再做一遍。不要仅为重复校验而进行“对象 → 字典 → 新对象”的往返转换。
- 对象允许修改、数据再次来自外部或操作约束变化时，可以重新校验。例如保存前检查可变字段有实际用途，不能机械理解为“整个生命周期只校验一次”。

减少重复校验的前提是清楚知道数据经过了什么处理，以及此后能否改变。类型标注、`cast()` 和内部命名约定都不能单独作为外部数据有效的证明。这些是维护建议，不是 Python 的语法要求。

### 5.2 给类型系统留下可检查的信息

- `list[str]` 等内置泛型语法要求 Python 3.9 及以上；联合类型的 `X | Y` 语法要求 Python 3.10 及以上。最低支持版本更早时，选择对应版本支持的写法。
- 接受任意对象、且只做所有对象共有的操作时，优先考虑 `object`。`Any` 适用于暂时无法恰当表达类型等情况，会让相关检查变得宽松，应控制使用范围。
- `str | None` 表示值可能为 `None`；参数有默认值，不意味着它一定需要包含 `None`。
- `cast()` 表达作者对类型的断言，不转换对象，也不验证对象的内容；不能用它代替外部输入校验。

## 6 异常处理与资源管理

### 6.1 在能处理问题的位置捕获异常

尽量捕获具体异常，并把 `try` 范围缩到预期可能失败的操作。失败后需要恢复、转换接口错误或做必要清理时再捕获；没有处理动作时，让异常继续传播通常更清楚。

**工程整理：** `try` 或条件判断的数量本身不能说明是否过度防御。文件读写错误、解析失败、事务回滚与连接关闭都有具体职责，应按需要保留；仅为再抛出同一异常，或让多个层级重复记录同一次失败而增加捕获，通常没有必要。评审时检查这些处理是否提供了恢复、接口转换、清理或明确的报告价值。

裸 `except:` 会连同 `KeyboardInterrupt`、`SystemExit` 一起捕获。应用最外层确实需要兜底时，可以在明确的报告与退出策略下处理 `Exception`，不要捕获后无条件忽略。

转换异常时，用 `raise ... from error` 保留原始原因。普通自定义错误继承 `Exception` 或适当的内置异常；异常类别应帮助调用者判断问题类型。

下面的接口自行约定只接受 0～100 的整数百分数。这是示例的业务范围。

```python
def parse_percent(text: str) -> int:
    """把整数文本解析为 0～100 的百分数。

    Args:
        text: 可由 int 按十进制解析的整数文本。

    Returns:
        包含两端边界的整数百分数。

    Raises:
        ValueError: 文本不能转为整数，或结果超出允许范围。
    """
    try:
        value = int(text)
    except ValueError as error:
        raise ValueError("百分数必须是整数文本") from error
    if not 0 <= value <= 100:
        raise ValueError("百分数必须在 0～100 之间")
    return value
```

`assert` 适合开发时检查内部假设。优化模式可能移除断言，不应依赖它完成用户输入、权限或业务规则校验。

### 6.2 明确资源由谁关闭

支持上下文管理协议的文件、连接等资源，优先按相应 API 使用 `with`；其他资源用可靠的 `try/finally` 管理生命周期。资源是否由被调用函数关闭，应在接口中说明。

不同对象的上下文管理器可能管理不同职责：例如 Python 3.12 的 `sqlite3.Connection` 上下文管理器处理事务提交或回滚，并不关闭连接。因此，不能把所有 `with` 都理解成“结束后资源一定关闭”。

```python
from pathlib import Path


def read_utf8(path: Path) -> str:
    """读取约定为 UTF-8 的文本，并在退出时关闭文件。"""
    with path.open(encoding="utf-8") as stream:
        return stream.read()
```

编码应与文件格式约定一致；格式明确为 UTF-8 时显式指定，避免依赖平台默认值。相对路径的起点也要明确。`Path` 与 `os.path` 都是标准库选择，项目可以根据现有接口采用其中之一。

不要在 `finally` 中用 `return` 等控制流意外覆盖正在传播的异常。自定义上下文管理器捕获异常后，如果只是记录或清理，应重新抛出，避免把失败误报为成功。

### 6.3 明确外部调用的等待边界

**工程整理：** 调用网络服务或需要限时完成的外部程序时，建议显式设置超时。根据业务允许的等待时间和所用 API，明确参数单位、作用阶段及超时后的处理；数值由项目选择。

同名的 `timeout` 参数可能有不同语义：

- Requests 默认不设置超时。`timeout=(3.0, 10.0)` 分别设置连接与读取超时，单位为秒；读取超时限制连续未收到服务器数据的等待时间。这两个值都不是整个请求的总耗时上限。这里的数值只用于说明参数，不是通用推荐值。
- `subprocess.run()` 的 `timeout` 以秒为单位；超时后会终止子进程、等待其结束，再抛出 `subprocess.TimeoutExpired`。许多平台上的初始进程创建不能被该超时中断，因此也不能把它当作严格的整个调用耗时上限。

超时异常的传播、报告或恢复按第 6.1 节处理。只有能决定下一步动作的层才需要捕获，例如 Requests 的 `requests.exceptions.Timeout`；无需为每次调用都增加一层捕获。

## 7 注释与文档字符串

### 7.1 注释补充代码表达不出的信息

注释优先说明决策原因、约束、边界和不直观的算法。代码已经清楚表达的操作，不必逐句重复。修改代码时同步修改相关注释，避免保留相反或过时的说明。

普通块注释使用 `# ` 开头；行内注释与语句之间通常至少隔两个空格，并控制数量。注释语言面向实际读者选择；PEP 8 对可能由国际读者阅读的代码建议使用英文。本文示例使用中文，是本文的读者选择。

### 7.2 公共接口写清行为与使用条件

PEP 257 建议模块、公开的函数、类和方法通常提供文档字符串。文档字符串位于模块、函数、类或方法的第一条语句位置，使用三重双引号。

简单接口可以只有一句摘要；多行文档采用“摘要 → 空行 → 详细说明”。按需要说明参数、返回值、异常、副作用和调用限制，不把签名原样重复一遍。

PEP 257 规定高层结构，不指定 `Args:` 等字段语法。第 6 节示例采用 Google 风格的 `Args:`、`Returns:`、`Raises:` 分节；这是可选格式，项目也可使用其他与文档工具匹配的格式。简单接口无需凑齐没有信息量的分节。

参数名保持与代码一致。类型标注已经表达的类型通常无需在文档中重复，但单位、允许范围、空输入和是否修改调用方对象仍须说明。生成器如采用 `Yields:`，描述每次产出的值。

## 8 日志与安全边界

### 8.1 由应用统一安排日志输出

库代码使用有明确名称的 logger，例如 `logging.getLogger(__name__)`。应用负责配置级别、格式和处理器；库不要在导入时擅自配置根 logger 或添加文件、终端处理器，需要静默缺省行为时可考虑 `NullHandler`。

使用标准 `logging` 时，把消息模板与参数分别传入：

```python
import logging

logger = logging.getLogger(__name__)


def log_summary(count: int) -> None:
    """记录已经处理的条目数，由调用应用决定输出方式。"""
    logger.info("已处理 %s 条记录", count)
```

这种写法允许日志系统延后组合消息，但函数实参中的计算仍然会发生。需要在异常处理器中保留堆栈时，可用 `logger.exception()`。程序明确要求输出给用户的结果可以使用 `print()`，按输出目的选择。

### 8.2 不把外部数据当作可信指令

以下是对应标准库 API 的使用边界：

- SQL 中的数据值使用驱动提供的参数绑定，不通过字符串拼接或格式化插入。占位符的写法按驱动文档确定；动态表名、列名不能当作普通数据值绑定。
- 调用普通可执行程序时，优先向 `subprocess.run()` 传参数序列，并保持 `shell=False`；需要 Shell 语法时再单独评估输入与转义。Windows 的 `.bat`、`.cmd` 有额外的 Shell 解析边界，不能只凭 `shell=False` 判断安全。
- 不反序列化不可信的 `pickle` 数据，其加载过程可能执行代码。改用 JSON 等格式后，仍需校验数据结构、业务取值及适当的输入大小。
- 生成口令重置令牌等安全用途的随机值时使用 `secrets`；`random` 面向模拟等用途，不提供相同的安全保证。

### 8.3 管理凭据并控制日志中的敏感数据

以下根据 OWASP 的凭据管理与日志指南整理，适用于处理密码、访问令牌、API 密钥等敏感数据的项目：

- 避免把真实凭据硬编码到源码、测试数据或随代码分发的配置中；文档示例使用明确的占位值。运行时通过部署环境提供的受控配置或凭据管理服务取得，并限制读取权限。
- 日志通常不应直接记录密码、访问令牌、密钥或含凭据的数据库连接字符串；按字段需要省略或脱敏。记录请求、配置对象和异常信息时，也应检查其中是否夹带敏感值。
- 已暴露的凭据应及时撤销、轮换，再按项目流程清理泄露位置。只从当前文件中删除字符串，不能使已经泄露的凭据失效。

凭据传递方式须结合部署平台选择。OWASP 对容器环境特别提醒：环境变量可能进入日志或系统转储；采用这种方式时仍要评估暴露范围，不能仅凭“放在环境变量中”判断安全。

## 9 项目组织与程序入口

### 9.1 按导入与交付需求选择布局

对于需要安装、测试和分发的包，可以采用下面的 `src/` 布局。它把可导入源码与仓库根目录的其他文件分开，帮助发现因工作目录而误导入源码的问题。

```text
report-project/
├── pyproject.toml
├── README.md
├── src/
│   └── reports/
│       ├── __init__.py
│       ├── core.py
│       └── cli.py
└── tests/
    └── test_core.py
```

这是布局示意，目录与模块按实际职责创建。`src/` 布局通常需要先安装项目，开发时可采用可编辑安装；较简单的项目也可使用扁平布局。PyPA 对两者给出了取舍，并没有要求所有脚本都先变成包。

### 9.2 让可导入模块与执行入口分工清楚

需要同时被导入和直接执行的模块，把主要执行流程放进 `main()`，用入口保护避免导入时运行主流程。配置读取、参数解析和启动动作应安排在合适的执行入口。

```python
def main() -> int:
    """执行本程序的命令行入口。"""
    print("报告工具已就绪")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

这里 `main()` 返回退出状态，`SystemExit` 只出现在程序边界。可复用函数通常返回值或抛出异常，让调用者决定如何展示和退出。打包为命令行工具时，可通过 `[project.scripts]` 声明入口函数。

## 10 依赖、构建与交付

### 10.1 区分不同用途的依赖

`pyproject.toml` 可保存构建信息、项目元数据和工具配置。各字段有自己的职责：

| 位置 | 主要用途 |
| --- | --- |
| `[build-system]` | 构建后端及构建过程所需依赖 |
| `[project]` 中的 `requires-python` | 项目声明支持的 Python 版本范围 |
| `[project]` 中的 `dependencies` | 安装项目时需要的运行依赖 |
| `[project.optional-dependencies]` | 调用者按需选择的可选功能依赖 |
| `[dependency-groups]` | 测试、文档等内部开发依赖组；需要工具支持，且不作为包的运行依赖写入构建元数据 |
| `[tool.<工具名>]` | 由相应工具定义的配置 |

不要把仅供测试或格式化的工具无故列为库的运行依赖。采用其他受支持的配置方式时，也应保留这种职责区别。

### 10.2 区分库的兼容范围与应用的可重复环境

供其他项目安装的库，应声明它实际需要且兼容的直接依赖条件；通常不应把开发机器的全部依赖快照当作库的运行依赖。

应用部署或需要重复还原的实验，则可通过锁文件或完整固定版本的依赖清单记录解析结果，包括传递依赖。`requirements.txt` 本身只是 pip 的输入格式，是否可重复取决于它实际约束了什么。

需要进一步约束下载内容时，可以使用哈希校验。还应保留影响安装结果的 Python、平台和构建条件；固定版本号或下载哈希，不等于所有机器都能得到相同的运行行为。

### 10.3 检查使用者实际拿到的产物

PyPA 与 pytest 的布局、安装指南支持分别测试开发源码和安装后的包。据此，本文建议对需要分发的项目，在交付前检查实际构建产物：

- 所需模块、资源与元数据是否包含在产物中。
- 在与源码目录隔离的安装位置，公开导入和命令入口是否可用。
- 文档中的运行方式，是否适用于安装后的版本。

这些检查按项目的发布方式选择；安装成功只说明安装步骤完成，功能是否正确仍需相应测试。

### 10.4 说明版本策略与兼容性变化

需要持续发布的包，应在项目文档中说明版本策略及兼容性承诺。用于分发的版本标识遵循 PyPA 的版本规范；语义化版本（SemVer）、日历版本等是不同的维护策略，由项目选择。版本号的合法格式与它对兼容性的承诺，是两件需要分别说明的事。

**工程整理：** 结合 PyPA 版本指南和 PEP 387 的兼容性沟通方式，本文建议在发布说明中交代影响使用者的行为变化，尤其是不兼容修改。计划弃用公开接口时，说明原因、可用的替代方式，以及是否计划移除和预期版本；过渡期按项目承诺确定。PEP 387 约束 Python 自身，其具体过渡周期不作为其他项目的统一要求。

调整支持的 Python 版本时，同步更新 `requires-python`、运行文档和测试环境；发布前核对构建产物中的 `Requires-Python` 元数据。PyPA 建议每次 Python 版本兼容范围的变化都通过新版本发布，使安装工具能够按声明选择适用的版本。

## 11 测试、工具与维护

### 11.1 测试可观察的行为

测试围绕接口承诺编写，核对返回值、必要副作用和预期失败。Google 工程评审指南要求检查测试是否有意义、实现出错时是否真的会失败；据此，本文建议优先覆盖正常输入、空输入、边界值及主要错误路径。

相同规则的多组输入可使用 pytest 参数化。文件测试可使用 `tmp_path` 提供各测试独立的临时目录；替换外部对象时，应在被测代码查找该名称的位置进行 `patch`。

测试应保持可读，避免把待验证的算法再实现一遍作为预期结果。是否采用单元、集成或端到端测试，要对应变更影响的行为；替换了文件或网络边界的测试，只能支持其实际覆盖的结论。

**工程整理：** pytest 将环境隔离不足和测试顺序依赖列为不稳定测试的重要原因。组织测试时，还应控制影响结果的外部状态：

- 每个测试自行准备所需状态，避免依赖前一个测试留下的文件、数据或执行结果；清理动作应在测试失败时也能执行。
- 修改环境变量、工作目录或共享配置时，安排作用域结束后的恢复。pytest 的 `monkeypatch` 可以自动撤销通过它所做的修改，其他资源仍由相应 fixture 或上下文管理器清理。
- 当前时间、随机结果或外部服务响应会影响断言时，可提供受控输入或替换相关依赖。确实需要连接真实服务的集成测试，应明确环境条件和数据清理方式。

### 11.2 分清各种自动检查的职责

| 检查 | 主要作用 | 示例工具或方法 |
| --- | --- | --- |
| 格式检查 | 统一代码排版 | Ruff formatter 等 |
| 静态规则检查 | 按启用规则发现可疑写法与风格问题 | Ruff linter 等 |
| 类型检查 | 检查标注与操作间的类型关系 | 类型检查器，如 mypy |
| 运行测试 | 验证选定输入下的实际行为 | pytest、unittest |
| 安装产物检查 | 验证安装后的导入、资源与入口 | 在独立安装位置运行消费者用例 |

工具配置决定检查范围。Ruff 默认不会启用所有规则，格式化也不等于自动修复全部静态问题。代码能够运行、格式通过或类型检查通过，都不能替代其他检查的实际结果。

本文建议在项目中明确采用哪些检查及其配置，并在本地与持续集成中复用。具体工具、版本和命令由项目选择，不要求每个小脚本具备相同的工具组合。

### 11.3 评审与优化以实际收益为准

评审关注正确性、设计、复杂度、测试及文档；风格问题按已采用的约定判断。Google 的评审标准允许有明确权衡的改进，不要求追求假想的完美，也不应把个人喜好当作阻止改动的理由。

需要优化时，先明确要测量的工作负载。标准库 `cProfile` 适合定位调用成本，`timeit` 适合重复测量小段代码。性能分析器的输出不能直接当作微基准结果；比较时应检查优化前后是否仍满足相同的功能约定。

## 参考与引用来源

以下均为官方或第一方来源。PEP 8、PEP 257 的原文声明为公有领域；Google 指南及其他材料按各自来源授权使用。本文保留出处、以中文转述和原创示例组织内容，不为整个项目另行声明许可证。

1. **Python PEPs｜第 1～4、6～7、10 节。** [PEP 8：一致性与例外](https://peps.python.org/pep-0008/#a-foolish-consistency-is-the-hobgoblin-of-little-minds)、[代码布局](https://peps.python.org/pep-0008/#code-lay-out)、[引号](https://peps.python.org/pep-0008/#string-quotes)、[空白](https://peps.python.org/pep-0008/#whitespace-in-expressions-and-statements)、[尾随逗号](https://peps.python.org/pep-0008/#when-to-use-trailing-commas)、[命名](https://peps.python.org/pep-0008/#naming-conventions)、[公共接口](https://peps.python.org/pep-0008/#public-and-internal-interfaces)、[编程建议](https://peps.python.org/pep-0008/#programming-recommendations)、[注释](https://peps.python.org/pep-0008/#comments)；[PEP 257：文档字符串约定](https://peps.python.org/pep-0257/#specification)；[PEP 387：软弃用](https://peps.python.org/pep-0387/#soft-deprecation)、[不兼容变更的沟通与迁移](https://peps.python.org/pep-0387/#making-incompatible-changes)。PEP 387 在第 10.4 节仅用作工程整理的参考，不将 Python 自身的发布政策扩写为所有项目的规则。

2. **Google Python Style Guide｜第 3～4、7、9 节。** [§2.7 推导式](https://google.github.io/styleguide/pyguide.html#s2.7-comprehensions)、[§2.13 属性](https://google.github.io/styleguide/pyguide.html#s2.13-properties)、[§3.8.3 函数文档](https://google.github.io/styleguide/pyguide.html#s3.8.3-functions-and-methods)、[§3.17 程序入口](https://google.github.io/styleguide/pyguide.html#s3.17-main)、[§3.18 函数长度](https://google.github.io/styleguide/pyguide.html#s3.18-function-length)。这些是 Google 的团队建议，本文只选取上述主题并转述；来源授权见其 [LICENSE](https://github.com/google/styleguide/blob/gh-pages/LICENSE)。

3. **Python 3.12 官方文档｜第 4～6 节。** [默认参数](https://docs.python.org/3.12/tutorial/controlflow.html#default-argument-values)、[迭代时修改集合](https://docs.python.org/3.12/tutorial/controlflow.html#for-statements)、[dataclass 默认工厂](https://docs.python.org/3.12/library/dataclasses.html#default-factory-functions)、[类型标注及 cast](https://docs.python.org/3.12/library/typing.html#typing.cast)、[内置异常](https://docs.python.org/3.12/library/exceptions.html#ValueError)、[异常处理](https://docs.python.org/3.12/tutorial/errors.html#handling-exceptions)、[异常链](https://docs.python.org/3.12/tutorial/errors.html#exception-chaining)、[assert](https://docs.python.org/3.12/reference/simple_stmts.html#the-assert-statement)、[Path.open](https://docs.python.org/3.12/library/pathlib.html#pathlib.Path.open)、[open 的编码参数](https://docs.python.org/3.12/library/functions.html#open)、[自定义上下文管理器的异常传播](https://docs.python.org/3.12/library/contextlib.html#contextlib.contextmanager)、[subprocess.run 的 timeout 参数与清理行为](https://docs.python.org/3.12/library/subprocess.html#subprocess.run)。

4. **typing 官方指南｜第 5 节。** [Typing Best Practices：Any 与 object、参数与返回类型、简写语法](https://typing.python.org/en/latest/reference/best_practices.html#ergonomic-practices)。适用版本和运行语义同时对照上一项 Python 文档。

5. **Python 3.12 官方文档｜第 8～9 节。** [Logging HOWTO：用途、变量数据、库的日志配置与优化](https://docs.python.org/3.12/howto/logging.html)、[SQLite 参数绑定](https://docs.python.org/3.12/library/sqlite3.html#how-to-use-placeholders-to-bind-values-in-sql-queries)、[连接上下文管理器](https://docs.python.org/3.12/library/sqlite3.html#how-to-use-the-connection-context-manager)、[subprocess 安全说明](https://docs.python.org/3.12/library/subprocess.html#security-considerations)、[pickle 警告](https://docs.python.org/3.12/library/pickle.html)、[JSON 解码与资源消耗警告](https://docs.python.org/3.12/library/json.html)、[secrets](https://docs.python.org/3.12/library/secrets.html)、[程序入口与退出状态](https://docs.python.org/3.12/library/__main__.html#idiomatic-usage)。

6. **PyPA｜第 9～10 节。** [src 与扁平布局](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/)、[pyproject.toml 的表、Python 版本与入口](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/)、[包依赖与 requirements 的职责差异](https://packaging.python.org/en/latest/discussions/install-requires-vs-requirements/)、[Dependency Groups 规范](https://packaging.python.org/en/latest/specifications/dependency-groups/)、[版本标识规范](https://packaging.python.org/en/latest/specifications/version-specifiers/#version-scheme)、[语义化版本与日历版本的选择](https://packaging.python.org/en/latest/discussions/versioning/#semantic-versioning-vs-calendar-versioning)、[调整 Python 支持版本：元数据、发布检查及兼容范围变化](https://packaging.python.org/en/latest/guides/dropping-older-python-versions/)。

7. **pip｜第 10 节。** [Repeatable Installs：固定版本、哈希校验与 wheelhouse 的平台条件](https://pip.pypa.io/en/stable/topics/repeatable-installs/)。

8. **pytest｜第 9、11 节。** [Good Integration Practices：安装、测试布局与导入](https://docs.pytest.org/en/stable/explanation/goodpractices.html)、[参数化](https://docs.pytest.org/en/stable/how-to/parametrize.html)、[tmp_path](https://docs.pytest.org/en/stable/how-to/tmp_path.html#the-tmp-path-fixture)、[Flaky tests：状态隔离与顺序依赖](https://docs.pytest.org/en/stable/explanation/flaky.html#system-state)、[monkeypatch：替换依赖、环境变量及自动恢复](https://docs.pytest.org/en/stable/how-to/monkeypatch.html)、[fixture 的安全清理](https://docs.pytest.org/en/stable/how-to/fixtures.html#safe-teardowns)。第 11.1 节关于受控输入、依赖替换和真实服务测试条件的要求，是结合这些机制整理的工程建议。

9. **Ruff｜第 2、11 节。** [配置与默认规则](https://docs.astral.sh/ruff/configuration/)、[格式化器及其与规则检查的关系](https://docs.astral.sh/ruff/formatter/)。这些描述对应工具能力，不代表 Python 对工具选择的要求。

10. **Google Engineering Practices｜第 1、4～6、11 节。** [评审应关注的设计、复杂度、测试和文档](https://google.github.io/eng-practices/review/reviewer/looking-for.html)、[复杂度与过度工程](https://google.github.io/eng-practices/review/reviewer/looking-for.html#complexity)、[评审标准与个人偏好的边界](https://google.github.io/eng-practices/review/reviewer/standard.html)。第 4.1、5.1、6.1 节标为“工程整理”的函数拆分、校验分工与异常处理尺度，是本文结合这些评审原则及 Python API 行为提出的建议，不是 Google 原文逐项列出的规则。工程检查的组合与交付建议另结合 PyPA 指南整理。

11. **Python 3.12 官方文档｜第 11 节。** [unittest.mock：替换查找位置](https://docs.python.org/3.12/library/unittest.mock.html#where-to-patch)、[timeit](https://docs.python.org/3.12/library/timeit.html)、[profile 与 cProfile 的用途及基准测试边界](https://docs.python.org/3.12/library/profile.html#introduction-to-the-profilers)。

12. **OWASP Cheat Sheet Series｜第 8.3 节。** [Secrets Management：集中管理](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html#22-centralize-and-standardize)、[访问控制](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html#23-access-control)、[容器中的凭据注入与环境变量边界](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html#51-injection-of-secrets-file-in-memory)、[泄露后的撤销、轮换与清理](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html#92-remediation)；[Logging：不宜直接记录的数据](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude)。本文选取其中的安全原则，用于说明 Python 项目的凭据与日志边界。

13. **Requests 官方文档｜第 6.3 节。** [Quickstart：缺省超时、超时异常与总耗时边界](https://requests.readthedocs.io/en/latest/user/quickstart/#timeouts)、[Advanced Usage：连接与读取超时](https://requests.readthedocs.io/en/latest/user/advanced/#timeouts)。本文只用其 API 说明超时语义，不要求为此增加依赖。
