// 所属章节：26-JSX 与 TSX
// 演示知识点：JSX 命名空间声明、IntrinsicElements 与 jsx/jsxs 最小实现
// 运行命令：npm run run:26（工作目录 content/编程语言/typescript）
// 期望结果：主入口输出 section(span(Ada),ready) 描述树
export interface View { tag: string; children: Child[] }
export type Child = View | string;
export namespace JSX {
  export type ElementType = keyof IntrinsicElements | ((props: never) => View);
  export interface Element extends View {}
  export interface ElementChildrenAttribute { children: {} }
  export interface IntrinsicElements {
    section: { children?: Child | Child[] };
    span: { tone?: "quiet" | "loud"; children?: Child | Child[] };
  }
}
export function jsx<P extends { children?: Child | Child[] }>(
  tag: string | ((props: P) => View), props: P
): View {
  if (typeof tag === "function") return tag(props);
  const children = props.children;
  return { tag, children: children === undefined ? [] : Array.isArray(children) ? children : [children] };
}
export const jsxs = jsx;
export function describe(view: View): string {
  return view.tag + "(" + view.children.map(child => typeof child === "string" ? child : describe(child)).join(",") + ")";
}
