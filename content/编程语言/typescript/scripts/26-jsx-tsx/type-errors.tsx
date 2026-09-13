import type { JSX, Child } from "./runtime/jsx-runtime.js";
function Badge(props: { title: string; children?: string }): JSX.Element {
  return <span>{props.title}</span>;
}
const missing = <Badge />; // TS2741：缺 title。
const invalid = <span tone="bright" />; // TS2322：属性字面量不匹配。
const children = <Badge title="a"><span /></Badge>; // TS2322：children 要求 string。
const unknown = <unknownTag />; // TS2339、TS2786：未声明的内置标签。
function Bad() { return 42; }
const returnType = <Bad />; // TS2786：返回 number 不满足 ElementType 的 View 返回要求。
function Empty() { return null; }
const empty = <Empty />; // TS2786：返回 null 不满足 View 返回要求。
class ClassView { tag = "span"; children: Child[] = []; }
const classView = <ClassView />; // TS2786：类只有构造签名，不满足本例的调用签名。
