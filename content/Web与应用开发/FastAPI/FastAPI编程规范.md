# FastAPI 编程规范

第 1 版 · 来源核查日期：2026-09-15

本文面向 FastAPI HTTP API 和相关服务，整理接口声明、数据模型、依赖、资源管理、并发、安全与测试的常用规范，可独立于课程阅读。

前置知识：Python 类型标注、函数、异常、上下文管理器、HTTP 请求与响应；异步和数据库部分另需了解协程与事务。

本文为官方文档、正式标准与维护者指南的中文选编和工程整理，示例由本文编写。**框架与协议约束**说明实际行为；**官方建议**保留来源的推荐强度；标为**工程整理**的内容是本文结合这些依据提出的建议，不代表 FastAPI 官方规定了统一的项目结构或代码风格。

Python 的命名、导入、格式、异常与通用工程写法见 [Python 编程规范](../../编程语言/python/Python编程规范.md)。本文使用 Python 3.10 及以上语法、Pydantic v2 API，按[环境说明](README.md)及其依赖清单中的版本核查；升级时重新核对受影响的行为。引用定位集中在篇末。

## 1 应用组织与命名

### 1.1 按实际职责拆分

FastAPI 提供 `APIRouter` 组织一组路径操作，可在 `include_router()` 时统一设置前缀、标签和依赖。路径操作指处理某个 HTTP 方法与路径组合的函数，例如处理 `GET /items/{item_id}` 的函数。

**工程整理：** 小应用可以保留在一个模块中；路由数量或业务复杂度增加后，再按业务职责拆分。需要复用或独立测试的业务逻辑可提取为普通函数或模块。是否设置服务层、仓储层或应用工厂，取决于实际需要，不为每条路由机械增加这些结构。

入口模块负责组装应用。建议把需要随应用启动和关闭的资源放入 `lifespan`，使导入模块与启动资源的职责分开；应用工厂有助于创建配置或状态不同的实例，但不是每个项目都必须使用。

### 1.2 名称表达用途，路由顺序表达匹配意图

**工程整理：** 函数名可以使用 `read_item`、`create_item` 等能说明行为的名称；输入、更新和输出模型可用 `ItemCreate`、`ItemUpdate`、`ItemPublic` 区分。名称后缀、URL 的单复数、是否保留尾部斜杠属于接口与项目约定，选定后保持一致。

**框架约束：** 路由按声明顺序匹配。固定路径与动态路径重叠时，先声明固定路径，例如 `/users/me` 应位于 `/users/{user_id}` 之前。拆分路由后仍需检查合并到应用中的匹配顺序。

## 2 请求参数与接口声明

### 2.1 让参数来源和限制可见

用函数参数和模型声明请求数据，让 FastAPI 执行相应的解析、校验和接口文档生成。需要指定来源或约束时，使用 `Path`、`Query`、`Header`、`Cookie`、`Body` 等参数声明；不要为了读取普通参数而把所有解析转成手写字典操作。

**官方建议：** 优先用 `Annotated` 附加 FastAPI 参数信息。使用 `Annotated[..., Query(...)]` 时，默认值写在函数参数的等号右侧，不同时放进 `Query(default=...)`。已有默认参数形式仍有其适用范围，不必仅为改写语法批量修改。

下面是参数声明示例。`item_id` 是正整数编号，`limit` 是本次请求的条数上限；100 是示例的业务上限，不是 FastAPI 限制。该接口仅回显校验后的参数。

```python
from typing import Annotated

from fastapi import FastAPI, Path, Query


app = FastAPI()


@app.get("/items/{item_id}")
def read_item(
    item_id: Annotated[int, Path(gt=0)],
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
) -> dict[str, int]:
    return {"item_id": item_id, "limit": limit}
```

### 2.2 分开接口语义和命名习惯

HTTP 方法和状态码按协议含义使用。例如，`GET` 的语义是读取，不应把删除记录等客户端要求的业务修改设计成 `GET` 操作；服务器记录访问日志不属于这种业务修改。

**工程整理：** 参数名称、字段含义、单位、默认值和边界应能从声明及简短说明中看出。分页等限制按真实资源成本设置，不把示例数值直接变成所有接口的统一标准。

