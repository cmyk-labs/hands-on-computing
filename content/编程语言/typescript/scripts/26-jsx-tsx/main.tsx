// 所属章节：26-JSX 与 TSX
// 演示知识点：TSX 组件、自动运行时转换与描述树断言
// 运行命令：npm run run:26（工作目录 content/编程语言/typescript）
// 期望结果：输出 section(span(Ada),ready)
import assert from "node:assert/strict";
import { describe, type JSX, type Child } from "./runtime/jsx-runtime.js";
function Badge(props: { title: string; children?: Child }): JSX.Element {
  return <section><span tone="quiet">{props.title}</span>{props.children ?? "空"}</section>;
}
const view = <Badge title="Ada">ready</Badge>;
assert.equal(describe(view), "section(span(Ada),ready)");
console.log(describe(view)); // section(span(Ada),ready)：本例生成描述树。
