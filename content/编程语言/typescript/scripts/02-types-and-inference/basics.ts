let count = 1; // 推断为 number
const courseName = "TypeScript"; // 推断为字符串字面量类型 "TypeScript"
let title: string = "课程";
let completed: boolean = false;
let largeCount: bigint = 12n;
console.log(count, courseName, title, completed, largeCount); // 1 TypeScript 课程 false 12n

const amount: number = 3;
console.log(amount, typeof amount); // 3 number：这里的 typeof 是 JavaScript 运行时运算符

const token: unique symbol = Symbol("token");
const sameToken: typeof token = token; // 类型位置的 typeof 取得 token 的静态类型
let generalToken: symbol = token;
console.log(sameToken === token, typeof generalToken); // true symbol

let absent: null = null;
let notSet: undefined = undefined;
let nickname: string | null = null; // | 表示联合：这里允许字符串或 null
nickname = "小林";
console.log(absent, notSet, nickname); // null undefined 小林

const externalValue: unknown = "course";
if (typeof externalValue === "string") {
  // 分支内已确认是字符串，可以使用字符串方法。
  console.log(externalValue.toUpperCase()); // COURSE
}

function announce(message: string): void {
  console.log(message);
}
announce("已保存"); // 已保存

function fail(message: string): never {
  throw new Error(message); // 函数没有正常返回的路径；本正常示例不调用它
}

let objectValue: object = { score: 80 };
objectValue = [1, 2]; // 数组也是对象
let broadObject: Object = 1;
broadObject = "文本"; // Object 也允许这里的数值和字符串
let nonNullValue: {} = 0;
nonNullValue = false; // {} 不表示“只能是空对象”
console.log(Array.isArray(objectValue), broadObject, nonNullValue); // true 文本 false

const names = ["Ada", "Lin"]; // 推断为 string[]，即字符串数组
names.forEach((name) => {
  // forEach 为每个元素调用回调；name 从调用位置推断为 string。
  console.log(name.toUpperCase()); // 依次输出 ADA、LIN
});