## 3 数据模型与校验

### 3.1 区分必填、可空和默认值

**框架约束：** Pydantic v2 中，允许 `None` 不等于允许省略字段。

| 模型字段声明 | 是否必须提供 | 是否接受 `None` |
| --- | --- | --- |
| `name: str` | 是 | 否 |
| `name: str \| None` | 是 | 是 |
| `name: str \| None = None` | 否，省略时使用默认值 | 是 |

将长度、范围等约束放在 `Field` 或请求参数声明中。需要自定义校验时再使用校验器；不要仅因数据通过类型校验，就省略数据库约束或访问权限检查。

### 3.2 明确转换和额外字段策略

Pydantic 默认会进行部分类型转换，额外字段默认忽略。按接口契约选择 `extra="ignore"`、`extra="forbid"` 或 `extra="allow"`；拒绝额外字段适用于不接受未知输入的接口，但不是所有模型的强制规则。

需要限制类型转换时，可针对字段、模型或单次校验使用严格模式。严格模式仍有类型和输入方式上的条件，例如直接校验 JSON 时部分日期类型接受字符串，不能概括为“完全禁止转换”。

### 3.3 部分更新保留“未提供”的含义

使用 `model_dump(exclude_unset=True)` 提取调用者实际提供的字段。不要用 `exclude_none=True` 代替它，否则允许清空的字段会丢失显式 `None`。

下面只演示更新数据的提取。`description` 是允许清空的说明字段；其他业务若禁止清空，需要另行声明或检查。

```python
from pydantic import BaseModel


class ItemUpdate(BaseModel):
    description: str | None = None


omitted = ItemUpdate()
cleared = ItemUpdate(description=None)

assert omitted.model_dump(exclude_unset=True) == {}
assert cleared.model_dump(exclude_unset=True) == {"description": None}
```

## 4 响应模型与错误处理

### 4.1 输出只包含对外字段

使用返回类型或 `response_model` 声明普通响应的数据结构。FastAPI 据此校验、序列化并过滤输出；同时声明两者时，以 `response_model` 为框架处理依据，Python 类型标注仍应如实表达函数返回值。

**工程整理：** 当输入、持久化数据和公开输出的字段不同，分别定义模型。包含密码哈希、令牌或内部管理字段的对象，不应直接充当公开输出模型。返回结构相同时可以复用模型，不按固定数量创建空壳类型。

直接返回 `Response`、`JSONResponse` 等响应对象时，FastAPI 不再自动对其中的数据执行上述模型校验和转换。使用这种方式时自行保证内容、媒体类型、状态码与文档正确，不能继续依赖 `response_model` 过滤敏感字段。

### 4.2 错误状态与响应内容保持一致

遇到需要结束请求的预期 HTTP 错误，使用 `raise HTTPException(...)`。异常处理器可以统一错误格式；请求输入无效和服务端返回结构错误应分开处理，后者属于应用错误。

**工程整理：** 不把所有异常统一改成 200 响应，也不把未识别的程序错误一律改成“参数错误”。向客户端提供可处理的错误信息，内部诊断信息留在受控日志中。需要统一响应包装时，根据调用方契约设计；文件、流式响应等不必套入 JSON 外壳。

通过 `responses` 声明额外错误响应，只是在描述 OpenAPI，不会自动生成相应错误处理逻辑。修改实际错误结构时，同步检查文档声明和客户端解析。

## 5 依赖注入与请求资源

### 5.1 明确依赖的用途与复用范围

`Depends` 适合声明路由需要的共享输入或资源。相同依赖默认在一次请求内复用结果；这是请求内缓存，不是跨请求的单例。仅在确实需要重新调用时设置 `use_cache=False`。

**工程整理：** 依赖名称说明提供什么或检查什么，例如 `get_current_user`、`get_session`。只需要执行检查、不使用返回值时，可把依赖挂到路径操作或路由组上。普通业务计算仍可以直接调用函数，不必全部改成依赖。

### 5.2 按使用范围选择退出时机

用带 `yield` 的依赖和上下文管理器组织请求资源的创建与释放。捕获异常后，如果没有完成有效处理，应重新抛出原异常或明确的新异常，避免吞掉错误。

