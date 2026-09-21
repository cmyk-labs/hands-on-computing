// 所属章节：16-模板与插槽
// 演示知识点：自定义元素 StudyCard：attachShadow 建立开放影子根并用 importNode 克隆模板内容
// 运行命令：python -m http.server 8016 --bind 127.0.0.1（工作目录 content/Web与应用开发/html）；随 slots.html 加载，浏览器打开 http://127.0.0.1:8016/scripts/16-templates-and-slots/slots.html
// 期望结果：三个 study-card 各有独立 #shadow-root (open)，页面选择器查不到影子树内部标题
"use strict";

// 这个类只连接“自定义标签—影子根—模板”，不承担完整组件生命周期教学。
class StudyCard extends HTMLElement {
  constructor() {
    super();
    const template = document.querySelector("#card-template");
    const shadow = this.attachShadow({ mode: "open" });
    // importNode 在当前 document 的上下文中深克隆模板内容。
    // 构造器只初始化影子树，不读取或改写宿主的 light DOM 子节点。
    shadow.appendChild(document.importNode(template.content, true));
  }
}

customElements.define("study-card", StudyCard);
// 检查：三个 study-card 各有一个独立的 #shadow-root (open)。
// document.querySelector("study-card h2") 找不到内部标题，须从 shadowRoot 查询。
