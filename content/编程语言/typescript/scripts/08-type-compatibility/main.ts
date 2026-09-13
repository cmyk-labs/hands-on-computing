export {};
type Named = { title: string };
type Timed = { title: string; minutes: number };
const detailed: Timed = { title: "兼容性", minutes: 20 };
const named: Named = detailed;
function readTitle(value: Named): string { return value.title; }
console.log(readTitle(detailed), "minutes" in named); // 兼容性 true

const full = { title: "笔记", author: "林" };
const titleView: Named = full;
console.log(titleView.title); // 笔记

const general = (value: string | number): string => String(value);
const textOnly: (value: string) => string = general;
const produceDetailed = (): Timed => ({ title: "函数", minutes: 12 });
const produceNamed: () => Named = produceDetailed;
console.log(textOnly("TS"), produceNamed().title); // TS 函数

const useFirst = (value: number): string => String(value);
const twoInputs: (value: number, label: string) => string = useFirst;
const optional = (value?: number): string => String(value ?? 0);
const required: (value: number) => string = optional;
const rest = (...values: number[]): string => values.join(",");
const acceptsPair: (left: number, right: number) => string = rest;
console.log(twoInputs(7, "忽略"), required(0), acceptsPair(1, 2)); // 7 0 1,2

interface MethodView { handle(value: string | number): string; }
const specialized = { handle(value: string): string { return value.toUpperCase(); } };
const methodView: MethodView = specialized;
console.log(methodView.handle("ts")); // TS
