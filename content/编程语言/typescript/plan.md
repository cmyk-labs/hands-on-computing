# TypeScript 模块规划

主线 **25 个模块、25 个 .ipynb 文件**；选修 **4 个专题、4 个 .ipynb 文件**，全部展开共 **29 个文件**。每行对应一个 Notebook，主线按顺序学习，选修按需展开。

文件按“二位序号-模块名称.ipynb”命名，主线编号 01–25，选修编号 26–29，例如 01-TypeScript 与工具链.ipynb。以 JavaScript 基础为前置，复用已有语言知识，重点学习类型系统及工程使用。

## 主线模块

| 模块 | 计划内容 |
| --- | --- |
| **[1. TypeScript 与工具链](<01-TypeScript 与工具链.ipynb>)** | TypeScript 与 JavaScript 的关系、静态类型检查、类型擦除与代码生成；编辑器提示、项目内编译器、最小 tsconfig.json、strict、使用 tsc -p 检查与生成 JavaScript、Node.js 执行；诊断信息与运行时异常的区别。 |
| **[2. 常用类型与类型推断](<02-常用类型与类型推断.ipynb>)** | string、number、boolean、bigint、symbol、unique symbol、null、undefined；any、unknown、never、void、object、Object 与 {} 的区别；类型标注、推断、上下文类型、类型位置与值位置，类型断言和非空断言的边界。 |
| **[3. 数组、元组与只读类型](<03-数组、元组与只读类型.ipynb>)** | 元素类型、二维数组、元组、可选元素、剩余元素、具名元组元素、解构；readonly 数组与元组、越界访问、noUncheckedIndexedAccess；只读检查与运行时可变性的区别。 |
| **[4. 对象类型、类型别名与接口](<04-对象类型、类型别名与接口.ipynb>)** | 对象类型、type、interface、可选属性、readonly 属性、方法、索引签名、接口扩展；递归对象类型、额外属性检查（excess property checking）、exactOptionalPropertyTypes；可选属性与显式 undefined 的区别。 |
| **[5. 联合类型、交叉类型与字面量](<05-联合类型、交叉类型与字面量.ipynb>)** | 联合类型与公共操作、交叉类型与属性冲突、字符串及数值字面量类型、字面量类型拓宽（literal widening）；as const、satisfies、类型标注与断言的差别，使用字面量描述有限状态。 |
| **[6. 类型收窄与控制流分析](<06-类型收窄与控制流分析.ipynb>)** | typeof、真值、相等、in、instanceof 和赋值引起的类型收窄（narrowing）；控制流分析、可辨识联合（discriminated union）、类型谓词、断言函数、never 与穷尽性检查；空值、空字符串和自定义守卫的正确性。 |
| **[7. 函数类型与重载](<07-函数类型与重载.ipynb>)** | 函数类型表达式、调用签名与构造签名、参数与返回值、可选及默认参数、剩余参数与元组展开；回调、函数重载与实现签名、this 参数、void 回调的赋值规则；异步函数的返回类型在泛型章节展开。 |
| **[8. 类型兼容性](<08-类型兼容性.ipynb>)** | 结构类型系统（structural typing）、可赋值性、对象成员检查、额外属性检查的适用场景；函数参数与返回值兼容、strictFunctionTypes 及方法参数的例外、可选和剩余参数；类型检查的健全性（soundness）边界。 |
| **[9. 泛型与类型参数](<09-泛型与类型参数.ipynb>)** | 泛型函数、接口与类型别名、类型实参推断、约束与默认值、const 类型参数；元组中的泛型展开（variadic tuple types）；保留输入与输出的类型关系，Promise、Map、Set、Iterable、Iterator、Generator 与异步迭代类型；补充型变（variance）及 in/out 标注的适用条件。 |
| **[10. 类与类型检查](<10-类与类型检查.ipynb>)** | 实例类型与构造函数类型、泛型类、字段与严格初始化检查、public/private/protected、readonly、参数属性、abstract、implements、extends、override、this 类型和类型守卫；TypeScript private 与 JavaScript # 私有元素的区别；补充混入（mixin）。 |
| **[11. 枚举与常量](<11-枚举与常量.ipynb>)** | 数值枚举、字符串枚举、枚举成员类型、计算成员、反向映射；const enum、生成代码与跨包使用限制；枚举、字面量联合和 as const 对象的使用场景。 |
| **[12. 类型操作符与索引访问类型](<12-类型操作符与索引访问类型.ipynb>)** | keyof、类型位置的 typeof、索引访问类型 T[K]、以联合类型访问多个属性、从数组提取元素类型；keyof 泛型约束、值与类型查询的区别。 |
| **[13. 映射类型](<13-映射类型.ipynb>)** | 遍历属性键、映射修饰符、添加和移除 readonly 或可选标记、通过 as 重映射键；保留属性信息与过滤属性，避免混淆映射类型和索引签名。 |
| **[14. 条件类型与 infer](<14-条件类型与 infer.ipynb>)** | 条件类型、extends 条件与泛型约束的区别、infer 推断、从函数和容器提取类型；分布式条件类型（distributive conditional type）、阻止分布、never 和重载推断边界；递归条件类型的用途与复杂度。 |
| **[15. 模板字面量类型](<15-模板字面量类型.ipynb>)** | 由字符串联合构造类型、模板中的推断、与键重映射配合；Uppercase、Lowercase、Capitalize、Uncapitalize；事件名称和属性键约束、联合展开规模与类型复杂度。 |
| **[16. 工具类型](<16-工具类型.ipynb>)** | Partial、Required、Readonly、Record、Pick、Omit；Exclude、Extract、NonNullable；Parameters、ConstructorParameters、ReturnType、InstanceType、Awaited、NoInfer；ThisParameterType、OmitThisParameter、ThisType；组合使用、浅层作用范围与声明阅读。 |
| **[17. 模块与模块解析](<17-模块与模块解析.ipynb>)** | 类型和值的导入导出、import type、export type、import() 类型、模块与全局脚本；ESM/CommonJS 互操作、.ts/.mts/.cts 与输出扩展名、package.json 的 type；module、moduleResolution、NodeNext 与 bundler 的使用条件、导入扩展名、verbatimModuleSyntax。 |
| **[18. 声明文件与第三方类型](<18-声明文件与第三方类型.ipynb>)** | .d.ts、declare、环境声明（ambient declaration）、内置 lib 声明、包自带类型与 @types；模块声明、全局声明、函数及类声明、类型依赖查找；声明文件与运行时实现的一致性，避免用宽泛声明掩盖错误。 |
| **[19. 声明合并与模块扩充](<19-声明合并与模块扩充.ipynb>)** | 类型、值和命名空间中的声明；接口合并、重载顺序、可合并与不可合并的声明；模块扩充（module augmentation）、全局扩充、默认导出的限制；补充命名空间与类、函数或枚举合并的阅读方式。 |
| **[20. tsconfig 与项目组织](<20-tsconfig 与项目组织.ipynb>)** | compilerOptions、files/include/exclude、extends、rootDir/outDir、target/lib、types/typeRoots；strict 及附加检查选项、isolatedModules、noEmit、noEmitOnError、sourceMap、skipLibCheck；paths 与包的 imports/exports、配置和宿主一致性、版本锁定、编辑器与命令行一致性、代码规范检查。 |
| **[21. JavaScript 迁移与 JSDoc](<21-JavaScript 迁移与 JSDoc.ipynb>)** | allowJs、checkJs、逐步迁移与混合项目；JSDoc 的 @type、@param、@returns、@typedef、@callback、@template、@import、@satisfies；JavaScript 文件的推断差异、逐步收紧检查、保留原有测试。 |
| **[22. 外部数据与运行时校验](<22-外部数据与运行时校验.ipynb>)** | 将外部输入作为 unknown 处理；JSON 解析、结构检查与业务约束分工；用类型守卫和断言函数建立类型依据、可辨识联合表达成功与失败、异常处理中的 unknown；浏览器 DOM 查询及事件类型的必要边界。 |
| **[23. 自动化测试与类型检查](<23-自动化测试与类型检查.ipynb>)** | 使用项目配置执行 tsc 检查；正常用例、预期类型错误、@ts-expect-error 与诊断核对；使用 node:test 和 node:assert 检查生成代码的同步、异步与异常行为；类型检查、代码规范检查和运行测试的分工，持续集成与测试隔离。 |
| **[24. 类型声明生成与包分发](<24-类型声明生成与包分发.ipynb>)** | declaration、emitDeclarationOnly、declarationMap、.d.ts/.d.mts/.d.cts；package.json 的 types、exports 及类型条件、typesVersions 的适用边界、发布文件与类型依赖；npm pack、临时安装、实际消费者的类型检查和运行导入。 |
| **[25. 综合工程实践](<25-综合工程实践.ipynb>)** | 制作带类型声明的数据处理模块：外部输入校验、泛型函数、可辨识联合结果、异步接口与错误处理；提供运行测试和类型检查，生成声明与包，在独立消费者中核对安装、解析和执行。 |

