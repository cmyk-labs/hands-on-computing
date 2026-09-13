import { greet, type GreetingOptions } from "notebook-greeting-ts-c";
import { greet as plain } from "notebook-greeting-ts-c/plain";
const options: GreetingOptions = { prefix: "欢迎" };
const result: string = greet("读者", options);
if (result !== "欢迎，读者" || plain("读者") !== "你好，读者") throw new Error("ESM result");
console.log("ESM installed OK", result);
