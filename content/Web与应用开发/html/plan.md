# HTML 模块规划

主线 **14 个模块、14 个 .ipynb 文件**；选修 **3 个专题、3 个 .ipynb 文件**，全部展开共 **17 个文件**。每行对应一个 Notebook，主线按顺序学习，选修按需编写。

文件按“二位序号-模块名称.ipynb”命名，主线编号 01–14，选修编号 15–17，例如 `01-页面运行与代码书写.ipynb`。

## 主线模块

| 模块 | 计划内容 |
| --- | --- |
| **[1. 页面运行与代码书写](<01-页面运行与代码书写.ipynb>)** | HTML、CSS 与 JavaScript 的分工；编辑和保存 HTML 文件、浏览器打开页面、本地 HTTP 服务、开发者工具、查看源代码与元素树、基本错误定位。 |
| **[2. 语法与文档结构](<02-语法与文档结构.ipynb>)** | 元素与标签、属性、布尔属性、空元素、嵌套与内容模型、注释、字符引用；DOCTYPE、&lt;html&gt;、&lt;head&gt;、&lt;body&gt;；lang、id、class、data-* 等全局属性。 |
| **[3. 元数据与资源引入](<03-元数据与资源引入.ipynb>)** | &lt;title&gt;、&lt;meta&gt; 与字符编码、页面描述及 viewport；&lt;link&gt; 与网站图标、&lt;style&gt; 与外部样式表、&lt;script&gt;、&lt;noscript&gt;；普通脚本、defer、async、模块脚本的加载与执行差异。 |
| **[4. 文本与列表](<04-文本与列表.ipynb>)** | 段落、换行与主题分隔、强调与重要性、引用、缩写、代码与预格式化文本、上下标、时间、编辑标记、&lt;ruby&gt;；有序列表、无序列表、描述列表和嵌套列表。 |
| **[5. 语义化页面结构](<05-语义化页面结构.ipynb>)** | 标题层级、&lt;header&gt;、&lt;nav&gt;、&lt;main&gt;、&lt;article&gt;、&lt;section&gt;、&lt;aside&gt;、&lt;footer&gt;、&lt;div&gt;、&lt;span&gt; 的用途；页面区域、独立内容与主题分节的选择，语义与视觉样式的关系。 |
| **[6. 链接与 URL](<06-链接与 URL.ipynb>)** | 超链接、片段定位、相对与绝对 URL、路径与查询参数、邮件和电话链接、下载链接；target、rel 属性与 &lt;base&gt; 的影响；链接文本、文件名大小写、资源路径与失效链接。 |
| **[7. 图像与响应式图像](<07-图像与响应式图像.ipynb>)** | &lt;img&gt;、&lt;figure&gt;、&lt;figcaption&gt;；替代文本 alt、宽高与加载策略；srcset、sizes 与 &lt;picture&gt;、分辨率选择、art direction（按布局切换图片构图），图像格式选择和资源体积。 |
| **[8. 音视频与嵌入内容](<08-音视频与嵌入内容.ipynb>)** | &lt;audio&gt;、&lt;video&gt;、&lt;source&gt;、&lt;track&gt; 与字幕；controls、poster、预加载、自动播放限制；&lt;iframe&gt; 的 title、loading、sandbox、allow 属性，嵌入来源与权限边界；了解 &lt;object&gt;、&lt;embed&gt; 的用途。 |
| **[9. 数据表格](<09-数据表格.ipynb>)** | &lt;table&gt;、&lt;caption&gt;、&lt;thead&gt;、&lt;tbody&gt;、&lt;tfoot&gt;、&lt;tr&gt;、&lt;th&gt;、&lt;td&gt;、&lt;colgroup&gt;、&lt;col&gt;；scope 属性、跨行跨列、复杂表头关联；数据表格的可访问性，表格与页面布局的区别。 |
| **[10. 表单结构与控件](<10-表单结构与控件.ipynb>)** | &lt;form&gt;、&lt;label&gt;、&lt;fieldset&gt;、&lt;legend&gt;；name、value 属性及 &lt;button&gt; 的类型；常用 &lt;input&gt; 类型、&lt;textarea&gt;、&lt;select&gt;、&lt;option&gt;、&lt;datalist&gt;、&lt;output&gt;、&lt;meter&gt;、&lt;progress&gt;；分组、默认值、disabled 与 readonly。 |
| **[11. 表单提交与原生校验](<11-表单提交与原生校验.ipynb>)** | action/method/enctype、GET 与 POST、提交按钮与提交数据、文件上传；required、min/max/step、长度限制、pattern、autocomplete/inputmode；未提交控件、浏览器差异、客户端校验与服务端校验的边界。 |
| **[12. 原生交互元素](<12-原生交互元素.ipynb>)** | &lt;details&gt;、&lt;summary&gt;、&lt;dialog&gt; 与 popover 属性；展开与关闭、模态与非模态、焦点与键盘操作、hidden、inert；优先演示声明式写法，必要的脚本调用说明其浏览器 API 身份。 |
| **[13. 可访问性与 HTML 检查](<13-可访问性与 HTML 检查.ipynb>)** | 可访问名称、页面语言、阅读与焦点顺序、键盘访问、tabindex；原生语义与 ARIA 的使用边界；HTML 校验、重复 id、嵌套错误、资源加载检查，以及自动检查的局限。 |
| **[14. 多页面网站实践](<14-多页面网站实践.ipynb>)** | 制作内容页、目录页和表单页；组合语义结构、导航、图片、表格与表单，组织相对路径；检查链接、表单提交数据、键盘操作和不同浏览器表现。 |

