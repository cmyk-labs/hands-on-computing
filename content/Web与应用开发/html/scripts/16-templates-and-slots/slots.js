"use strict";

// card.js 先按 defer 脚本的文档顺序注册元素，此处才查询它们的影子根。
const firstCard = document.querySelector("#first-card");
const titleNode = document.querySelector("#provided-title");
const bodyNode = document.querySelector("#provided-body");
const outside = document.querySelector("#outside");
const titleSlot = firstCard.shadowRoot.querySelector('slot[name="title"]');
const defaultSlot = firstCard.shadowRoot.querySelector("slot:not([name])");
const emptySlot = document.querySelector("#empty-card").shadowRoot.querySelector("slot:not([name])");
const spaceSlot = document.querySelector("#space-card").shadowRoot.querySelector("slot:not([name])");
let slotChanges = 0;

function showSlotStatus() {
  document.querySelector("#slot-status").textContent = [
    "标题的 DOM 父节点仍是 first-card：" + (titleNode.parentNode === firstCard),
    "标题分配到 title 插槽：" + (titleNode.assignedSlot === titleSlot),
    "title 插槽分配的节点数：" + titleSlot.assignedNodes().length,
    "回退标题仍在 slot 的 DOM 内容里：" + titleSlot.textContent.trim(),
    "正文的 DOM 父节点：" + bodyNode.parentNode.id,
    "正文分配到默认插槽：" + (bodyNode.assignedSlot === defaultSlot),
    "missing 节点未分配：" + (document.querySelector("#unmatched").assignedSlot === null),
    "空宿主默认插槽节点数：" + emptySlot.assignedNodes().length,
    "空格宿主默认插槽节点数：" + spaceSlot.assignedNodes().length,
    "收到的 slotchange 次数：" + slotChanges,
  ].join("\n");
}

for (const slot of firstCard.shadowRoot.querySelectorAll("slot")) {
  slot.addEventListener("slotchange", () => {
    slotChanges += 1;
    showSlotStatus();
  });
}

document.querySelector("#toggle-title").addEventListener("click", () => {
  titleNode.slot = titleNode.slot === "title" ? "missing" : "title";
  showSlotStatus();
});

document.querySelector("#edit-detail").addEventListener("click", () => {
  document.querySelector("#detail").textContent = "（已修订）";
  showSlotStatus();
  // 预期：已分配的 p 没被替换，只改其后代文字，slotchange 计数不增加。
});

document.querySelector("#move-body").addEventListener("click", () => {
  if (bodyNode.parentNode === firstCard) {
    outside.appendChild(bodyNode);
  } else {
    firstCard.appendChild(bodyNode);
  }
  showSlotStatus();
  // 这里实际移动同一个 p，parentNode 在 first-card/outside 间改变。
});

showSlotStatus();
// 检查：等首次加载稳定再记下事件次数，不假定初始次数一定为 0。
// 改 slot 后等页面更新再读计数；parentNode 不变，assignedSlot 变为 null。
// 本例只用 open 影子根判断分配；closed 模式也可让 assignedSlot 返回 null。