## 选修专题

| 模块 | 计划内容 |
| --- | --- |
| **[26. JSX 与 TSX](<26-JSX 与 TSX.ipynb>)** | JSX 与 TypeScript 的关系、.tsx、jsx 编译选项和 JSX 命名空间；intrinsic elements 与 value-based elements、属性与 children 检查、组件返回类型、jsxImportSource；运行时或框架提供的类型与转换条件，不展开完整框架课程。 |
| **[27. 装饰器](<27-装饰器.ipynb>)** | TypeScript 5.0 起支持的装饰器语义、类与成员装饰器、上下文对象、addInitializer、执行顺序与类型约束；与 experimentalDecorators 旧式装饰器的差异、emitDecoratorMetadata 和参数装饰器的适用范围，编译器与运行时支持条件。 |
| **[28. 命名空间与旧项目阅读](<28-命名空间与旧项目阅读.ipynb>)** | namespace、命名空间别名、跨文件声明、环境命名空间；三斜线指令的 path/types/lib 用途与顺序；旧式模块输出及历史 module 命名空间语法的识别、已弃用选项与迁移，不作为新项目默认组织方式。 |
| **[29. 项目引用与编译性能](<29-项目引用与编译性能.ipynb>)** | project references、composite、declarationMap、tsc --build、incremental 与构建缓存；依赖图、分包构建和清理、isolatedDeclarations；extendedDiagnostics、traceResolution、类型复杂度与编辑器性能；区分编译检查耗时和 JavaScript 运行耗时。 |

