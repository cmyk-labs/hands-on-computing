# HTML 编程规范

第 2 版 · 来源核查日期：2026-09-13

面向普通网页、表单页面和服务端生成的 HTML，覆盖结构、语义、可访问性、安全边界、资源、测试与交付。前置知识是元素、属性、链接和表单；CSS 与 JavaScript 分别负责样式和必要行为。本文可独立阅读，不要求采用框架，也不把所有 HTML 元素机械加入每个项目。

本文是第一方资料的中文选编与工程整理，不是 HTML Living Standard 或 WCAG 的全文译本。**平台约束**描述 HTML 的实际要求和行为；**风格选择**由项目一致采用；**工程建议**根据功能、用户和维护成本决定。WCAG 条件与等级只在对应目标范围内适用；WAI 教程和 APG 是实施指导，不能替代完整符合性评估。

## 1 依据与写作尺度

### HTML-01 区分语义、行为和工程约定

HTML 定义文档结构和元素语义，也通过表单、链接、`details` 等提供原生行为。依据 WHATWG 的内容模型选择元素；浏览器容错后“看起来能用”不能证明源码符合规范。

项目声明目标浏览器、辅助技术与可访问性目标，记录实际验证环境。HTML 校验、样式检查、脚本测试和业务验证分别说明；仅使用 HTML 时，不为凑规则添加 JavaScript 异常处理或运行时包装。

### HTML-02 采用明确且可执行的格式

**风格选择：** 可采用 2 空格缩进、小写 HTML 标签与属性、带双引号的属性值，以及按语义组织的换行。UTF-8 中的普通文字直接书写；具有 HTML 特殊含义的字符按上下文转义。

本文选用 Google HTML/CSS 指南的上述常用建议，并保留非空元素的结束标签以便阅读。HTML 允许特定条件下省略部分标签；本文不采用该项可选风格，也不要求协议相对 URL。格式化器规则与项目选择保持一致，不因偏好重排无关文件。

## 2 文档骨架与属性

### HTML-03 提供正确的页面身份和元数据

普通独立页面使用 `<!doctype html>`、`html`、`head` 和 `body`。根元素的 `lang` 表达页面主要语言，语言变化的片段按需要另标 `lang`。页面提供可脱离正文理解的 `title`；HTML 对 `iframe srcdoc` 等特殊上下文存在不同要求，不能把普通页面约定推广为无条件语法限制。

使用 UTF-8，并使 HTTP 编码和文件实际编码一致。采用 `meta charset` 声明时，整个声明须位于文档前 1024 字节内。描述性元数据按页面内容填写，不堆放无实际用途的占位字段。

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>开放日安排 · 邻里工坊</title>
  </head>
  <body>
    <main><h1>邻里工坊开放日</h1></main>
  </body>
