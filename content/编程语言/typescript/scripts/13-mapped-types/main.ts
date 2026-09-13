export type Flags<T> = { [P in keyof T]: boolean };
type Form = { title: string; hours: number };
const flags: Flags<Form> = { title: true, hours: false };
console.log(flags.title, flags.hours);
// 预期输出：true false

export type Copy<T> = { [P in keyof T]: T[P] };
type Source = { readonly id: number; note?: string };
const copied: Copy<Source> = { id: 7 };
type ExactFlags = { [P in "name" | "count"]: boolean };
type OpenFlags = { [key: string]: boolean };
const exact: ExactFlags = { name: true, count: false };
const open: OpenFlags = {};
console.log(copied.id, copied.note, exact.name, Object.keys(open).length);
// 预期输出：7 undefined true 0

export type Locked<T> = { readonly [P in keyof T]: T[P] };
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
const locked: Locked<{ nested: { count: number } }> = { nested: { count: 1 } };
locked.nested.count += 1;
const editable: Mutable<Source> = { id: 7 };
editable.id = 8;
console.log(locked.nested.count, editable.id);
// 预期输出：2 8

export type Optional<T> = { [P in keyof T]?: T[P] };
export type Complete<T> = { [P in keyof T]-?: T[P] };
const patch: Optional<Form> = { title: "新标题" };
const complete: Complete<{ note?: string }> = { note: "已填" };
const explicit: Complete<{ note?: string | undefined }> = { note: undefined };
console.log(patch.title, complete.note, explicit.note);
// 预期输出：新标题 已填 undefined

type Names = { title: "caption"; hours: "duration" };
type Renamed<T extends { title: unknown; hours: unknown }> = {
  [P in keyof Names as Names[P]]: T[P]
};
const renamed: Renamed<Form> = { caption: "映射", duration: 2 };
type Rename = { id: never; title: "title" };
type Stored = { id: number; title: string };
export type PublicStored = { [P in keyof Stored as Rename[P]]: Stored[P] };
const publicValue: PublicStored = { title: "可见" };
console.log(renamed.caption, renamed.duration, publicValue.title);
// 预期输出：映射 2 可见
