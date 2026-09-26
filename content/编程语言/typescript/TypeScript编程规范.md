# TypeScript 编程规范

> 阅读定位：本文说明语言或平台规则、代码风格和一般工程建议，保留来源的原意及适用条件。本项目的实现取舍统一见[根协议](../../../AGENTS.md#课程编写的七条原则)，其中全部代码的最简原则也适用于本文示例。校验、异常、入口等章节是在讲相应机制；其写法不自动成为其他示例的必加结构。一般工程建议不能被当作给当前教学代码增加防护的依据。


第 2 版 · 来源核查日期：2026-09-13

面向 TypeScript 应用、Node.js 工具和可复用库，覆盖编码、类型建模、运行时边界、模块、构建、测试、安全和版本维护。需要具备 JavaScript、函数、对象、Promise 和模块基础。本文可独立阅读；JavaScript 的详细编码解释可对照 [JavaScript 编程规范](../javascript/JavaScript编程规范.md)。

本文依据 TypeScript 官方 Handbook、TSConfig 与模块指南，并结合 Node.js、npm 和第一方工程指南整理。**语言／工具约束**描述实际行为；**风格选择**由项目一致采用；**工程建议**保留项目取舍。它不是 TypeScript 所有语法的目录，也不把编译器实现团队的内部写法当成应用的通用强制标准。

## 1 类型与运行时

### TS-01 不把类型检查当成运行时验证

TypeScript 的类型标注和类型断言不自动检查实际输入。文件、网络、JSON 和 JavaScript 调用方仍可能提供错误数据；外部值先作为 `unknown` 接收，再通过实际判断得到领域对象。

编译成功不能证明 I/O 成功、输入有效或业务正确。`as Task`、非空断言 `!` 和 `satisfies` 都不能替代验证。运行失败与静态诊断要分别测试和报告。

### TS-02 配置要对应实际宿主

项目明确支持的运行时、TypeScript 和类型声明版本。`target` 影响输出语法，`lib` 提供环境类型信息，不会安装 polyfill。只在真实提供 DOM 的目标中引入 DOM 类型，避免服务端意外依赖浏览器对象。

Node.js 项目按实际模块格式选择 `NodeNext` 等配置；由打包器负责解析的应用可按其文档选择 `bundler`。不要把“编译器能解析”当成“运行时也能加载”。

## 2 格式、命名与接口说明

### TS-03 保持普通代码易读

可采用 2 空格缩进、单引号和分号，由格式化器统一。变量与函数用 `lowerCamelCase`，类型与类用 `UpperCamelCase`。不要求给接口机械加 `I` 前缀，也不因名称短就批量改名。

局部变量优先 `const`，确需赋值时用 `let`。明确对象是否会被修改；使用浅拷贝时不要承诺深层隔离。少量业务分支可直接展开，不为减少 `if` 改成复杂类型或框架。

### TS-04 公开签名稳定，局部类型依赖推断

公开参数、返回值和异步结果应清楚表达契约；显然可推断的局部变量无需重复标注。公共返回类型可以显式声明，以便发现实现变化导致的 API 漂移。

注释说明单位、范围、缺省行为、错误、副作用和所有权。已有类型能表达的信息不必逐字重复。使用 `@deprecated` 时同时说明替代方案与迁移条件。

## 3 基础类型与空值

### TS-05 使用真实类型关系

基础值使用 `string`、`number`、`boolean`，通常不使用对应包装对象类型。`any` 会跳过相关检查，仅在确有边界限制时局部使用并说明原因；接受任意未知输入通常使用 `unknown`。

不要用宽泛的 `object` 或 `{}` 代替已经知道字段的结构。`number` 不表示“有限整数”；金额、长度或时长的业务边界仍需运行时检查。

### TS-06 区分缺省、空值与缺失属性

建议启用 `strictNullChecks`，按控制流处理 `null`、`undefined` 和查找失败。保留有效的零、空文本或 `false` 时使用恰当的显式判断或 `??`。

可选属性 `note?: string` 与属性必定存在但允许 `undefined` 的 `note: string | undefined` 表达不同意图。`exactOptionalPropertyTypes` 可强化这种区别；该选项不由 `strict` 自动启用，应在项目中明确选择。

## 4 数据建模

### TS-07 根据结构需要选择 interface 与 type

`interface` 适合描述对象契约和需要扩展的接口；`type` 可以表达联合、元组及其他组合。两者都能描述许多对象类型，没有一种写法天然适用于全部项目。

TypeScript 主要按结构判断兼容性。额外属性检查不等于所有赋值都要求对象字段完全相同；外部协议如果禁止未知字段，应在运行时明确检查。

### TS-08 让状态与字段相互对应

相关状态使用可辨识联合，将判别字段与该状态所需数据放在同一个分支。避免用多个无关系的布尔量和可选字段表达会产生无效组合的状态。

```typescript
type TaskState =
  | { readonly kind: 'open' }
  | { readonly kind: 'done'; readonly actualMinutes: number };
```

这里完成状态需要实际分钟数，是示例的业务规则。字面量联合通常足够；需要 `enum` 时考虑它的运行时输出和包兼容条件，不把两者视为无条件互换。

## 5 缩窄与验证

### TS-09 让校验同时支持实际安全和类型缩窄

使用 `typeof`、`Array.isArray()`、`in` 或判别字段进行必要检查；`typeof null` 的结果不能证明它是可读取字段的对象。类型谓词和断言函数的实现须真的检查其承诺的条件。

解析层集中外部结构检查与归一化，再向内部传递明确类型。不要同一流程反复验证未变化的对象；允许外部修改或约束变化时则需按边界重新检查。

### TS-10 用穷尽检查发现状态遗漏

对封闭联合的每种情况处理后，可把剩余值赋给 `never`，使新增分支导致编译诊断。`switch` 可以直接承担这个职责，不必额外建立只调用一次的包装函数。

`satisfies` 适合检查配置是否符合目标类型并保留较具体的推断结果，要求 TypeScript 4.9 或更新版本。它不改变 JavaScript 运行时数据；不能拿它“认证”刚解析的 JSON。

## 6 泛型与不可变性

### TS-11 泛型表达输入输出之间的关系

类型参数应连接至少两处真实关系，例如按数组元素类型返回同类型结果。只有一个固定用途的函数通常不需要泛型。联合参数能清楚表达时，不为展示特性堆叠重载。

按需采用 `keyof`、索引访问类型、`Pick`、`Record` 等类型工具；复杂条件类型和映射类型只有明显减少维护成本时才引入。可读性和有用的诊断优先于把所有约束塞进类型表达式。

### TS-12 说明 readonly 的实际边界

只读参数可以接受不允许当前函数修改的数据。`readonly`、`Readonly<T>` 与 `as const` 主要约束类型检查，不自动冻结运行时对象，也不自动阻止通过别名修改内部数据。

需要运行时隔离时，按数据结构复制或冻结必要层级；普通数据返回新对象通常已经足够。不要承诺深层不可变后只做一层对象展开。

## 7 函数、错误与异步

### TS-13 职责决定函数和模块规模

**工程整理：** 保留表达独立概念、复用规则或隔离 I/O 的短函数；连续业务步骤可合并理解。没有统一函数行数、分支数或最小模块大小标准。

调用方提供的依赖只在确实有环境变化或测试边界时显式传入。不要为简单数据流引入服务容器、抽象仓储或无实际消费者的接口层。

### TS-14 处理真实错误与未完成任务

严格配置下捕获值按 `unknown` 处理，读取消息前缩窄；JavaScript 可以抛出非 Error 值。转换异常时保留 `cause`，由有恢复、清理、接口转换或报告职责的位置捕获，避免吞错或重复日志。

异步返回写成 `Promise<T>` 并由调用者等待或返回；不得留下无处理的失败。并行任务按依赖与容量决定。外部调用检查状态并安排取消／超时；Fetch 的 HTTP 错误状态与 Promise 拒绝不同，信号取消也不保证远端业务回滚。

## 8 编译器与模块

### TS-15 明确严格检查的范围

新项目建议启用 `strict`，逐步迁移既有项目时记录暂时放宽的范围。按数据使用方式考虑 `noUncheckedIndexedAccess`、`exactOptionalPropertyTypes`、`noFallthroughCasesInSwitch` 等选项，别误称 `strict` 启用了所有检查。

使用编译器发出 JavaScript 的项目可启用 `noEmitOnError`，避免带类型错误的代码进入产物；只检查类型时使用 `noEmit`。升级编译器可能增加诊断，应验证项目而不是机械关闭严格模式。

### TS-16 让类型导入与运行时导入一致

仅用于类型位置的依赖可使用 `import type`、`export type`。结合 `verbatimModuleSyntax` 明确导入保留行为。Node ESM 的相对导入通常在源文件写目标输出的 `.js` 扩展名。

`paths` 不自动重写输出 JavaScript 的导入路径。发布可复用库时，按消费者真实解析模式检查声明和导出；不要仅用编辑器跳转成功作为模块配置正确的证据。

## 9 包、依赖与交付

### TS-17 同时交付代码和类型声明

发布库时，运行时入口与 `.d.ts` 声明必须同时可解析。按模块格式配置 `exports`，需要时设置 `types`；声明文件本身不提供运行实现。

只发布消费者需要的文件。若公开声明引用外部类型，消费者必须能取得相应依赖；不能仅因为它“只有类型”就一律放进开发依赖。用真实消费者验证包的类型和运行行为。

### TS-18 分开维护依赖与构建条件

运行依赖、开发工具和宿主兼容依赖分别放入合适的 npm 字段。示例或应用保存锁文件并使用 `npm ci`。TypeScript、运行时类型包、构建工具的版本在项目 README 集中记录。

**工程建议：** 长期维护的第三方依赖定期检查已知漏洞和安全公告，按实际影响与兼容性决定修复；开发工具也按其执行环境评估。`npm audit` 可辅助检查，`npm audit fix` 会执行安装，应先审阅变更。升级后同步清单与锁文件，并验证受影响的类型、运行行为及交付产物。

构建顺序应明确，检查通过后通过 `npm pack` 验证实际产物。消费者在源码目录外安装 tarball 后执行导入、类型检查和 CLI；不要只测试构建目录里的相对导入。

## 10 安全、日志与资源

### TS-19 类型不能代替信任边界

不用类型断言把用户文本转换成可执行指令。DOM 文本使用安全的文本接口；访问文件、SQL、子进程和远程地址时按实际平台校验权限与数据边界。浏览器代码不能安全保管需要对用户保密的服务端凭据。

源码、提交的配置和样例中不放真实密钥。运行时通过受控配置取得凭据；日志省略或脱敏密码、令牌、敏感响应和连接信息，泄露后及时撤销或轮换。

### TS-20 由资源拥有者负责清理

文件句柄、服务器、定时器和监听器由创建或明确接管的一方清理。高层 API 已经负责释放的资源无需重复包装；使用 `finally` 时避免覆盖主错误。

入口统一安排 stdout、stderr、退出状态和必要日志，库导入时不启动外部操作。写文件明确覆盖或独占创建、失败残留等语义，不将一组写操作误称为事务。

## 11 测试与类型回归

### TS-21 同时检查编译期与运行时行为

类型测试覆盖公开签名、只读约束、非法状态及空值关系；可以用带原因的 `@ts-expect-error` 表示预计失败的编译用例。它在下一行不再出现诊断时会报错，但不保证诊断一定是预想的那一条，仍需保持用例聚焦。

运行测试覆盖正常、边界和错误输入、异步失败、I/O 副作用。类型测试不执行业务，运行测试也不能替代声明兼容性检查；测试失败不得通过无依据的 `as` 或 `@ts-ignore` 消除。

### TS-22 让验证可重复并对应结论

每个测试准备自己的状态，临时文件、服务和环境修改在失败时也能恢复。时间、随机性与网络响应影响结果时，使用受控输入或本地服务；真实集成环境另外说明。

类型检查关注类型关系，格式化统一排版，静态规则补充检查可疑用法。**工程建议：** 按项目需要启用 typescript-eslint 的类型感知规则，例如 `no-floating-promises` 检查未妥善处理的 Promise；此类规则需要类型信息。用 `void` 标记忽略结果不会处理 Promise 拒绝，失败仍须按 TS-14 安排处理。

本地与 CI 共用项目采用的类型检查、格式检查、静态规则、运行测试和包检查命令。性能改动先测实际工作负载并核对行为；覆盖率、类型通过或编译成功均不单独代表工程验收完成。

## 12 版本维护与范围

### TS-23 把声明变化纳入兼容性评估

返回类型收窄或扩大、泛型约束、可选属性及异常承诺变化，都可能影响消费者。发布说明同时描述运行行为与类型接口的变化；弃用接口提供替代方式和明确安排。

版本策略由项目声明。采用 SemVer 时按其公共 API 承诺维护；调整最低 TypeScript、Node.js 或浏览器范围时，同步 README、元数据和消费者测试。

### TS-24 按实际需要选择高级能力

装饰器、JSX、命名空间、声明合并、项目引用等能力按项目需要配置并测试，不是通用项目必须全部出现的结构。尤其不能为了展示类型技巧牺牲运行时清晰度。

示例覆盖表应区分实际实现、测试与条件未发生的选择；不把“未使用某项可选特性”当成不合规，也不把没有执行的消费者或浏览器检查标为通过。

## 参考与引用来源

正文是官方资料的选编、中文转述和工程整理，示例为原创；保留来源及其适用范围，第三方材料按各自授权使用。

1. **TypeScript Handbook｜TS-01、03～14。** [Everyday Types：推断、any、断言与空值](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)、[Narrowing：类型保护、可辨识联合与 never](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)、[Object Types：可选、readonly 与结构](https://www.typescriptlang.org/docs/handbook/2/objects.html)、[More on Functions：泛型、unknown 与回调](https://www.typescriptlang.org/docs/handbook/2/functions.html)、[4.9 satisfies](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)。
2. **编译与模块｜TS-02、06、15～18。** [TSConfig：strict、target、lib、noEmit、noEmitOnError、exactOptionalPropertyTypes、noUncheckedIndexedAccess、verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig/)、[模块解析参考：NodeNext、bundler、路径和扩展名](https://www.typescriptlang.org/docs/handbook/modules/reference.html)、[声明文件发布及类型依赖](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)。
3. **类型测试｜TS-21。** [TypeScript 3.9：@ts-expect-error](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments)。
4. **JavaScript 与宿主｜TS-03、12、14、19～22。** [ECMAScript](https://tc39.es/ecma262/multipage/)、[Node.js 包](https://nodejs.org/api/packages.html)、[文件系统](https://nodejs.org/api/fs.html#promises-api)、[AbortSignal](https://nodejs.org/api/globals.html#static-method-abortsignaltimeoutdelay)、[测试运行器](https://nodejs.org/api/test.html)、[Fetch 状态与取消](https://fetch.spec.whatwg.org/#fetch-method)。
5. **安全｜TS-19～20。** [OWASP DOM XSS](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)、[凭据管理](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)、[日志排除数据](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude)。
6. **工程与工具｜TS-03～04、13、18、22～24。** [Google 评审：复杂度、测试与文档](https://google.github.io/eng-practices/review/reviewer/looking-for.html)、[Prettier 选项](https://prettier.io/docs/options)、typescript-eslint [no-floating-promises：类型信息要求与 ignoreVoid 的限制](https://typescript-eslint.io/rules/no-floating-promises/#ignorevoid)、[npm 字段](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)、[npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)、[npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack)、[npm audit：Description 中的检查与 fix 安装行为](https://docs.npmjs.com/cli/v11/commands/npm-audit/#description)、OWASP [漏洞依赖管理：Context、Cases](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html#cases)、[SemVer](https://semver.org/)。函数边界、检查组合、依赖维护频率和迁移沟通为本文据这些原则作出的工程整理。
