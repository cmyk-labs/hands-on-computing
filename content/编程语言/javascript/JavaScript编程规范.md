# JavaScript 编程规范

第 2 版 · 来源核查日期：2026-09-13

面向浏览器脚本、Node.js 应用和可复用包，覆盖日常编码、接口、异步、输入与安全边界、测试和交付。前置知识是变量、函数、对象、模块和 Promise。框架、分布式系统与特定数据库的操作另按对应平台文档处理。

本文是第一方资料的中文选编和工程整理，不是 ECMAScript 全文译本。**语言／平台约束**描述实际行为；**风格选择**由项目一致采用；**工程建议**按业务规模决定。示例代码是本文编写，来源按章节集中在篇末。规范编号用于示例项目的逐项对照。

## 1 运行环境与规则强度

### JS-01 明确语言与宿主的边界

ECMAScript 定义语言；DOM、Fetch、文件系统等由浏览器、WHATWG 或 Node.js 定义。使用一个 API 前，同时核对语法支持和目标宿主支持。开发机能够运行，不能单独证明所有支持版本都可运行。

项目应声明支持的 Node.js 或浏览器范围，记录实际测试版本。采用新语法、模块加载方式和全局 API 时，核对最低版本；编译目标和运行时 API 的兼容性分别处理。

### JS-02 把团队约定写成团队约定

Google JavaScript Style Guide 是团队指南，官网已注明停止更新，其 Closure 专属约定不自动适用于普通 ESM 项目。本文选用其中常用命名、局部变量及格式建议作为既有风格参考；语言与平台行为以现行 ECMAScript、Node.js 和 WHATWG 文档及目标版本为准。工程部分结合 Node.js、npm 和 Google 评审指南整理。

优先保持项目已有风格。调整规范时渐进处理当前修改范围，不为缩进、函数长度或个人偏好批量改动无关文件。

## 2 布局与命名

### JS-03 统一格式并交给工具执行

可采用 2 空格缩进、单引号、分号和多行尾随逗号；这些是项目风格，不是语言唯一合法写法。使用花括号包围控制流语句体，一行表达一个主要操作；复杂嵌套三元表达式改为清楚的分支。

行宽由项目与格式化器约定。Prettier 的 `printWidth` 是排版目标，不是每行绝不能超过的长度。格式化与静态规则检查分别执行，不安排相互冲突的格式规则。

### JS-04 用名称表达业务含义

变量和函数通常用 `lowerCamelCase`，类用 `UpperCamelCase`；真正作为共享常量的值可用 `UPPER_SNAKE_CASE`。布尔量用能说明条件的名称，例如 `isDone`。不要用含糊缩写或复用同一变量表达不同概念。

模块名按项目约定一致；本文示例采用 `kebab-case.js`。这是项目选择。注释解释约束、原因和单位，公开接口说明输入、输出、错误和是否修改调用方对象。

## 3 变量、值与转换

### JS-05 限制作用域并理解 const

新代码优先 `const`，确实需要重新赋值时使用 `let`，通常避免 `var`。变量靠近首次使用处声明，每次声明一个变量。不要创建隐式全局变量。

`const` 限制绑定重新赋值，不冻结对象。对象展开、数组展开以及 `Object.freeze()` 都不能自动提供深层不可变性；是否复制嵌套成员，要由接口对共享状态的承诺决定。

### JS-06 明确缺省、空值与数值有效性

普通比较优先 `===`、`!==`。缺省参数在参数为 `undefined` 时生效；`??` 只为 `null` 或 `undefined` 选择替代值。需要保留 `0`、空字符串或 `false` 时，不用 `||` 随意替代它们。

数值转换必须符合输入协议。不要把 `parseInt()` 当作完整字符串合法性校验；数值边界按需要检查有限性、整数性和范围。JSON 不负责验证业务约束；JavaScript 的安全整数范围也不等于任意精度整数。

```javascript
export function chooseLimit(options = {}) {
  // 0 表示不显示条目，是这个接口允许的有效值。
  return options.limit ?? 20;
}
```

