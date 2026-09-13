export {};

const wrongReturn: (value: number) => string = (value) => value; // 返回 number，不能满足 string 契约。

type NeedsConstructor = new () => { title: string };
const plainFunction: NeedsConstructor = () => ({ title: "函数" }); // 箭头函数没有构造签名。

function needsSecond(prefix = "课", title: string): string { return prefix + title; }
needsSecond("函数"); // 后面的 title 仍是必需参数。

function fixedCall(title: string, minutes: number): void {}
const loose = ["函数", 18];
fixedCall(...loose); // 普通联合元素数组没有确定的两个位置。
function optionalIndex(callback: (value: string, index?: number) => void): void { callback("TS"); }
optionalIndex((value, index) => { index.toFixed(); }); // index 可能未提供。

function pick(value: string): number;
function pick(value: number): string;
function pick(value: string | number): string | number { return typeof value === "string" ? value.length : value.toFixed(0); }
function callUnion(value: string | number): void { pick(value); } // 联合实参不匹配任一个公开重载。
function onlyOne(value: string): string;
function onlyOne(value?: string): string { return value ?? "默认"; }
onlyOne(); // 实现虽有可选参数，但公开重载要求一个参数。

function needsThis(this: { prefix: string }, title: string): string { return this.prefix + title; }
needsThis("函数"); // 普通调用没有满足要求的 this 接收者。
function explicitVoid(): void { return 1; } // 显式 void 实现不能返回 number。
const discard: () => void = () => 1;
const result: number = discard(); // 调用方看到 void，不能当作 number。
