# CSS 模块规划

主线 **22 个模块、22 个 .ipynb 文件**；选修 **4 个专题、4 个 .ipynb 文件**，全部展开共 **26 个文件**。每行对应一个 Notebook，主线按顺序学习，选修按需编写。

文件按“二位序号-模块名称.ipynb”命名，主线编号 01–22，选修编号 23–26，例如 `01-样式表与基本语法.ipynb`。

## 主线模块

| 模块 | 计划内容 |
| --- | --- |
| **[1. 样式表与基本语法](<01-样式表与基本语法.ipynb>)** | CSS 与 HTML 的关系、内联样式与内部及外部样式表、规则与声明、属性与值、简写属性、注释；@ 规则与描述符（descriptor）、@import、url() 与相对路径基准；浏览器默认样式、无效声明的处理、开发者工具查看和修改样式。 |
| **[2. 选择器](<02-选择器.ipynb>)** | 类型、类、ID、通配和属性选择器、组合器、选择器列表；状态与结构伪类、伪元素、:not()/:is()/:where()/:has()；匹配范围、交互状态和选择器失效。 |
| **[3. 层叠、优先级与继承](<03-层叠、优先级与继承.ipynb>)** | 基本层叠顺序、来源与重要性、选择器优先级（specificity）、声明顺序；继承、initial/inherit/unset/revert/revert-layer、!important；层叠层入门，追踪最终生效的声明；@scope 的作用域接近度在第 19 章展开。 |
| **[4. 值、单位与计算](<04-值、单位与计算.ipynb>)** | 数字、百分比、长度、角度和时间、关键字与函数；px/em/rem、视口单位、百分比的参照对象、calc()/min()/max()/clamp()；指定值、计算值与使用值的基本区别，单位选择与无效值。 |
| **[5. 盒模型与尺寸](<05-盒模型与尺寸.ipynb>)** | 内容、内边距、边框、外边距、box-sizing、外边距折叠；宽高与最小及最大尺寸、固有尺寸、min-content/max-content/fit-content、aspect-ratio、替换元素与 object-fit/object-position。 |
| **[6. 正常流与溢出](<06-正常流与溢出.ipynb>)** | 块级与行内布局、display、正常流、块级格式化上下文（BFC）、flow-root；float/clear 与文字环绕、overflow、滚动容器、内容裁剪；隐藏方式对布局和可访问性的影响。 |
| **[7. 颜色、背景与装饰](<07-颜色、背景与装饰.ipynb>)** | 颜色表示、透明度、currentColor、RGB/HSL 与现代颜色空间；背景图片、多重背景、渐变、边框、圆角、阴影；color-mix()、颜色对比度和兼容回退。 |
| **[8. 字体与文本排版](<08-字体与文本排版.ipynb>)** | 字体族与回退、字重字号、line-height、文本对齐和装饰、字词间距、空白与换行、断词和溢出省略；@font-face 及其 src、font-display 等描述符，字体加载与可变字体基础。 |
| **[9. 列表、表格与表单样式](<09-列表、表格与表单样式.ipynb>)** | 列表标记、::marker、计数器与生成内容；表格边框和布局；表单控件的 appearance、accent-color、尺寸与状态样式；链接与焦点样式、保留原生操作能力。 |
| **[10. 定位与层叠上下文](<10-定位与层叠上下文.ipynb>)** | static/relative/absolute/fixed/sticky、包含块、偏移与 inset；z-index、层叠上下文、顶层（top layer）；定位参照、粘性定位失效与遮挡问题。 |
| **[11. Flexbox 布局](<11-Flexbox 布局.ipynb>)** | 容器与项目、主轴与交叉轴、方向与换行、对齐与间距、flex-basis、flex-grow、flex-shrink、自动外边距和最小尺寸；导航、居中和弹性列表，视觉顺序与阅读顺序。 |
| **[12. Grid 布局](<12-Grid 布局.ipynb>)** | 网格线、轨道与区域、显式与隐式网格、fr/repeat()/minmax()、自动放置、auto-fill/auto-fit、对齐与重叠、subgrid；页面网格与组件网格，Grid 与 Flexbox 的配合。 |
| **[13. 响应式设计与媒体查询](<13-响应式设计与媒体查询.ipynb>)** | 流式布局、断点、移动优先、@media、查询组合与范围语法；视口、分辨率、hover/pointer、用户偏好；响应式图像的 CSS 尺寸、缩放和窄屏溢出检查。 |
| **[14. 容器查询](<14-容器查询.ipynb>)** | container-type/container-name、@container、尺寸查询与容器单位、嵌套容器；卡片随可用空间调整布局；与媒体查询的区别，了解样式查询及其支持范围。 |
| **[15. 逻辑属性与书写模式](<15-逻辑属性与书写模式.ipynb>)** | inline/block 方向、writing-mode、direction、逻辑尺寸、逻辑边距和偏移；横排、竖排与从右向左书写，物理属性与逻辑属性混用的影响。 |
| **[16. 自定义属性与主题](<16-自定义属性与主题.ipynb>)** | 自定义属性、var() 与回退、继承及作用域、计算值阶段的无效值、@property；颜色和间距复用、明暗主题、prefers-color-scheme 与 color-scheme。 |
| **[17. 变换与过渡](<17-变换与过渡.ipynb>)** | translate/rotate/scale、transform-origin、变换顺序、二维与三维变换、透视；transition、缓动、延迟、可动画属性和中断；了解离散过渡与 @starting-style 的支持条件。 |
| **[18. 关键帧动画](<18-关键帧动画.ipynb>)** | @keyframes、animation、播放方向、重复次数、填充模式、暂停与多动画；状态切换、动画对布局的影响、prefers-reduced-motion 和减少不必要的动画。 |
| **[19. 样式组织与作用域](<19-样式组织与作用域.ipynb>)** | 按基础、组件和页面组织样式，类名约定、状态样式、样式重置的取舍；@layer、原生嵌套与 &、@scope、作用域接近度（scoping proximity）；降低选择器耦合、控制覆盖顺序和复用边界。 |
| **[20. 调试与兼容处理](<20-调试与兼容处理.ipynb>)** | 匹配规则、计算样式、盒模型、Flex/Grid 调试工具；@supports、浏览器支持表、渐进增强、回退样式、厂商前缀与废弃写法；不同视口、缩放和键盘状态下的检查。 |
| **[21. 渲染与性能](<21-渲染与性能.ipynb>)** | 样式计算、布局、绘制与合成的基本关系；字体和样式资源、布局偏移、动画测量、contain/content-visibility；用浏览器性能工具比较修改前后的真实效果。 |
| **[22. 响应式页面实践](<22-响应式页面实践.ipynb>)** | 为 HTML 内容页、目录页和表单页设计统一样式；组合 Flexbox、Grid、媒体与容器查询、主题和交互状态；检查窄屏、长内容、文字缩放、键盘焦点、对比度及浏览器兼容。 |