**版本条件：** `Depends(scope="function")` 从 FastAPI 0.121.0 开始支持。按当前 API：

| 作用域 | 退出时机 | 使用条件 |
| --- | --- | --- |
| `request` | 响应发送完成后；带 `yield` 依赖的默认作用域 | 响应阶段仍需要该资源，例如流式生成器读取资源 |
| `function` | 路径操作结束后、响应发送前 | 路径操作返回后不再需要该资源 |

`request` 作用域依赖的子依赖也需要是 `request`；`function` 作用域依赖可以使用这两种作用域的子依赖。

**工程整理：** 如果成功响应承诺某项写入已完成，应在发送成功响应前确认提交。默认 `request` 作用域的退出代码运行得更晚，不适合在那里才执行决定请求成败的提交操作。

## 6 应用生命周期、配置与外部客户端

### 6.1 使用 lifespan 配对管理应用资源

**官方建议：** 新代码通过 `FastAPI(lifespan=...)` 管理启动和关闭。提供 `lifespan` 后，旧式 `startup`、`shutdown` 事件处理器不会同时执行；维护旧代码时要按整体生命周期迁移。

适合在应用范围复用的资源包括数据库引擎和 HTTP 客户端。可以通过 `app.state` 保存应用状态，并从 `request.app` 访问；这不改变资源本身的线程、任务或进程使用限制。

下面只展示一个 HTTPX 异步客户端的生命周期，不发送外部请求。`timeout=5.0` 的单位为秒，用于 HTTPX 各类操作等待上限，并非整个业务流程最多五秒。

```python
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    async with httpx.AsyncClient(timeout=5.0) as client:
        app.state.http_client = client
        yield


app = FastAPI(lifespan=lifespan)
```

**工程整理：** 资源初始化完成后再进入提供服务的阶段；初始化中途失败时，已经创建的资源也应关闭。多个资源按各自上下文管理器组织，避免只覆盖正常退出路径。

### 6.2 配置和连接复用有明确归属

需要从环境变量读取并校验配置时，可使用 `pydantic-settings` 的 `BaseSettings`。配置较少时不必为此搭建复杂配置层；敏感值的存储与日志处理遵循 Python 通用规范。

HTTPX 客户端应在明确的使用范围内复用并关闭。高频循环中反复创建客户端会失去连接池复用的收益；同步代码使用 `Client`，异步代码使用 `AsyncClient`。

为外部请求保留合理的超时。HTTPX 区分连接、读取、写入、连接池等待超时；其中读取超时约束等待一块数据的时间，不是完整响应的总时长。需要整个操作的截止时间时，再使用外围任务超时机制。

## 7 同步、异步与数据库访问

### 7.1 按调用的库选择执行方式

**框架约束：** FastAPI 调用普通 `def` 路径操作和依赖时，会在线程池运行；调用 `async def` 路径操作时，不会自动把其中的阻塞操作移入线程池。代码直接调用的普通辅助函数也不会被自动转移。

使用支持 `await` 的 I/O 库时，采用 `async def` 并等待对应调用；使用同步阻塞库时，安排在适当的同步执行位置。仅把函数声明改为 `async def`，不会使内部同步 I/O 或 CPU 计算变成非阻塞工作。

Starlette 的默认线程容量与同步依赖等工作共享。增加容量有内存和调度成本；并发数量、进程数量以及是否引入任务队列，应依据工作性质和实际测量决定。

### 7.2 会话、事务与资源关闭分别处理

**SQLAlchemy 约束：** `Session` 是可变、有状态的事务对象，不能让多个线程或并发任务同时使用同一个实例。其并发模型是每个线程使用自己的 `Session`、每个异步任务使用自己的 `AsyncSession`。按请求提供会话时，也不能再把该会话分给多个并发任务共用。

把数据库写入组合到明确的事务中，说明由哪一层提交或回滚。`close()` 不代表提交；可以通过事务上下文管理器管理成功提交、异常回滚，并用会话上下文管理器保证关闭。刷新失败后，如果还要继续使用同一个会话，需要先 `rollback()`；也可以关闭并弃用该会话。

