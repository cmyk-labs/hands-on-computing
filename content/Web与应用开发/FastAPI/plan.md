# FastAPI 课程规划

学习目标：使用 FastAPI 编写、测试和运行 HTTP API，正确处理请求校验、并发执行、数据持久化、身份与权限，以及服务资源的创建和退出。

本目录 `content/Web与应用开发/FastAPI/` 收录 FastAPI 课程。本文件保存章节规划，环境与运行步骤见 [README.md](README.md)。

主线 **16 章**，选修 **7 章**，共 **23 章**，正文已全部提供，下表每行对应一份 Notebook。文件按“二位序号-章节名称.ipynb”命名，例如 `01-HTTP 接口与 FastAPI 运行.ipynb`。

## 前置知识与章节组织

前置知识：Python 函数、容器、模块、类、装饰器、类型标注、异常处理与 JSON。各章所需的具体概念和操作在规划表中单独列出。

每章独立讲解，读者具备所列前置知识即可开始。示例的代码、输入和运行条件齐全即可，不要求每章建立完整应用；先展示一个小操作，再逐步增加当前主题所需内容。

正文与可执行示例优先写在 Notebook 中；独立服务、多文件组织或浏览器资源确有需要时，再添加最小配套文件。教学约定见 [AGENTS.md](AGENTS.md)，辅助学习示意图按需放在本目录的 `image/illustration/` 下，实际成图与截图放在 `image/` 下。

## 主线章节

示例可使用“学习记录 API”这一熟悉的业务主题，各章围绕自己的学习目标提供独立实现。

