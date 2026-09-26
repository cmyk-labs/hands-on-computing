# JavaScript 模块规划

编写规则统一见[全局协议](../../../AGENTS.md)、[Notebook 协议](../../../docs/notebook-protocol.md)及本课程 [AGENTS.md](AGENTS.md)。本规划中的校验、异常、入口与错误恢复条目表示相应主题的教学范围，不要求普通示例预先添加这些结构；全部示例默认输入满足其说明的条件。


主线 **26 个模块、26 个 .ipynb 文件**；选修 **4 个专题、4 个 .ipynb 文件**，全部展开共 **30 个文件**。每行对应一个 Notebook，主线按顺序学习，选修按需编写。

文件按“二位序号-模块名称.ipynb”命名，主线编号 01–26，选修编号 27–30，例如 `01-运行与代码书写.ipynb`。

## 主线模块

| 模块 | 计划内容 |
| --- | --- |
| **[1. 运行与代码书写](<01-运行与代码书写.ipynb>)** | JavaScript、ECMAScript、引擎与宿主环境的关系；浏览器控制台与 Node.js、脚本和模块的运行方式、console、globalThis、命名、注释、语句、自动分号插入、严格模式与基本错误阅读。 |
| **[2. 类型与变量](<02-类型与变量.ipynb>)** | undefined、null、boolean、number、bigint、string、symbol 七种原始类型与 object；字面量、typeof、let/const/var、原始值与对象引用、动态类型；const 与对象可变性的区别。 |
| **[3. 运算与类型转换](<03-运算与类型转换.ipynb>)** | 算术、赋值、比较、逻辑、位运算、条件运算、优先级与求值顺序；显式与隐式转换、真值、短路、空值合并、可选链；严格与宽松相等、Object.is、NaN 与正负零。 |
| **[4. 数值与数学运算](<04-数值与数学运算.ipynb>)** | Number、BigInt、数值字面量、进制、安全整数、Infinity/NaN、解析与有限值检查、Math、舍入与格式化；浮点误差、BigInt 混合运算限制、随机数的用途边界。 |
| **[5. 字符串与 Unicode](<05-字符串与 Unicode.ipynb>)** | 字符串不可变性、索引、切片、查找与替换、模板字面量、转义、String.raw；UTF-16 码元与 Unicode 码点、长度与遍历、规范化；URI 编码与组件编码的区别。标签模板在函数章节展开。 |
| **[6. 条件与循环](<06-条件与循环.ipynb>)** | if/else、switch、for/while/do...while、break/continue、标签语句；for...in 与 for...of、遍历键与值、循环中的声明和边界条件。 |
| **[7. 函数与参数](<07-函数与参数.ipynb>)** | 函数声明与表达式、调用与返回、默认参数、剩余参数、实参展开、arguments、箭头函数、立即调用函数表达式（IIFE）；参数按值传递、重新赋值与对象修改；回调、递归与标签模板（tagged template）。 |
| **[8. 作用域、闭包与高阶函数](<08-作用域、闭包与高阶函数.ipynb>)** | 全局、函数、块和模块作用域、词法作用域、声明提升（hoisting）、暂时性死区（TDZ）、闭包；函数作为参数和返回值、函数组合、循环中的变量捕获与副作用。 |
| **[9. 对象与属性](<09-对象与属性.ipynb>)** | 对象字面量、属性访问与删除、计算属性名、简写方法、解构与展开、getter/setter；自有与继承属性、可枚举性、属性描述符、Object.keys、Object.values、Object.entries、Object.fromEntries、Object.hasOwn；Object.assign 与浅拷贝、Object.freeze、Object.seal、动态键与原型污染边界；structuredClone 的宿主归属与复制限制。 |
| **[10. 数组与数据处理](<10-数组与数据处理.ipynb>)** | Array、索引与 length、增删改查、切片、解构与展开；map/filter/reduce/find/some/every、扁平化、分组、排序与复制型方法；稀疏数组、回调返回值、原地修改和浅拷贝。 |
| **[11. Map 与 Set](<11-Map 与 Set.ipynb>)** | Map/Set 的增删查与遍历、SameValueZero 相等规则、对象键与插入顺序、集合运算；与 Object/Array 的选择；WeakMap/WeakSet 的用途、可用键或成员及不可枚举限制。 |
| **[12. this 与调用方式](<12-this 与调用方式.ipynb>)** | 普通函数和方法调用中的 this、严格模式下的差异、箭头函数的词法 this、call/apply/bind；方法提取、回调和构造调用中的绑定，new.target 的用途。 |
| **[13. 原型与原型链](<13-原型与原型链.ipynb>)** | 对象的原型、属性查找与遮蔽、构造函数、prototype 与实例的关系、new、Object.create/getPrototypeOf、instanceof；原型共享、组合与继承，不修改内置对象原型。 |
| **[14. 类与继承](<14-类与继承.ipynb>)** | class、constructor、实例字段与方法、静态成员与静态初始化块、私有元素、访问器、extends/super、方法覆盖与初始化顺序；类与原型机制的关系，继承与组合的选择。 |
| **[15. 异常处理与调试](<15-异常处理与调试.ipynb>)** | Error 与常用错误类型、throw、try/catch/finally、自定义异常与 cause；调用栈、断点与调试器；异常传播、清理中的异常，以及错误信息的宿主差异。 |
| **[16. 正则表达式](<16-正则表达式.ipynb>)** | RegExp、字符类、量词、命名捕获组、反向引用、断言与标志；test/exec、match/matchAll、替换与切分；Unicode 属性转义与 v 标志、d 标志与匹配索引、RegExp.escape、lastIndex 状态和过度回溯。 |
| **[17. JSON 与数据转换](<17-JSON 与数据转换.ipynb>)** | JSON.parse/stringify、reviver/replacer、toJSON、缩进；缺失值与 null、日期和 BigInt、循环引用与精度；解析与业务校验的区别，序列化与对象复制的边界。 |
| **[18. 日期、时间与国际化](<18-日期、时间与国际化.ipynb>)** | Date、时间戳、UTC 与本地时间、日期解析与计算；Intl.DateTimeFormat、Intl.NumberFormat、Intl.Collator、Intl.PluralRules、Intl.Segmenter；Intl.Locale、Intl.ListFormat、Intl.RelativeTimeFormat、Intl.DisplayNames、Intl.DurationFormat 的用途；时区与夏令时、区域设置和环境差异。补充 Temporal 的用途、标准状态与支持条件。 |
| **[19. ES 模块](<19-ES 模块.ipynb>)** | import/export、默认与具名导出、别名、再导出、模块命名空间对象、模块作用域和严格模式；实时绑定（live bindings）、循环依赖与导入副作用、import.meta、导入属性（import attributes）与 JSON 模块；浏览器与 Node.js 的模块解析条件，异步导入在掌握 Promise 后展开。 |
| **[20. 迭代器与生成器](<20-迭代器与生成器.ipynb>)** | 可迭代协议与迭代器协议、Symbol.iterator、next/return/throw、生成器函数、yield/yield*；惰性求值、迭代器耗尽、提前结束与清理，迭代器辅助方法。 |
| **[21. Promise](<21-Promise.ipynb>)** | 状态与结果、执行器、resolve/reject、then/catch/finally、链式调用与返回值；Promise.all、Promise.allSettled、Promise.any、Promise.race、Promise.withResolvers、Promise.try、thenable、错误传播与未处理拒绝；创建任务和组合结果的区别。 |
| **[22. async 与 await](<22-async 与 await.ipynb>)** | 异步函数、await、try/catch/finally、串行与并发组织、动态 import()、顶层 await；异步迭代器、异步生成器、for await...of；遗漏 await、异步回调、并发数量与取消机制的宿主边界。 |
| **[23. 执行模型与异步调度](<23-执行模型与异步调度.ipynb>)** | 执行上下文、调用栈、作业（job）、宿主的任务与微任务、事件循环；同步代码、Promise 回调和宿主定时器的顺序；运行至完成、阻塞与让出执行机会，浏览器和 Node.js 的调度差异；Realm、Agent 与跨环境对象判断的基本定位。 |
| **[24. 自动化测试](<24-自动化测试.ipynb>)** | 使用 Node.js 的 node:test 与 node:assert 测试语言示例；同步与异步断言、异常与拒绝、边界值、测试隔离、mock、覆盖率；可测试函数与副作用控制。 |
| **[25. 项目组织与工程工具](<25-项目组织与工程工具.ipynb>)** | Node.js 与 npm 的分工、package.json、依赖与开发依赖、锁文件、npm ci 和 npm scripts；ESM 与 CommonJS 的识别、包入口与 exports/imports、ESLint、格式化和持续集成；运行环境兼容、依赖安全、polyfill 与语法转换的区别、eval/Function 的使用边界。 |
| **[26. 综合工程实践](<26-综合工程实践.ipynb>)** | 制作可复用的数据处理模块，组合输入校验、筛选分组、统计排序、JSON 输出和异步任务；分离计算与副作用，提供模块接口、自动化测试和运行说明，并验证实际安装后的导入。 |