使用 `AsyncSession` 时，避免响应序列化意外触发延迟加载等隐式 I/O。按需要提前加载或显式等待加载。`expire_on_commit=False` 可避免提交后已加载属性过期，但不会把未加载的关联数据自动加载出来。

## 8 身份认证、权限与敏感数据

### 8.1 每次受保护的操作都检查权限

身份认证确认调用者身份，授权判断其能否执行当前操作。按 OWASP 指南，对受保护的请求默认拒绝，逐次检查相应权限。涉及资源归属时，校验当前用户与目标资源的关系，不能仅凭“已登录”允许访问任意编号。

HTTP 认证中，缺少有效凭据通常返回 401，并包含适用的 `WWW-Authenticate` 挑战；凭据有效但权限不足通常返回 403。应用可按协议允许的方式隐藏资源存在性，但应保持处理策略一致。

### 8.2 令牌校验遵循发行方契约

使用维护中的库验证令牌。以 PyJWT 为例，允许的算法由服务端可信配置决定，不从未验证令牌的 `alg` 值推导。按令牌用途核对签名、必要声明、有效期、发行方和受众；`require` 只要求声明存在，不能代替声明值的校验。

OAuth2 资源所有者密码凭据授权已被 RFC 9700 §2.4 明确禁止使用。选用登录方案时遵循当前协议和身份提供方要求，不直接把用于讲解组件的密码授权示例当成新系统的登录设计。

密码、访问令牌、会话标识及密钥不应直接写入日志；确需关联会话事件时，按日志安全策略脱敏或使用替代标识。记录一次请求不意味着记录完整请求头和请求体。

## 9 中间件、CORS 与模板

### 9.1 检查中间件顺序和跨域配置

通过 `add_middleware()` 或装饰器添加的中间件按包裹关系执行：后添加的位于外层，请求先经过它，响应最后经过它。涉及日志、错误处理和响应头时，检查实际生效顺序。

CORS 的源由协议、主机和端口共同决定。需要携带凭据时，按官方配置说明显式列出允许的源、方法和请求头；浏览器还需要读取自定义响应头时，配置 `expose_headers`。

**工程整理：** CORS 负责浏览器跨源访问的协商，不能代替身份与权限检查。简单跨域请求可能已经进入应用，浏览器再限制脚本读取响应；不能将“浏览器报跨域错误”解释为“服务端一定没有执行请求”。

### 9.2 按输出位置处理模板数据

使用目录参数创建 `Jinja2Templates` 时，Starlette 默认对 `.html`、`.htm`、`.xml` 模板启用自动转义。自建 Jinja 环境时需要核对相应配置。

HTML 文本位置的转义不等于 JavaScript、URL 或事件属性中的安全处理。按 OWASP 的上下文规则处理输出，不用 `safe` 等方式把未经处理的外部文本标为可信 HTML。

## 10 上传、后台任务与长连接

### 10.1 限定上传内容和读取范围

文件与普通字段一起上传时，使用 `File`、`UploadFile` 和 `Form` 接收 `multipart/form-data`。同一请求体不能同时按这种编码和独立的 `application/json` 请求体解析。

`UploadFile` 使用可转存磁盘的临时文件，但不代表无限容量。按业务限制读取与处理大小；路由中的有限读取只能限制该段代码读入的数据量，不等于限制整个上传请求已经接收的大小。应用接管文件后的使用路径应保证关闭。

按 OWASP 上传指南核对允许的文件类型、内容、大小和存储位置。原始文件名、扩展名和客户端提交的媒体类型都不能单独作为安全证明；保存文件时使用应用控制的名称和路径。

### 10.2 后台任务有独立资源和失败语义

`BackgroundTasks` 在响应发送后于进程内执行；同一组任务按顺序执行，一个任务抛出异常会阻止后续任务执行。它不提供任务持久化或跨进程执行保证。

**官方建议：** 后台任务创建和关闭自己的数据库会话等资源，传入记录编号等必要数据，再在任务内读取，避免依赖请求资源的生命周期。需要较重的独立计算时，可评估专门的任务处理工具。