## 4 函数与数据组织

### JS-07 按职责决定函数边界

**工程整理：** 连续且紧密相关的步骤可留在一个函数里。短函数只要表达独立职责、集中共同规则或隔离 I/O，就有价值；仅转发参数又增加阅读跳转的包装可考虑合并。不设统一函数数量、最小行数或分支数量门槛。

少量业务选择直接使用 `if/else` 或 `switch`；只有扩展和阅读确有收益时才引入分发表、策略对象或类。可复用业务函数返回结果或抛出异常，退出进程与用户输出交给入口。

### JS-08 让参数与副作用可见

多个可选参数缺少自然顺序时可使用选项对象。默认参数避免隐藏 I/O 等副作用。箭头函数适合回调和需要词法 `this` 的场景；依赖动态接收者的方法按相应调用语义设计。

数据变换优先返回新结果；需要原地修改时在接口文档中说明。`sort()` 会修改数组，可先复制再排序。只需要数据的结构不必机械包装成类；需要状态不变量与行为时再考虑封装。

## 5 集合与输入边界

### JS-09 选择符合数据关系的集合

有序列表使用数组；按唯一键查询可用 `Map`；去重可用 `Set`。普通对象适合固定字段记录，不把它无条件当成任意外部键的字典。不要修改内置对象原型。

用 `map` 表达变换、`filter` 表达筛选；步骤需要中断、异步等待或携带多种状态时，清楚的循环往往更合适。排序要提供符合业务的比较函数，不依赖默认字符串排序处理数值。

### JS-10 在外部入口建立有效数据

文件、网络、命令行和存储恢复的数据，按协议校验结构、必要字段、类型、长度、范围与集合数量。数组使用 `Array.isArray()` 判断；对象检查区分 `null` 和数组。未知字段是拒绝还是忽略，应明确约定。

**工程整理：** 解析层确认外部结构，领域层集中共同规则。不要对同一流程中未经修改且已验证的值重复校验；数据可变、再次进入外部边界或约束变化时仍可重新检查。校验错误应指出字段或原因，但不回显敏感值。

## 6 模块与公开接口

### JS-11 明确模块格式与执行入口

Node.js 项目通过 `package.json` 的 `type` 或文件扩展名明确 ESM／CommonJS。相对 ESM 导入按 Node.js 解析规则提供扩展名。浏览器模块按 URL 加载，不自动拥有 Node.js 的包解析能力。

业务模块导入时不解析命令行、不启动服务器、不访问文件。独立 CLI 文件负责启动；供调用者使用的模块显式导出 API。模块拆分以职责为单位，避免每个小函数独占文件。

### JS-12 管理包边界与资源

发布包时用 `exports` 声明支持的入口，用 `files` 控制包内容；内部路径不是默认承诺给消费者的 API。资源相对模块定位可使用 `new URL(..., import.meta.url)`，避免依赖消费者当前目录。

新增或删除公开名称、参数、返回结构和错误行为时评估兼容性。包的版本、运行条件、资源与入口均须在真实安装产物中检查，而不只测试源码目录内的相对导入。

## 7 异步与取消

### JS-13 管理每个 Promise 的结果

异步操作应由调用者 `await`、返回给上层，或明确安排完成与失败处理。不要把未处理 Promise 当成已经完成的工作；`forEach(async ...)` 不会等待整个回调序列。

有顺序依赖时使用顺序等待；独立且数量受控的操作可以并行。需要全部成功可用 `Promise.all()`；确实需要保留每项成败时可用 `Promise.allSettled()`。一次失败不会自动取消其他已启动操作，取消须另外设计。

### JS-14 为外部等待安排取消与超时

Fetch 获得 HTTP 错误状态时仍可能成功返回 `Response`，业务层须检查 `response.ok` 或具体状态。JSON 解码失败、HTTP 失败、网络失败和取消应按各自原因处理。