以已发布的 **TypeScript 7.0 系列**为编写基线，实施首章时固定具体补丁版本、Node.js LTS 和项目配置；其他版本的行为及旧式特性单独注明。默认显式启用 strict，noUncheckedIndexedAccess、exactOptionalPropertyTypes 等附加选项在相关示例中说明，不依赖随版本变化的隐含默认值。正式内容归入 content/编程语言/typescript/。

数组和常用泛型类型先介绍使用方式，第 9 章再系统定义泛型；第 13 章先讲基本键映射，结合模板字面量的写法在第 15 章展开。模块配置在首次运行时给出最小必要说明，第 17、20 章系统解释。浏览器 API、JavaScript 运行机制及框架开发只补足本例需要的前置，不重复整门课程。

## 规划依据

- 第 1–7 章：[The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)、[Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)、[Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)、[Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)、[More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)；symbol 补充依据 [Symbols](https://www.typescriptlang.org/docs/handbook/symbols.html)，satisfies 依据 [TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)。
- 第 8–11 章：[Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)、[Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)、[Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)、[Enums](https://www.typescriptlang.org/docs/handbook/enums.html)及 [Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html)；泛型元组展开依据 [TypeScript 4.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)，const 类型参数依据 [TypeScript 5.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters)。
- 第 12–16 章：[Keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)、[Typeof](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)、[Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)、[Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)、[Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)、[Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)及 [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)。
- 第 17–21、24 章：[Modules Reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)、[Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)、[Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)、[TSConfig Reference](https://www.typescriptlang.org/tsconfig/)、[Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)、[JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)及[声明文件发布](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)。
- 第 22–25 章：Handbook 的 unknown、类型守卫与断言函数部分；[DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)、[TypeScript 3.9 的预期错误注释](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html)、[Node.js 测试](https://nodejs.org/api/test.html)、[断言](https://nodejs.org/api/assert.html)、[包入口](https://nodejs.org/api/packages.html)及 [npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack/)。综合练习基于已核查规则设计，不冒称官方原例。
- 第 26–29 章：[JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)、[TypeScript 5.0 装饰器](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators)、[Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)、[Triple-Slash Directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html)、[Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)及维护者的[性能说明](https://github.com/microsoft/TypeScript/wiki/Performance)。
- 版本与运行边界：[TypeScript 6.0 的配置变更与弃用项](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)、[TypeScript 7.0 发布说明](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)以及 [Node.js 的 TypeScript 支持](https://nodejs.org/api/typescript.html)。旧版 Handbook 示例与当前编译器不一致时，核对发布说明和官方实现，不直接照搬配置。

本表覆盖 [官方 Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)与相关参考文档的主要语言、声明及工程主题，按学习关系组织，不代替全部编译选项、宿主 API 或框架参考。写作与逐点核查要求见 [AGENTS.md](AGENTS.md)。
