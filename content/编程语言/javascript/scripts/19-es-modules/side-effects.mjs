console.log("入口主体");
import { first } from "./first-client.mjs";
import { second } from "./second-client.mjs";
console.log(first + second);

// 按本例输入运行，输出依次为：
// 注册模块
// 入口主体
// 甲乙