在支持的宿主中，可用 `AbortSignal.timeout()` 提供超时信号，用 `AbortSignal.any()` 合并调用者取消。参数单位是毫秒。超时机制不能抢占阻塞的同步计算，也不意味着远端业务已撤销。不要用仅结束等待的 `Promise.race()` 假装取消了底层操作；需要重试时先确认重复操作的业务后果。

## 8 错误与资源

### JS-15 在有处理价值的层捕获

通常抛出 `Error` 或有业务意义的子类。转换错误时用 `cause` 保留原因；只捕获可以恢复、转换接口错误、清理或报告的问题。不要捕获所有失败后返回空集合，导致坏数据被解释成正常空结果。

**工程整理：** 不按 `try/catch` 数量评判过度防御。最外层统一报告一次；内部层避免重复记录同一失败。未知错误应保留诊断能力，用户消息与可能包含敏感信息的内部诊断分别安排。

### JS-16 明确资源所有权与写入语义

使用 `finally` 或 API 的资源管理方式关闭文件句柄、服务器、定时器和监听器。清理不应无意覆盖正在传播的主错误。高层文件 API 已负责关闭句柄时，无需为展示清理而改用更低层 API。

写入前明确覆盖、独占创建或原子替换的语义。独占创建能避免覆盖已有文件，但写盘失败仍可能留下不完整的新文件；多写操作不是自动事务。并发写同一资源时按实际需求安排串行化或其他一致性机制。

## 9 安全与日志

### JS-17 把数据与执行能力分开

不使用 `eval()`、动态函数构造或 Shell 拼接执行不可信内容。DOM 文本用 `textContent`；确需富文本时使用经过评估的清洗方案，并保留对应上下文的边界。

服务端代用户访问 URL 时，协议、目标主机和重定向策略要符合业务授权；浏览器 CORS 不能代替服务端权限控制。普通数据解析不应该顺便获得文件、网络或代码执行权限。

### JS-18 管理凭据与可诊断日志

真实凭据不写入源码、样例数据或提交的配置；由运行环境的受控配置或凭据服务提供。日志记录必要的事件、数量和错误类别，省略或脱敏密码、令牌、连接字符串及敏感请求内容。已泄露凭据按流程撤销或轮换。

库通过调用者提供的日志接口或项目约定报告事件，避免导入时配置全局输出。CLI 正常结果和错误分别写 stdout、stderr；不要把错误对象或外部响应体直接输出给普通使用者。

## 10 依赖与可重复构建

### JS-19 声明实际依赖

`dependencies` 用于运行需求，`devDependencies` 用于测试、格式化及构建，`peerDependencies` 用于要求宿主提供的兼容依赖。只声明实际需要的包，不为最小脚本强行引入框架。

应用与示例保留 `package-lock.json`，使用 `npm ci` 根据已有锁文件安装。库仍需声明合理的直接依赖兼容范围。锁文件不保证跨系统产生完全相同的运行行为，支持版本与原生依赖条件须另外记录。

**工程建议：** 长期维护且使用第三方依赖的项目，定期检查已知漏洞与维护者安全公告，按实际影响和升级兼容性安排修复；更新后同步清单、锁文件并重跑受影响检查。`npm audit` 可辅助发现已知漏洞，结果需人工评估；`npm audit fix` 会执行安装并可能修改依赖，不作为无条件自动修复步骤。

### JS-20 检查交付内容

通过 `npm pack` 检查实际 tarball：源码或构建文件、资源、入口和文档是否齐全，是否夹带凭据、缓存、测试临时数据。可在临时消费者目录安装 tarball 后验证公开导入与 CLI。

项目文档给出工作目录、安装、检查、运行和清理方式。本地与 CI 共用检查入口。需要发布时再配置发布权限；教学样例可设 `private: true` 避免误发布。

## 11 测试与维护

### JS-21 测试行为与失败路径

测试接口承诺：正常输入、空集合、边界值、错误结构、I/O 失败和必要副作用。异步测试必须等待实际完成；不要把算法复制一遍作为预期结果。工具可以选 Node.js 内置测试运行器或其他适合项目的框架。