## 选修专题

| 模块 | 计划内容 |
| --- | --- |
| **[15. SVG 与 MathML 嵌入](<15-SVG 与 MathML 嵌入.ipynb>)** | SVG、MathML 与 HTML 的关系；内联与外部 SVG、viewBox、基本图形、图形标题与描述、基础数学标记；只讲页面集成，不展开完整绘图和公式排版课程。 |
| **[16. 模板与插槽](<16-模板与插槽.ipynb>)** | &lt;template&gt;、&lt;slot&gt;、声明式 Shadow DOM、内容分发；模板与实际渲染内容的区别，与自定义元素的配合；需要 JavaScript 基础，完整 Web Components 开发留在 Web 应用专题。 |
| **[17. HTML 解析与兼容](<17-HTML 解析与兼容.ipynb>)** | HTML 解析与元素树构建、隐式标签与错误恢复、空白处理、HTML 与 XML 语法差异、标准模式与怪异模式；阅读旧式标记、识别废弃特性和迁移方向。 |

以 WHATWG HTML Living Standard 为依据，具体特性注明浏览器支持条件。HTML 负责内容结构与语义，CSS 负责样式；脚本加载属于 HTML，脚本语法在 JavaScript 课程展开。正式内容归入 `content/Web与应用开发/html/`。

Notebook 保留讲解与实验步骤，页面示例在真实浏览器中查看和操作。必需的页面及资源按需放在 `scripts/章节/` 下，例如 `scripts/01-pages-and-code/`，头部列明位置与用途；易错点随对应知识点讲解。

教学参考：[MDN 语义化 HTML 课程](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/)、[MDN 表单教程](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)。知识依据：[WHATWG HTML 标准](https://html.spec.whatwg.org/multipage/)中的元素语义、交互、解析和过时特性章节，以及 [W3C WAI 页面结构教程](https://www.w3.org/WAI/tutorials/page-structure/)；图像、模板与插槽参考 MDN 的[响应式图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Responsive_images)和[模板与插槽](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)指南。本表按学习关系组织主题，不是原教程目录的逐项翻译，也不代替完整元素与属性参考；正文写作前仍须逐点核查具体来源。