| 章节 | 前置知识 | 计划内容 | 实验目标 |
| --- | --- | --- | --- |
| [01. HTTP 接口与 FastAPI 运行](01-HTTP%20接口与%20FastAPI%20运行.ipynb) | Python 函数、装饰器、类型标注、字典、JSON 与终端操作。 | 从一条路由和一次调用开始；介绍读懂该请求所需的 URL、方法、状态码、请求头与请求体；说明 FastAPI、Uvicorn 和 ASGI 的分工，使用交互文档与 OpenAPI。 | 先在 Notebook 调用小接口，再启动本地服务，通过客户端与浏览器调用同一接口，最后关闭服务。 |
| [02. 路由与请求参数](02-路由与请求参数.ipynb) | HTTP 请求、函数参数、基本类型标注与 FastAPI 路由。 | 路径、查询、Header、Cookie 参数；必填、默认值、Annotated、Path 与 Query 约束；路径匹配顺序与参数来源。 | 检查固定路径和动态路径、缺失参数与非法输入，说明每个参数来自哪里。 |
| [03. 请求体与数据校验](03-请求体与数据校验.ipynb) | Python 类、类型标注、JSON 与 HTTP 请求体。 | Pydantic v2 的 BaseModel、Field、嵌套模型、字段校验；缺失值与 None、类型转换与严格校验、额外字段策略；静态类型标注与运行时校验的区别。 | 对照合法、缺失、可转换与不可转换的 JSON 输入，核对模型结果和校验错误。 |
| [04. 响应与错误处理](04-响应与错误处理.ipynb) | HTTP 响应、类型标注、Pydantic 模型与异常处理。 | 围绕小型查询接口讲解返回类型、response_model、输入输出分离和字段过滤；model_dump 与 JSON、状态码与响应头；HTTPException、请求校验异常和异常处理器；程序错误、直接 Response 的边界；错误声明、示例与 OpenAPI 核对。 | 对照成功、记录不存在、非法输入与错误返回结构，确认内部字段不泄露，并核对实际响应与接口文档。 |
| [05. 依赖注入](05-依赖注入.ipynb) | 函数参数、请求校验、yield、上下文管理器与异常处理。 | 从复用一组参数开始讲 Depends、子依赖和请求内复用，再介绍路由与应用级依赖、yield 依赖的退出及异常传播。 | 用短示例检查调用次数与失败后的清理，辨别请求内复用和全局缓存。 |
| [06. 同步与异步请求处理](06-同步与异步请求处理.ipynb) | 线程与协程的基本区别、async/await、事件循环。 | def 与 async def 路由及依赖的执行位置；普通辅助函数的调用边界；同步 I/O、异步 I/O 与阻塞反例；说明线程池容量和 CPU 密集工作的使用边界，不展开通用并发原理。 | 用同一组有限等待任务观察其他请求能否推进；控制并发数量，不预设加速倍数。 |
| [07. 接口自动化测试](07-接口自动化测试.ipynb) | pytest、断言、测试隔离、HTTP 请求、依赖注入与协程。 | 从成功和失败响应断言开始，增加参数化、依赖替换与恢复；介绍 TestClient、HTTPX AsyncClient、ASGITransport 及异步测试的使用条件。 | 在 Notebook 逐个观察测试，再用小型测试文件运行 pytest；隔离数据，区分应用内调用和真实端口请求。 |
| [08. 应用组织与配置](08-应用组织与配置.ipynb) | Python 模块与包、路由、环境变量与接口测试。 | 先用两个路由说明 APIRouter、前缀和分组，再按需要拆文件；随后加入 pydantic-settings、环境变量校验和创建独立应用实例的函数。 | 分别观察路由组织和配置变化，确认导入模块不启动服务器；不预建完整分层工程。 |
| [09. 应用生命周期与资源管理](09-应用生命周期与资源管理.ipynb) | 异步上下文管理器、yield 依赖、异常处理与接口测试。 | 用一个共享资源说明 lifespan、应用状态、启动失败与关闭；辨别应用资源与请求依赖的范围，检查测试是否执行生命周期。 | 观察资源在应用启动时创建、关闭时释放，并检查一个启动失败路径。 |
| [10. 数据库与增删改查](10-数据库与增删改查.ipynb) | SQL 基本操作与事务、HTTP 方法、Pydantic 模型与依赖注入。 | 以一张 SQLite 表逐步介绍 SQLModel、Engine、Session、输入与输出模型；在增删改查中讲提交、回滚、关闭和会话并发边界；部分更新区分未提供字段与显式空值，加入简单分页、排序和不存在处理；简述建表与迁移的职责。 | 逐项验证小型记录接口、失败回滚与部分更新，重启服务后仍可读取已提交数据，最后关闭会话与服务。 |
| [11. 中间件与浏览器跨域](11-中间件与浏览器跨域.ipynb) | HTTP 请求与响应、日志、JavaScript 基础与浏览器操作。 | 请求和响应经过中间件的顺序；请求标识与访问日志；CORSMiddleware、源、预检请求与凭据配置；CORS 与身份权限检查的区别。 | 用两个本地端口对照允许与不允许的来源，检查浏览器行为、请求标识与日志。 |
| [12. 身份认证与令牌校验](12-身份认证与令牌校验.ipynb) | HTTP 请求头、JSON、异常处理、依赖注入与 Pydantic 响应模型。 | 先读取 Bearer 凭据与识别测试用户，再介绍密码哈希、JWT 签名、有效期、时间声明类型与必要声明校验；说明教学用令牌和身份提供方的职责边界。 | 使用本地测试用户和临时密钥，检查有效、过期、篡改、缺失及错误类型的令牌；失败返回 401，响应不暴露密码哈希。 |
| [13. 权限控制与资源归属](13-权限控制与资源归属.ipynb) | 身份认证、依赖注入、HTTP 状态码与数据库查询。 | 身份认证与授权的区别；角色与 Security 依赖；先用资源所有者判断限制访问，再简述 OAuth2 scopes 的用途；区分认证失败和权限不足。 | 用两个普通用户和一个管理员检查读取、修改与删除权限，拒绝跨用户访问。 |
| [14. 表单与文件处理](14-表单与文件处理.ipynb) | HTML 表单、HTTP 请求体、Python 文件读写与资源关闭。 | Form、multipart 请求、UploadFile、文件响应；表单与 JSON 请求体的编码差异；读取、关闭及应用设定的文件约束。 | 上传并读取小型文本文件，检查拒绝条件和资源关闭，浏览器提交结果与客户端测试一致。 |
| [15. 服务运行与多进程部署](15-服务运行与多进程部署.ipynb) | 进程、网络端口、环境变量与应用生命周期。 | 单 worker、进程内状态与资源；共享端口多 worker 的管理机制及当前环境边界；手动重启与开发重载的区别；日志、优雅关闭、并发限制及部署职责。 | 用两个独立端口的服务进程对照 PID、内存状态和生命周期，手动重启后核对源码变化，关闭后无遗留服务；共享端口多 worker 与自动重载单列环境限制。 |
| [16. API 综合交付实践](16-API%20综合交付实践.ipynb) | 路由、配置、数据库事务、身份认证、权限控制与接口测试。 | 在本章小型示例中逐步组合配置、路由、数据库、权限、错误处理和测试，整理接口契约、运行入口与已知限制。 | 先完成应用内的成功与失败请求，再用独立 Uvicorn 进程检查真实 HTTP、SQLite 落盘、重启后读取和正常退出；关闭进程与资源后删除临时数据。 |

## 选修章节