## 选修专题

| 模块 | 计划内容 |
| --- | --- |
| **[27. 二进制数据与类型化数组](<27-二进制数据与类型化数组.ipynb>)** | ArrayBuffer、TypedArray、DataView、字节序、视图与共享底层数据、缓冲区调整和分离；了解 SharedArrayBuffer/Atomics 及其宿主运行条件，并发线程实践留在相应运行时专题。 |
| **[28. Proxy、Reflect 与元编程](<28-Proxy、Reflect 与元编程.ipynb>)** | Proxy 拦截、Reflect、对象内部操作与不变量、可撤销代理；常用内置 Symbol 协议、属性描述符和代理的配合，私有字段、方法 this 与代理对象的限制。 |
| **[29. 内存管理与性能分析](<29-内存管理与性能分析.ipynb>)** | 可达性与垃圾回收、闭包和缓存持有对象、WeakRef/FinalizationRegistry；清理时机的不确定性；使用宿主性能工具分析耗时与内存，区分语言保证和引擎实现，比较优化收益。 |
| **[30. 显式资源管理](<30-显式资源管理.ipynb>)** | using/await using、Symbol.dispose/Symbol.asyncDispose、DisposableStack/AsyncDisposableStack、SuppressedError；释放顺序、异步释放与异常传播，标准版本及运行环境支持条件。 |

