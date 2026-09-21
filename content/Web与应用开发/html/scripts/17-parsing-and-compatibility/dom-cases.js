// 所属章节：17-HTML 解析与兼容
// 演示知识点：三组固定解析用例：li 结束标签与 tbody 的合法省略、段落结束后多余结束标签的恢复
// 运行命令：python scripts/17-parsing-and-compatibility/preview_server.py（工作目录 content/Web与应用开发/html）；随 dom.html 加载，浏览器打开 http://127.0.0.1:8017/dom.html
// 期望结果：三项“符合预期”均为 true，第三例恢复出两个同级 p 且 div 不是第一个 p 的子元素
const cases = [
  {
    name: "合法省略 li 结束标签",
    source: "<ul><li>阅读<li>整理</ul>",
    expected: "<ul><li>阅读</li><li>整理</li></ul>"
  },
  {
    name: "合法省略 tbody 标签",
    source: "<table><tr><td>周六</td></tr></table>",
    expected: "<table><tbody><tr><td>周六</td></tr></tbody></table>"
  },
  {
    name: "段落结束后，多余结束标签触发恢复",
    source: "<p>开头<div>独立内容</div>结尾</p>",
    expected: "<p>开头</p><div>独立内容</div>结尾<p></p>"
  }
];
const reports = [];
for (const sample of cases) {
  const source = "<!doctype html><title>解析样本</title>" + sample.source;
  const parsed = new DOMParser().parseFromString(source, "text/html");
  const actual = parsed.body.innerHTML;
  const matches = actual === sample.expected;
  reports.push(
    sample.name + "\n源码：" + sample.source +
    "\n实际 DOM：" + actual + "\n符合预期：" + matches
  );
  // 预期：三项均为 true；若为 false，保留实际结果并核对输入与浏览器。
  console.assert(matches, sample.name, actual);
}
document.querySelector("#cases").textContent = reports.join("\n\n");
// 第三例应能找到两个同级 p，最后一个为空；div 不是第一个 p 的子元素。
// 与表格相关的观察仅针对 HTML 解析，不能据此推断脚本手工创建的树。
