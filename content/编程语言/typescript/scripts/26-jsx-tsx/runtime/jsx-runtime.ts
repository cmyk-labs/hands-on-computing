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