**工程整理：** 需要可靠重试、恢复或跨进程调度时，按业务要求选择具有相应能力的任务系统，并验证其保证。响应已经发送后，后台失败无法把该响应改成另一种结果；若接口承诺任务已完成，应在响应前完成工作。

### 10.3 处理结束、取消和连接移除

流式响应的异步生成器应有可等待的执行点，使取消能够被处理；用 `finally` 等清理资源，避免吞掉取消后继续运行。使用 FastAPI 原生 SSE API 时，最低版本为 0.135.0，旧版本不能直接套用该 API。

WebSocket 处理断开时应移除连接并释放相关资源。保存在内存列表中的连接管理器只属于当前进程，不能直接承担多进程广播。

**工程整理：** 对正常结束、客户端提前断开和服务退出分别验证清理结果；真实网络的行为不能只凭一次应用内请求测试推断。

## 11 测试与 OpenAPI 契约

### 11.1 断言可观察的行为

**工程整理：** 测试至少覆盖当前改动相关的成功结果和失败边界。除了状态码，还应按需断言响应字段、敏感字段缺席、数据库变化或未变化，以及资源关闭。输入选取能揭示错误的边界，不把实现代码重复一遍作为测试。

下面接第 2 节的 `app`，检查参数默认值、边界与拒绝路径。它是应用内请求，不启动网络服务器。

```python
from fastapi.testclient import TestClient


with TestClient(app) as client:
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"item_id": 1, "limit": 20}
    assert client.get("/items/1", params={"limit": 100}).status_code == 200
    assert client.get("/items/1", params={"limit": 101}).status_code == 422
    assert client.get("/items/0").status_code == 422
```

### 11.2 测试也要管理生命周期和状态

需要运行应用启动、关闭逻辑时，用 `with TestClient(app)`；仅创建 `TestClient(app)` 不会触发 `lifespan`。使用 HTTPX `ASGITransport` 时，显式管理应用生命周期，例如配合 `LifespanManager`。

`app.dependency_overrides` 的键是原依赖，值是测试替代依赖。替换范围限定在需要的测试中，并在结束或失败后恢复；存在先前替换时，恢复原有状态，不误删其他测试设置。

**工程整理：** 数据库、文件、环境变量和内存状态按测试隔离；网络测试使用就绪条件和有限等待。CORS、上传页面和长连接等功能，还应验证目标浏览器与实际服务路径。

### 11.3 文档描述与实际响应一起维护

检查 OpenAPI 中的输入来源、必填条件、响应状态和模型是否符合实际接口。需要自定义 `operation_id` 时，保证每个操作的标识唯一；不需要控制生成名称时可保留框架默认值。

**工程整理：** 接口由生成客户端消费时，把字段、响应结构和操作标识的变更作为契约变更评估。生成成功只说明工具完成了处理，还需调用代表性的成功与错误路径，验证客户端能正确解析。

## 12 运行与维护

Uvicorn 的 `--reload` 用于开发重载，与 `--workers` 互斥。worker 是服务工作进程；多个进程通常不共享内存，应用内缓存、连接列表和资源使用量要按每个进程考虑。

**工程整理：** 部署时明确 HTTPS、进程重启、启动前工作和资源容量分别由哪个组件负责。更新依赖、并发配置或资源生命周期后，运行受影响的检查；不要只凭安装成功或进程启动就认定接口行为正确。

检查规模服从实际改动。保留已经清楚、正确的简单实现，只有在可读性、正确性或维护收益明确时再调整结构。

## 参考与引用来源

以下定位支持正文的框架行为与建议。工程组织、示例名称、边界值和检查组合由本文整理；没有把某个官方示例的文件布局或数值提升为通用强制要求。