</html>
```

### HTML-04 遵守嵌套、标识和属性语义

按元素的内容模型组织嵌套，例如不要在 `p` 中放 `div`，也不要在链接内再放链接或交互控件。相同元素不重复声明同名属性；同一元素树中的 `id` 保持唯一、非空且不含 ASCII 空白，并同步维护引用它的标签、片段链接和 ARIA 属性。

布尔属性出现即为真，例如 `disabled="false"` 仍不能表示启用；不需要时移除该属性。`img`、`input`、`meta` 等空元素没有结束标签，HTML 中尾随 `/` 也不会使普通元素自闭合。SVG/XML 的语法条件另行区分。

## 3 语义化内容

### HTML-05 用标题和区域表达阅读结构

标题等级表达内容层级，避免为了字号选择 `h1`～`h6`。通常用一个清楚的页面主标题，再按主题展开；这是组织建议，不是“只能出现一个 h1”的普遍语法限制。尽量避免向下跨级，结束子节后回到较高等级是合理的。

用 `header`、`nav`、`main`、`footer` 等表达相应区域；不是每组链接都需要 `nav`，也不是每个容器都需要 `section`。按语义选择 `article`、`aside`，重复同类地标按需要命名以便区分。不要给已有原生语义机械重复添加 `role`。

### HTML-06 让列表、数据关系和时间可识别

无序集合用 `ul`，步骤或顺序有意义时用 `ol`，名称与描述关系可用 `dl`。强调与重要性分别按 `em`、`strong` 的语义表达；视觉样式交给 CSS。

关系型表格使用 `table`、`th`、`td`，通常提供说明主题的 `caption`；简单行列标题可用 `scope`，复杂多级关系按需要使用 `headers` 与 `id`。表格不用作页面布局。`time` 的 `datetime` 若存在须为允许的机器可读格式，涉及具体时刻时明确适用时区。

## 4 链接与原生交互

### HTML-07 区分导航与操作

导航使用具有有效 `href` 的 `a`，提交和动作使用 `button`。链接文字说明目的；不用 `href="#"` 或 `javascript:` 伪装动作。表单按钮显式选择 `type="submit"` 或 `type="button"`，避免依赖容易被忽略的默认提交行为。

需要新窗口时说明用户将发生的导航变化，并理解 `noopener` 与 `noreferrer` 的不同作用；不为所有链接强制添加新窗口。现代 HTML 的 `_blank` 链接有隐式 `noopener` 行为，兼容性策略或审阅需要时仍可显式写出；`noreferrer` 还会影响来源信息。

### HTML-08 优先利用原生控件

简单展开内容可用 `details`，以首个 `summary` 提供名称；浏览器提供展开、收起及键盘操作。只有需要相应语义时才选 `dialog` 等元素，并核查焦点、关闭方式和目标浏览器行为。

ARIA 的角色不会自动实现键盘行为。自定义组件先评估原生元素能否满足需要，再按 APG 实现完整交互并验证辅助技术支持。不为少量内容加入组件框架、重复状态或无意义包装。

## 5 表单命名与提交契约

### HTML-09 给控件和分组清晰的名称

普通输入控件提供可见的 `label`，通过 `for` 与唯一 `id` 显式关联，或使用规范允许的嵌套关联。`placeholder` 不能替代标签；说明单位、格式和必填条件，不只依赖颜色或星号。

有共同问题的单选组、复选组等使用 `fieldset` 和 `legend`。必要的提示通过 `aria-describedby` 关联；可访问名称包含可见标签文字，避免视觉名称和辅助技术名称不一致。

### HTML-10 明确表单数据与输入目的

`form` 的 `action`、`method` 和必要的 `enctype` 与服务端协议一致。需要提交的控件提供正确的 `name`；被禁用的控件、未选中的复选框等不会作为普通成功控件提交，服务端不能假定每个字段都存在。

按数据选择 `type`，按用户信息目的选择有效 `autocomplete` 标记。`inputmode` 只是输入方式提示，不能验证数据；邮箱语法检查也不能证明邮箱归属或可投递。GET 查询会进入 URL，涉及个人信息的表单不把 GET 当作默认选择；POST 本身也不提供加密。

## 6 校验与错误反馈

### HTML-11 先提供约束，再提供可纠正的反馈

对适用控件使用 `required`、`min`、`max`、`minlength`、`maxlength` 或 `pattern` 等表达真实约束。各属性的适用类型和具体校验条件不同；限制应与数据契约一致，不能用复杂正则阻拦无必要限制的姓名等文本。

错误说明指出字段、原因和纠正方式；多项错误可提供链接到字段的汇总。保留可安全回显的输入，用 `aria-invalid` 标记实际错误，关联文字说明。动态更新按需使用状态区域；避免每个键入事件都打断用户。原生验证提示与自定义反馈分别在实际浏览器中检查。

### HTML-12 把可信边界放在服务端

浏览器约束验证改善交互，但可被绕过；服务端仍须验证字段、类型、长度、允许值和业务权限。`hidden`、`disabled`、前端角色字段或隐藏按钮都不能作为授权依据。

**工程整理：** 校验按边界分工，已验证且未改变的数据不必在同一可信流程中反复验证。含写操作、身份会话或外部服务时再配置相应鉴权、CSRF 防护、超时和业务失败处理。预览页面必须诚实说明是否保存、发送或完成真实业务。

## 7 图片与条件性嵌入

### HTML-13 根据图片用途提供替代内容

有信息的图片提供简洁 `alt`，表达当前上下文中的用途；纯装饰或已被相邻文字完整替代的图片可用 `alt=""`。作为唯一链接或按钮内容的图片，应使控件名称表达功能。不要用文件名、固定“图片”字样或重复整段正文代替判断。

复杂图示在正文或关联说明中提供等价信息；`figure` 与 `figcaption` 可组织图示和题注，但题注并不自动替代 `alt`。尽量提供正确的尺寸或宽高比；确需不同分辨率或构图时再使用 `srcset`、`sizes` 或 `picture`。

### HTML-14 嵌入媒体时处理其独有条件

使用音视频时提供可操作的控制方式，并按媒体类型、是否预录、是否含有意义的音轨和目标 WCAG 等级提供字幕、转录或音频描述。字幕与文字转录并非在所有情况下互相替代；不把装饰静态页机械改成媒体演示。

使用 `iframe` 时提供说明用途的 `title`，评估来源、权限、`sandbox` 和 `referrerpolicy`；只开放需要的能力。沙箱标记组合有不同效果，不能把“有 sandbox 属性”当作安全保证；为受限或加载失败的嵌入提供可用的信息入口。

## 8 资源与渐进增强

### HTML-15 按实际部署位置组织资源

资源路径按文档基础 URL 解析，根相对路径会以站点根为起点；子目录部署需要单独验证。`base` 会影响许多相对 URL，不为修复个别路径随意加入。图片、样式、脚本和下载资源检查大小写、HTTP 状态与 MIME 类型。

**工程建议：** 仅交付实际使用的资源，避免把源码凭据、测试输出或内部文件作为静态目录公开。外部资源使用适合部署的安全协议，并记录来源与使用条件；需要离线或可重复演示时优先使用受项目控制的资源。

### HTML-16 让加载优化服务于功能

经典外部脚本的 `defer`、`async` 和模块脚本有不同的获取与执行顺序，按依赖关系选择；模块脚本默认延后执行，不把 `defer` 的说明套到所有脚本类型。按需延迟非关键图片与嵌入，不能把首屏关键图片机械设为懒加载。

**工程建议：** 内容页、链接和可由服务端处理的表单优先保留原生可用路径，再用脚本增强提示和体验。禁用脚本、资源失败或慢加载时验证主要信息与恢复入口；本质依赖脚本的应用应清楚说明条件，不能假称全面支持无脚本运行。

## 9 输出与数据安全

### HTML-17 按输出上下文处理不可信数据

显示普通文本时使用模板的自动转义或 DOM 的 `textContent` 等合适入口。HTML 文本、带引号属性、URL、CSS 与脚本上下文的编码规则不同；不能用一个字符串替换函数承诺覆盖所有位置。

确实允许富文本时使用维护中的 HTML 清理方案和明确允许范围，不用正则表达式“去掉 script”代替清理。动态 URL 还须验证允许的协议和目的地。CSP 可作为额外控制，但不能替代正确的输出处理。

### HTML-18 管理凭据和个人信息

浏览器收到的 HTML、隐藏字段、脚本、源码映射和静态配置都不能保存服务端秘密。密钥放在适当的服务端凭据系统；泄露后撤销或轮换，删除页面中的字面值不能使旧凭据失效。

**工程建议：** 只收集业务需要的数据，说明用途与保存行为。不要把密码、访问令牌、完整请求体或敏感个人信息直接记录到浏览器控制台、访问日志或错误页面。演示使用虚构数据；对用户呈现可操作的安全错误信息，内部诊断另按访问范围管理。

## 10 键盘、焦点与适配

### HTML-19 保持可操作的键盘路径

以 DOM 顺序提供合理的阅读与焦点顺序，保留清晰且不被内容完全遮挡的焦点提示。提供跳过重复导航的方式；通常避免正数 `tabindex` 和对无交互内容滥加 Tab 停靠点。

原生控件验证其常规键盘操作；自定义组件按其模式实现进入、移动、激活和退出。动态视图或错误反馈确需移动焦点时，明确目标和恢复位置，不在普通输入过程中随意抢夺焦点。

### HTML-20 允许缩放与内容重排

提供适合设备宽度的 viewport 声明，不用 `user-scalable=no` 或不必要的缩放上限阻止用户放大。HTML 阅读顺序在窄屏仍保持意义；CSS 不应把重要信息裁掉或仅靠悬停呈现。

以 WCAG 2.2 AA 为目标时，核对文本放大至 200% 的适用要求，以及竖向内容在等效 320 CSS 像素宽度下的重排要求；必要二维内容存在例外。对比度、控件目标尺寸和焦点样式需与 CSS 一起验证。窄视口测试有助于验证重排，但不能单独代替浏览器缩放及完整可访问性评估。

## 11 检查与可重复验证

### HTML-21 区分静态检查与实际行为

**工程整理：** HTML 校验器检查内容模型、属性和相关规则；格式化器统一排版；浏览器测试检查链接、控件、提交、资源和脚本错误。服务端模板还需检查实际输出的成功与错误页面，不能只校验占位模板。

可访问性自动检查只能发现部分问题。将自动扫描、键盘检查、视觉检查和需要时的辅助技术评估结合使用；axe 没有报告问题不等于达到完整 WCAG 符合性。

### HTML-22 测试关键路径与失败边界

**工程建议：** 表单覆盖有效提交、必填与格式错误、服务端拒绝、错误纠正和输出转义；渐进增强页面覆盖无脚本路径。内容页检查标题、标签关联、片段链接、展开控件、资源失败以及常见视口下的可用性。

测试使用独立浏览器上下文和虚构输入，控制服务器、时间和外部依赖，避免依赖执行顺序或真实注册服务。按用户可见角色、标签和内容定位元素；截图只是视觉证据，不能替代行为断言。清楚记录测试范围与未验证的平台。

## 12 交付与维护

### HTML-23 保持最小且可重复的工程入口

**工程建议：** README 说明工作目录、服务启动方式、依赖、检查命令、数据契约和成功标准。纯静态页面没有构建需求时不强加打包器；确有模板、测试或构建依赖时维护清单与锁文件，使用可重复安装入口。

长期维护且使用第三方模板、脚本或开发工具时，建议定期核查已知漏洞和安全公告，评估实际影响与修复兼容性。npm 依赖可用 `npm audit` 辅助检查，自动修复先审阅；更新后同步依赖清单与锁文件，并验证受影响的生成页面、交互和交付资源。

检查实际交付目录或归档中的页面和资源，不把安装成功当作运行通过。开发服务器公开路径限制在所需资源范围；项目内执行环境、缓存和测试产物不进入发布清单。未确定许可证时不擅自声明许可。

### HTML-24 管理浏览器兼容和内容演进

HTML Living Standard 持续演进；采用新元素、属性和交互 API 前核对目标浏览器与辅助技术。记录实际测试版本和日期，不把两个 Chromium 品牌的测试称为跨浏览器引擎验证。

**工程整理：** 页面片段 `id`、外部链接、表单字段名、提交端点与生成模板都是需要维护的契约。变更时同步服务端、测试和说明；面向外部用户的兼容性变化提供迁移说明。定期检查日期、活动信息、资源链接与依赖，演示功能的限制也随实现更新。

## 参考与引用来源

以下为写作前核查的第一方页面，定位支持上文对应条款；中文解释为选编和工程整理，保留来源条件，不表示来源统一强制了本文全部项目约定。

1. **HTML-01～04：** WHATWG [HTML syntax：DOCTYPE、元素、属性与可选标签](https://html.spec.whatwg.org/multipage/syntax.html#syntax)；[文档元数据与编码声明](https://html.spec.whatwg.org/multipage/semantics.html#semantics)；[`id`](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)；[布尔属性](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)。Google [HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)，仅选用 General Style Rules、HTML Formatting Rules 的常用风格，Optional Tags 不采用。
2. **HTML-05～06：** W3C WAI [页面结构](https://www.w3.org/WAI/tutorials/page-structure/)、[标题层级](https://www.w3.org/WAI/tutorials/page-structure/headings/#heading-ranks)、[表格关系](https://www.w3.org/WAI/tutorials/tables/)；WHATWG [分组内容：列表、main](https://html.spec.whatwg.org/multipage/grouping-content.html)、[文本级语义：强调、time](https://html.spec.whatwg.org/multipage/text-level-semantics.html)。
3. **HTML-07～08：** WHATWG [`a`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)、[链接类型与安全关系](https://html.spec.whatwg.org/multipage/links.html#linkTypes)、[`button`](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)、[`details` 与 `summary`](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)；W3C [ARIA APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/#no_aria_better_bad_aria)。
4. **HTML-09～12：** WHATWG [表单介绍与服务端处理](https://html.spec.whatwg.org/multipage/forms.html)、[输入类型与约束](https://html.spec.whatwg.org/multipage/input.html)、[表单基础：自动填充、验证和提交](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html)。WAI [标签](https://www.w3.org/WAI/tutorials/forms/labels/)、[分组](https://www.w3.org/WAI/tutorials/forms/grouping/)、[输入验证及客户端限制](https://www.w3.org/WAI/tutorials/forms/validation/)、[错误与成功反馈](https://www.w3.org/WAI/tutorials/forms/notifications/)。OWASP [授权：每个请求验证权限](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html#validate-the-permissions-on-every-request)、[CSRF 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)。
5. **HTML-13～16：** WAI [alt 决策树](https://www.w3.org/WAI/tutorials/images/decision-tree/)；WHATWG [`img`、响应式图片](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)、[媒体及文本轨道](https://html.spec.whatwg.org/multipage/media.html#the-track-element)、[`iframe` 和沙箱](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element)、[`base`](https://html.spec.whatwg.org/multipage/semantics.html#the-base-element)、[脚本处理](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)。
6. **HTML-17～18：** OWASP [XSS Prevention：各输出上下文、Safe Sinks 与 CSP 限制](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)、[日志排除数据](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude)、[凭据管理](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)。
7. **HTML-14、19～21：** W3C [WCAG 2.2](https://www.w3.org/TR/WCAG22/)，定位 1.2 媒体、1.3 结构、1.4.3 对比度、1.4.4 文本缩放、1.4.10 重排、2.1 键盘、2.4 焦点与导航、2.5.8 目标尺寸、3.3 输入辅助、4.1.3 状态消息及 Conformance Requirements；[Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) 的缩放与 viewport 示例。本文不是完整成功准则清单。
8. **HTML-21～24：** [HTML-validate 使用指南](https://html-validate.org/usage/index.html)；Playwright [可访问性测试及其限制](https://playwright.dev/docs/accessibility-testing)、[测试隔离](https://playwright.dev/docs/browser-contexts)、[浏览器渠道](https://playwright.dev/docs/browsers#google-chrome--microsoft-edge)；npm [`npm ci`](https://docs.npmjs.com/cli/v11/commands/npm-ci/)、[`npm audit`：Description 中的检查与修复限制](https://docs.npmjs.com/cli/v11/commands/npm-audit/#description)；OWASP [漏洞依赖管理：Context、Cases](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html#cases)。工程入口、依赖维护、覆盖策略和契约维护是结合上述机制的本文整理，不是 HTML 语法要求。
