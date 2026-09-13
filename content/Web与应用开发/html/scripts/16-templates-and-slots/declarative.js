"use strict";

const openHost = document.querySelector("#open-host");
const closedHost = document.querySelector("#closed-host");
const supportsDeclarative = "shadowRootMode" in HTMLTemplateElement.prototype;

// 在 DOM 创建后设置属性，不会触发声明式影子根解析。
const lateTemplate = document.createElement("template");
const lateText = document.createElement("p");
lateText.textContent = "这段仍留在普通 template.content 中。";
lateTemplate.content.appendChild(lateText);
lateTemplate.setAttribute("shadowrootmode", "open");
const lateHost = document.querySelector("#late-host");
lateHost.appendChild(lateTemplate);

document.querySelector("#declarative-status").textContent = [
  "支持 shadowRootMode 属性：" + supportsDeclarative,
  "open 宿主可读取 shadowRoot：" + (openHost.shadowRoot !== null),
  "closed 宿主读取 shadowRoot 为 null：" + (closedHost.shadowRoot === null),
  "open 宿主剩余 template 数：" + openHost.querySelectorAll("template").length,
  "closed 宿主剩余 template 数：" + closedHost.querySelectorAll("template").length,
  "动态模板仍是普通 template：" + (lateTemplate.parentNode === lateHost),
  "动态宿主的 shadowRoot 为 null：" + (lateHost.shadowRoot === null),
  supportsDeclarative ? "请同时观察两段内部说明是否显示。" : "本浏览器未提供该属性，请核对兼容性。",
].join("\n");

// 支持时预期：true、true、true、0、0、true、true。
// closed.shadowRoot 为 null 本身不能证明没有影子根，要结合已解析标记与可见内容。
// 检查无脚本显示：在页面副本移除 head 中的 script 引用，再刷新副本。
// 刷新页面即可重置动态模板；本章静态预览服务由终端管理。