1. **FastAPI 官方文档｜第 1～5、11 节。**

   - 应用与路由：[Bigger Applications](https://fastapi.tiangolo.com/tutorial/bigger-applications/) 的 APIRouter 与 Include an APIRouter with a custom prefix, tags, responses, and dependencies；[Path Parameters](https://fastapi.tiangolo.com/tutorial/path-params/#order-matters) 的 Order matters。
   - 输入与更新：[参数校验](https://fastapi.tiangolo.com/tutorial/query-params-str-validations/#advantages-of-annotated)的 Advantages of Annotated、Query as the default value or in Annotated；[数值约束](https://fastapi.tiangolo.com/tutorial/path-params-numeric-validations/)的 Number validations；[请求体](https://fastapi.tiangolo.com/tutorial/body/)的 Declare it as a parameter、Results；[Body Updates](https://fastapi.tiangolo.com/tutorial/body-updates/#using-pydantics-exclude-unset-parameter) 的 exclude_unset。
   - 响应与错误：[Response Model](https://fastapi.tiangolo.com/tutorial/response-model/) 的过滤行为、response_model Priority；[直接返回响应](https://fastapi.tiangolo.com/advanced/response-directly/#notes)的 Notes；[Handling Errors](https://fastapi.tiangolo.com/tutorial/handling-errors/) 的 HTTPException、RequestValidationError；[Additional Responses](https://fastapi.tiangolo.com/advanced/additional-responses/#additional-response-with-model) 的 Additional Response with model。
   - 依赖：[Sub-dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/sub-dependencies/#using-the-same-dependency-multiple-times) 的请求内缓存；[路径操作依赖](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-in-path-operation-decorators/)的 Add dependencies to the path operation decorator；[yield 依赖](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/)的异常传播、Early exit and scope 与 scope for sub-dependencies。

2. **FastAPI 官方文档｜第 6～12 节。**

   - 生命周期与执行方式：[Lifespan](https://fastapi.tiangolo.com/advanced/events/#lifespan) 及 Alternative Events；[Settings](https://fastapi.tiangolo.com/advanced/settings/) 的 Create the Settings object、Settings in a dependency；[同步与异步](https://fastapi.tiangolo.com/async/#very-technical-details)的 Path operation functions、Dependencies 与 Other utility functions。
   - 中间件与上传：[Middleware](https://fastapi.tiangolo.com/tutorial/middleware/#multiple-middleware-execution-order) 的执行顺序；[CORS](https://fastapi.tiangolo.com/tutorial/cors/) 的 Origin、Use CORSMiddleware 与 Simple requests；[表单和文件](https://fastapi.tiangolo.com/tutorial/request-forms-and-files/)的编码条件；[Request Files](https://fastapi.tiangolo.com/tutorial/request-files/#uploadfile) 的 UploadFile。
   - 后台与长连接：[Background Tasks](https://fastapi.tiangolo.com/tutorial/background-tasks/#caveat) 的 Caveat；[Advanced Dependencies](https://fastapi.tiangolo.com/advanced/advanced-dependencies/) 的 Dependencies with yield and scope、Background Tasks and Dependencies with yield, Technical Details；[StreamingResponse](https://fastapi.tiangolo.com/advanced/custom-response/#streamingresponse) 的 await 与取消说明；[SSE](https://fastapi.tiangolo.com/tutorial/server-sent-events/) 的版本说明；[WebSockets](https://fastapi.tiangolo.com/advanced/websockets/#handling-disconnections-and-multiple-clients) 的断开处理与单进程条件。
   - 测试与运行：[Testing](https://fastapi.tiangolo.com/tutorial/testing/#using-testclient)、[依赖替换](https://fastapi.tiangolo.com/advanced/testing-dependencies/#use-the-app-dependency-overrides-attribute)与结束恢复；[operationId](https://fastapi.tiangolo.com/advanced/path-operation-advanced-configuration/#openapi-operationid) 的唯一性；[部署概念](https://fastapi.tiangolo.com/deployment/concepts/)的 Security - HTTPS、Restarts、Memory per Process、Previous Steps Before Starting。

3. **Pydantic 官方文档｜第 3 节。** [Fields](https://pydantic.dev/docs/validation/latest/concepts/fields/#default-values) 的 Default values 与 Field constraints；[Models](https://pydantic.dev/docs/validation/latest/concepts/models/#extra-data) 的 Data conversion 与 Extra data；[Strict Mode](https://pydantic.dev/docs/validation/latest/concepts/strict_mode/) 的 JSON 条件、At the field level 与 As a configuration value；[Serialization](https://pydantic.dev/docs/validation/latest/concepts/serialization/#excluding-and-including-fields-based-on-their-value) 的 exclude_none 与 exclude_unset；[Validators](https://pydantic.dev/docs/validation/latest/concepts/validators/#field-validators) 的 Field validators。

4. **Starlette 官方文档｜第 6、7、9～11 节。** [Applications](https://starlette.dev/applications/#storing-state-on-the-app-instance) 的 Storing state 与 Accessing the app instance；[Thread Pool](https://starlette.dev/threadpool/#concurrency-limitations) 的共享容量与成本；[Templates](https://starlette.dev/templates/#autoescape) 的 Autoescape；[Background](https://starlette.dev/background/) 的响应后执行、顺序与失败停止；[TestClient](https://starlette.dev/testclient/#starlette.testclient.TestClient) 的上下文管理器、应用异常与生命周期条件。

5. **SQLAlchemy 2.0 官方文档｜第 5、7 节。** [Session Basics](https://docs.sqlalchemy.org/en/20/orm/session_basics.html) 的 Framing out a begin / commit / rollback block、Flushing、Closing、Is the Session thread-safe? Is AsyncSession safe to share in concurrent tasks?；[Asyncio](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html#preventing-implicit-io-when-using-asyncsession) 的 Preventing Implicit IO 与 expire_on_commit。第 5.2 节关于成功响应前确认提交的建议，结合 FastAPI 的响应发送时机整理。

6. **HTTPX 官方文档｜第 6、11 节。** [Async Support](https://www.python-httpx.org/async/#opening-and-closing-clients) 的 Opening and closing clients、Streaming responses；[Timeouts](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) 的四类等待；[Transports](https://www.python-httpx.org/advanced/transports/#asgi-startup-and-shutdown) 的 ASGI startup and shutdown。

7. **PyJWT 官方文档｜第 8 节。** [API Reference](https://pyjwt.readthedocs.io/en/stable/api.html#jwt.decode) 的 jwt.decode、算法 Warning 与 jwt.types.Options.require，支持算法可信配置及声明存在性与值校验的区别。

8. **RFC Editor｜第 2、8 节。** [RFC 9110 §9.2.1](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.1) 的 Safe Methods；同文 [§11.3～11.6.1](https://www.rfc-editor.org/rfc/rfc9110.html#section-11.3)、[§15.5.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.2)、[§15.5.4](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.4) 的认证挑战、401、403 与隐藏资源；[RFC 9700 §2.3～2.4](https://www.rfc-editor.org/rfc/rfc9700.html#section-2.3) 的权限限制与禁止资源所有者密码凭据授权。

9. **OWASP Cheat Sheet Series｜第 8～10 节。** [Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) 的 Deny by Default、Validate the Permissions on Every Request 与资源访问检查；[Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude) 的 Data to exclude；[File Upload](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) 的 Content-Type Validation、Filename Safety、File Content Validation、File Storage Location、Upload and Download Limits；[XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) 的 Framework Security、Output Encoding 与 Dangerous Contexts。这些是该组织的安全实践建议，应用范围按正文条件选取。

10. **Uvicorn 官方文档｜第 12 节。** [Settings](https://uvicorn.dev/settings/) 的 Development 与 Production，支持开发重载、多 worker 及参数互斥条件。

11. **Python 3.12 官方文档｜第 6、10 节。** [contextlib](https://docs.python.org/3.12/library/contextlib.html#contextlib.asynccontextmanager) 的 asynccontextmanager、AsyncExitStack；[任务取消与超时](https://docs.python.org/3.12/library/asyncio-task.html#task-cancellation)的 Task Cancellation、Timeouts；[finally](https://docs.python.org/3.12/reference/compound_stmts.html#finally-clause) 的清理语义。

12. **Google Engineering Practices｜第 1、11、12 节。** [What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) 的 Design、Complexity、Tests、Naming。本文据此整理按实际职责组织代码、避免过度设计及选择有效测试的建议，没有规定统一分层和行数门槛。

署名：CMYK Labs（cmyk-labs）。本文原创讲解与示例采用 [CC BY-NC-SA 4.0](../../../LICENSE)，第三方来源保留各自许可。