主线以 ECMAScript 2025（ECMA-262 第 16 版）及同期 ECMA-402 为基线；Temporal、显式资源管理等超出基线的内容标为补充或选修，分别核对标准状态与宿主支持。使用 Node.js LTS 执行语言示例，实际版本统一维护在本课程 README.md，首章链接该环境入口，需要时与浏览器对照。正式内容归入 `content/编程语言/javascript/`。

DOM、事件、Fetch、浏览器存储及完整 Web 应用开发另属 Web 应用专题；本课程只在演示运行、调度和测试时使用必要的宿主 API，并用一句话标明边界。类型总览中的对象在后续按对象、数组和集合展开。必需的脚本及资源按需放在 `scripts/章节/` 下，例如 `scripts/19-es-modules/`，Notebook 头部列明位置与用途；工程注意随对应知识点讲解。

## 规划依据

- Ecma International：第 1–17、19–23、27–29 章依据 [ECMA-262 第 16 版](https://262.ecma-international.org/16.0/)中语言类型（§6.1）、执行与作业（§9）、表达式与语句（§13–14）、函数与类（§15）、模块（§16）、内置对象（§19–28）等对应部分；第 18 章国际化依据 [ECMA-402 第 12 版](https://402.ecma-international.org/12.0/)。
- MDN：教学组织参考 [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)；重点用法对照[立即调用函数表达式](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)、[模板字面量](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)、[静态初始化块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks)、[导入属性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with)、[RegExp.escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape)、[执行模型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)、[元编程](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming)、[内存管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)、[资源管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management)及 [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)。
- WHATWG：第 23 章浏览器调度依据 HTML 标准的[事件循环](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)，不将其完整调度规则套用到 Node.js。
- Node.js：第 19、24–26 章及运行条件参考 [ES 模块](https://nodejs.org/api/esm.html)、[包](https://nodejs.org/api/packages.html)、[测试运行器](https://nodejs.org/api/test.html)和[断言](https://nodejs.org/api/assert.html)文档，实施时使用所固定版本的对应文档。
- 工程工具：第 25–26 章参考 npm 的 [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)、[npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)及 [ESLint](https://eslint.org/docs/latest/use/getting-started) 官方文档。
- TC39：第 18、30 章补充内容核对 [Temporal 文档](https://tc39.es/proposal-temporal/docs/)、[显式资源管理提案](https://tc39.es/proposal-explicit-resource-management/)与[已完成提案及标准年份](https://github.com/tc39/proposals/blob/main/finished-proposals.md)。

以上覆盖语言基础、主要内置对象、进阶机制与必要工程实践；章节是按学习关系编排的主题，不冒称官方原目录，也不代替完整 API 参考。正文写作遵守 [AGENTS.md](AGENTS.md)，逐点核查具体小节、术语和适用条件。
