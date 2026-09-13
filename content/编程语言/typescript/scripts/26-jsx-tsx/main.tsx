import assert from "node:assert/strict";
import { describe, type JSX, type Child } from "./runtime/jsx-runtime.js";
function Badge(props: { title: string; children?: Child }): JSX.Element {
  return <section><span tone="quiet">{props.title}</span>{props.children ?? "空"}</section>;
}
const view = <Badge title="Ada">ready</Badge>;
assert.equal(describe(view), "section(span(Ada),ready)");
console.log(describe(view)); // section(span(Ada),ready)：本例生成描述树。
