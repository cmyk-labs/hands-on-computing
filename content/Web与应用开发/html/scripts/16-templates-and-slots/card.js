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
