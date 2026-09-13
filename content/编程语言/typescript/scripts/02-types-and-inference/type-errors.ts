let inferredCount = 1;
inferredCount = "1"; // TS2322：推断为 number 后不能再赋 string

console.log(number); // TS2693：number 是类型，不能作为这里的运行时值

const uniqueToken: unique symbol = Symbol("token");
const differentToken: typeof uniqueToken = Symbol("token"); // TS2322：另一个符号不具有同一身份

const strictNumber: number = null; // TS2322：strict 下 number 不包含 null

const unchecked: unknown = "text";
unchecked.toUpperCase(); // TS18046：尚未确认 unknown 的具体类型

const impossible: never = 1; // TS2322：数值不能赋给 never

const onlyObject: object = 1; // TS2322：object 不接受原始值
const capitalObject: Object = null; // TS2322：这里不允许 null
const notNullish: {} = undefined; // TS2322：这里不允许 undefined

const primitiveText: string = new String("x"); // TS2322：包装对象不是原始字符串

["Ada"].forEach((name) => {
  name.toFixed(2); // TS2551：name 被推断为 string，没有数值方法 toFixed
});