## 选修专题

| 模块 | 计划内容 |
| --- | --- |
| **[23. 多列布局与打印分页](<23-多列布局与打印分页.ipynb>)** | 多列布局、列宽与列数、跨列内容、分片与换页控制；打印媒体查询、@page、页边距与打印预览；屏幕布局和分页输出的差异。 |
| **[24. 滤镜、裁剪与蒙版](<24-滤镜、裁剪与蒙版.ipynb>)** | filter/backdrop-filter、clip-path、mask、混合模式、shape-outside；视觉效果、文字环绕、资源引用与性能，以及效果失效时的可用性。 |
| **[25. 锚点定位](<25-锚点定位.ipynb>)** | anchor-name、position-anchor、anchor()/anchor-size()、位置回退与溢出处理；提示框及浮层布局，与普通定位、popover 和顶层的关系。 |
| **[26. 滚动吸附与滚动驱动动画](<26-滚动吸附与滚动驱动动画.ipynb>)** | 滚动吸附（CSS Scroll Snap）、scroll-snap-type、scroll-snap-align、scroll-snap-stop、scroll-padding/scroll-margin、overscroll-behavior；滚动进度与视图进度时间线、动画范围；键盘滚动、减少动画偏好和兼容回退。 |

前置知识为 HTML 元素、属性、文档结构与资源路径。CSS 按规范模块核查，不用“CSS3”代表全部现代 CSS；正文分别注明规范状态与浏览器支持。HTML 讲结构，CSS 讲呈现，同一元素再次出现时用一句话说明侧重点。正式内容归入 `content/Web与应用开发/css/`。

Notebook 的写法与浏览器检查遵循本目录 [AGENTS.md](AGENTS.md)。必需的页面、样式及资源按需放在 `scripts/章节/` 下，例如 `scripts/01-stylesheets-and-syntax/`，头部列明位置与用途；工程注意随对应知识点讲解。

教学参考：MDN 的 [CSS 基础](https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/)、[文本样式](https://developer.mozilla.org/en-US/curriculum/core/css-text-styling/)和 [CSS 布局](https://developer.mozilla.org/en-US/curriculum/core/css-layout/)课程。知识依据：[W3C CSS 规范目录](https://www.w3.org/Style/CSS/specs.en.html)及其对应模块；容器查询、层叠、嵌套、作用域、动画等进阶主题参考 [MDN CSS 模块指南](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides)，渲染隔离参考 [CSS containment](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment)。本表按学习关系组织主题，不是原教程目录的逐项翻译，也不代替完整属性参考；正文写作前仍须逐点核查具体来源。
