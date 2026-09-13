"use strict";

const noteTemplate = document.querySelector("#note-template");
const notes = document.querySelector("#notes");
const templateStatus = document.querySelector("#template-status");
let noteCount = 0;

function showTemplateStatus(message) {
  templateStatus.textContent = [
    message,
    "template 的普通子节点数：" + noteTemplate.childNodes.length,
    "template.content 的顶层元素数：" + noteTemplate.content.childElementCount,
    "页面卡片数：" + notes.childElementCount,
    "模板当前说明：" + noteTemplate.content.querySelector("p").textContent,
  ].join("\n");
}

document.querySelector("#add-note").addEventListener("click", () => {
  // true 表示连同后代深克隆；此例模板只含原生元素。
  const fragment = noteTemplate.content.cloneNode(true);
  const card = fragment.querySelector("article");
  noteCount += 1;
  card.querySelector("h2").textContent = "练习笔记 " + noteCount;

  // 通过 addEventListener 添加的监听器不会随 cloneNode 复制，故在副本上绑定。
  const finishButton = card.querySelector("button");
  finishButton.addEventListener("click", () => {
    finishButton.textContent = "已完成";
    finishButton.disabled = true;
  });

  notes.appendChild(fragment);
  // 预期：副本片段变空，但模板 content 仍有一个 article，可继续克隆。
  showTemplateStatus("插入后副本片段的子节点数：" + fragment.childNodes.length);
});

document.querySelector("#change-template").addEventListener("click", () => {
  noteTemplate.content.querySelector("p").textContent = "第二版阅读目标";
  showTemplateStatus("已修改模板；请对比旧卡片与下一次添加的卡片。");
});

showTemplateStatus("尚未实例化模板。");
// 检查：初始计数为 0、1、0；添加两次后为 0、1、2，副本片段为 0。
// 点击第一张卡片的“标记完成”，第二张按钮应保持不变；刷新恢复初始状态。