外部服务可用本地服务或替身控制；仍需说明这些测试没有验证真实供应商。每个测试准备自身状态，临时文件、环境修改和服务端口在失败时也要清理，避免依赖测试顺序。

### JS-22 区分检查结论

语法、格式、静态规则、运行测试和安装产物检查解决不同问题。检查通过应报告具体范围，不以测试数量或覆盖率代替正确性判断。性能修改先测代表性工作负载，再验证行为等价。

评审关注实际复杂度与维护收益，不因假想扩展增加防御分支或抽象层。工具升级按影响范围验证，不顺便升级无关依赖。

## 12 兼容性与适用边界

### JS-23 说明版本与迁移

需要持续发布的包应说明版本策略和兼容性承诺。采用 SemVer 时按其公开 API 约定解释版本变化；版本格式本身不能证明兼容。发布说明交代行为变化，弃用接口时说明替代方法和移除安排。

改变 Node.js／浏览器支持范围时，同步元数据、文档和测试环境。不要在未测试的环境上声明已验证，也不要把最低运行版本与本次开发工具版本混为一谈。

### JS-24 用覆盖说明处理条件性规范

每个示例应能把上述规则对应到实现、测试或有理由的项目选择。未使用 DOM、数据库、长期服务或发布平台时，明确这些条件未发生，不人为制造无用代码来展示 API。

最小入门程序可以保留简单结构。本文不要求每个项目同时具备框架、DI 容器、数据库、重试系统或完整部署流水线。

## 参考与引用来源

以下来源均为标准组织或对应项目维护者资料。正文为选编、转述及明确标识的工程整理；第三方材料遵守各自授权，不为本仓库另行声明许可证。

1. **ECMAScript｜JS-01、05～09、13、15。** [语言规范及宿主边界](https://tc39.es/ecma262/multipage/)、[let 与 const 声明](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations)、[数组迭代与排序](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.sort)、[Promise](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects)、[Error](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-error-objects)。使用已由目标运行时实现的特性，不把在线草案标题当作项目支持承诺。
2. **Google｜JS-02～09、15、21～24。** [JavaScript Style Guide：页首维护状态、§4 格式、§5 语言特性、§6 命名、§7 JSDoc](https://google.github.io/styleguide/jsguide.html)、[工程评审：复杂度、测试与文档](https://google.github.io/eng-practices/review/reviewer/looking-for.html)。函数拆分和校验分工是本文工程整理，不是原文逐项强制规则。
3. **Node.js｜JS-11～16、18、21。** [包格式、入口与 exports](https://nodejs.org/api/packages.html)、[文件系统 Promise API](https://nodejs.org/api/fs.html#promises-api)、[AbortSignal.timeout 与 any](https://nodejs.org/api/globals.html#static-method-abortsignaltimeoutdelay)、[测试运行器与隔离](https://nodejs.org/api/test.html)。
4. **WHATWG｜JS-14、17。** [Fetch：Response、状态与取消](https://fetch.spec.whatwg.org/#fetch-method)。取消策略与重试前评估业务后果属于本文工程建议。
5. **OWASP｜JS-17～18。** [DOM XSS：安全写入文本及危险执行上下文](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)、[服务端请求伪造：地址验证与重定向](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)、[凭据管理](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)、[日志排除数据](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude)。
6. **依赖与交付｜JS-12、19～20、23。** npm [package.json 字段](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)、[npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)、[npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack)、[npm audit：Description 中的已知漏洞检查、人工评估与 fix 安装行为](https://docs.npmjs.com/cli/v11/commands/npm-audit/#description)；OWASP [漏洞依赖管理：Context、Cases](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html#cases)。检查频率与更新后验证为本文工程建议。
7. **工具与版本政策｜JS-03、22～23。** [ESLint 配置](https://eslint.org/docs/latest/use/configure/configuration-files)、[Prettier 选项及 printWidth](https://prettier.io/docs/options)、[SemVer 2.0.0](https://semver.org/)。