| 章节 | 前置知识 | 计划内容 | 实验目标 |
| --- | --- | --- | --- |
| [17. 外部 HTTP 服务调用](17-外部%20HTTP%20服务调用.ipynb) | HTTP 客户端、协程、异常处理、并发控制与资源生命周期。 | HTTPX 同步与异步客户端的选择、连接复用与关闭；连接、读取、写入和连接池超时；上游错误处理、并发上限与取消清理。 | 调用本地辅助服务，控制成功、失败和延迟响应，验证超时处理与客户端关闭。 |
| [18. 响应后的后台任务](18-响应后的后台任务.ipynb) | 函数、文件读写、异常处理、协程与依赖注入。 | BackgroundTasks 的注册、执行位置和失败处理；任务自己的资源范围；进程内后台任务与需要持久化、重试的任务队列之间的边界。 | 响应后完成一项有限文件工作，检查结果、失败与退出；与 await 等待的工作对照。 |
| [19. WebSocket 通信](19-WebSocket%20通信.ipynb) | 协程、应用生命周期、身份检查与 JavaScript 基础。 | 连接接受、消息收发、身份检查、断开处理；多连接管理与进程内连接列表的边界。 | 用浏览器完成有限消息往返，断开后清理连接。 |
| [20. 流式响应与 SSE](20-流式响应与%20SSE.ipynb) | HTTP 响应、异步生成器、任务取消与 JavaScript 基础。 | StreamingResponse、逐块输出、服务端发送事件（Server-Sent Events，SSE）；事件格式、浏览器消费、断开和生成器清理。 | 发送有限事件并验证提前断开；原生 SSE API 单列版本条件。 |
| [21. 异步数据库访问](21-异步数据库访问.ipynb) | SQL、SQLAlchemy 会话、事务、协程与异步上下文管理器。 | SQLAlchemy 2.x 的异步 Engine、AsyncSession 与驱动；并发任务中的会话归属、事务、隐式 I/O 与关闭。 | 提供本章独立的同步与异步 SQLite 接口，对照结果、回滚与资源释放。 |
| [22. OpenAPI 扩展与客户端生成](22-OpenAPI%20扩展与客户端生成.ipynb) | OpenAPI 基本结构、数据模型、接口测试与 Python 模块导入。 | 接口元数据、operationId、附加响应与模式扩展；按保存文档、生成、导入、调用、清理的顺序使用 openapi-python-client。 | 验证生成客户端对成功与错误响应的解析，关闭客户端并清理生成文件；再次生成前重启内核。 |
| [23. 模板与静态资源](23-模板与静态资源.ipynb) | HTML、URL、Python 字典与 FastAPI 路由。 | Jinja2Templates、模板上下文、StaticFiles 与 URL 生成；服务端页面渲染与 JSON API 的分工。 | 制作学习记录列表页，核对页面内容、静态资源和链接。 |

## 环境、实验成本与交付顺序

Python 沿用项目的 **3.12 基线和 hands-on-computing Conda 环境**，模型使用 Pydantic v2。课程依赖版本与运行步骤集中在 [README.md](README.md)和 [requirements.txt](requirements.txt)。

各章按学习目标介绍相应库，安装统一使用课程依赖清单。Starlette、AnyIO 的兼容范围随 FastAPI 核查，不为追逐最新版单独升级；不更换现有环境管理方式。

| 阶段 | 范围与成果 | 实验资源与成本 |
| --- | --- | --- |
| 接口基础 | 01–07：可调用、可校验、可测试的小接口 | 普通 CPU、本地端口、小型内存输入；首次安装需要网络，不需要 GPU、账号或付费 API。 |
| 持久化应用 | 08–10：组织、资源生命周期与数据库接口 | 本地 SQLite 和临时文件，不要求独立数据库服务。 |
| 应用边界 | 11–14：浏览器联调、身份、权限与上传 | 少量本地端口、小文件、测试用户与临时密钥。 |
| 运行与交付 | 15–16：服务进程管理和小型综合实践 | 多 worker 实验限制为少量进程，不要求容器运行时。 |
| 选修扩展 | 17–23：按应用需求选择 | 上游使用本地辅助服务，不实际发送邮件或调用收费服务；WebSocket、SSE 和模板使用本地浏览器，异步数据库使用 SQLite，客户端在本地生成与调用。 |

先确认第 01 章的小示例与运行方式，再按编号推进。并行编写时每人一次负责一章，完成并检查后领取下一个编号；不按并行分工拆分教学主题。

服务源码及必要资源按 [Notebook 编写协议](../../../docs/notebook-protocol.md)放入技术目录的 `scripts/章节/`，例如 `scripts/01-http-api-and-fastapi/`；代码遵循 [Python 编程规范](../../编程语言/python/Python编程规范.md)与 [FastAPI 编程规范](FastAPI编程规范.md)。Notebook 保留唯一教学正文，环境安装集中在技术目录 README.md。

测试同时覆盖应用内调用和必要的真实服务检查：接口测试验证业务结果，实际 Uvicorn 进程验证启动、端口、请求和退出；交互文档、CORS、WebSocket、SSE 与模板检查真实浏览器行为。数据库、客户端与服务器的清理随实验完成，不以测试客户端通过代替部署验证。

综合实践章提供规模有限、可独立运行的完整示例。需要持续维护的完整应用另在 `projects/` 按实际任务建立。

## 规划依据与版本边界

本次来源核查日期：**2026-09-15**。章节组合、示例主题与交付顺序属于本项目教学安排；以下资料用于核查主题和关键边界，编写正文时仍需按最终依赖版本逐点定位。

- **FastAPI 官方文档**：
  - 接口基础：[First Steps](https://fastapi.tiangolo.com/tutorial/first-steps/)、[Path Parameters](https://fastapi.tiangolo.com/tutorial/path-params/)、[Request Body](https://fastapi.tiangolo.com/tutorial/body/)、[Response Model](https://fastapi.tiangolo.com/tutorial/response-model/)、[Handling Errors](https://fastapi.tiangolo.com/tutorial/handling-errors/)。用于请求、响应、路由与接口文档的章节安排。
  - 执行与组织：[Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)、[yield 依赖与 scope](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/#early-exit-and-scope)、[同步与异步函数的调用边界](https://fastapi.tiangolo.com/async/#very-technical-details)、[Bigger Applications](https://fastapi.tiangolo.com/tutorial/bigger-applications/)、[Settings](https://fastapi.tiangolo.com/advanced/settings/)、[Lifespan](https://fastapi.tiangolo.com/advanced/events/)。yield 的退出时机按版本与作用域解释，生命周期以 lifespan 为主线。
  - 数据与测试：[SQL Databases](https://fastapi.tiangolo.com/tutorial/sql-databases/)、[Testing](https://fastapi.tiangolo.com/tutorial/testing/)、[Async Tests](https://fastapi.tiangolo.com/advanced/async-tests/)。数据库主线采用官方教程的 SQLModel 与 SQLite 组合；异步测试另核对 lifespan 是否执行。
  - 应用功能：[CORS](https://fastapi.tiangolo.com/tutorial/cors/)、[密码哈希与 JWT](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)、[OAuth2 scopes](https://fastapi.tiangolo.com/advanced/security/oauth2-scopes/)、[Request Files](https://fastapi.tiangolo.com/tutorial/request-files/)、[Background Tasks 的 Caveat](https://fastapi.tiangolo.com/tutorial/background-tasks/#caveat)。认证材料用于解释组件，登录协议选择同时遵循下列 RFC 9700。
  - 运行与选修：[Deployment Concepts](https://fastapi.tiangolo.com/deployment/concepts/)、[Server Workers](https://fastapi.tiangolo.com/deployment/server-workers/)、[WebSockets](https://fastapi.tiangolo.com/advanced/websockets/)、[SSE](https://fastapi.tiangolo.com/tutorial/server-sent-events/)、[Generating SDKs](https://fastapi.tiangolo.com/advanced/generate-clients/)、[Templates](https://fastapi.tiangolo.com/advanced/templates/)。官方原生 SSE 支持从 FastAPI 0.135.0 引入，选修示例需满足相应条件。
- **Pydantic 官方文档**：[Models](https://pydantic.dev/docs/validation/latest/concepts/models/)，定位 Basic model usage、Model methods and properties、Data conversion、Extra data 与 Nested models；用于模型、序列化和输入处理边界。
- **Starlette 官方文档**：[Thread Pool](https://starlette.dev/threadpool/)，定位同步调用及 Concurrency Limitations；线程容量与同步依赖等工作共享，不能按“每个接口一个无限线程池”设计实验。
- **SQLAlchemy 官方文档**：[Session 的并发边界](https://docs.sqlalchemy.org/en/20/orm/session_basics.html#is-the-session-thread-safe-is-asyncsession-safe-to-share-in-concurrent-tasks)、[AsyncSession 的并发任务使用](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html#using-asyncsession-with-concurrent-tasks)，用于同步与异步数据库资源归属。
- **HTTPX 官方文档**：[Async Support](https://www.python-httpx.org/async/)、[Timeouts](https://www.python-httpx.org/advanced/timeouts/)，定位客户端复用、关闭与四类超时。
- **Uvicorn 官方文档**：[Settings](https://uvicorn.dev/settings/)，定位 Configuration Methods、Development、Production、Resource Limits 与 Timeouts；开发重载与多 worker 的用途分开说明，当前环境的实验选择见 README.md。
- **RFC Editor**：[RFC 9110 第 9、15 节](https://www.rfc-editor.org/rfc/rfc9110.html#section-9)，用于 HTTP 方法与状态码；[RFC 9700 第 2.3、2.4 节](https://www.rfc-editor.org/rfc/rfc9700.html#section-2.4)，用于访问权限限制与 OAuth2 密码授权边界。RFC 9700 禁止使用资源所有者密码凭据授权，因此不将 FastAPI 教程中的该流程作为新应用的登录方案；本地令牌实验仅验证 API 的凭据处理，真实登录集成另按身份提供方协议安排。
