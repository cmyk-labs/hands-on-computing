import greeting = require("notebook-greeting-ts-c");
const result: string = greeting.greet("读者");
if (result !== "你好，读者") throw new Error("CJS result");
console.log("CJS installed OK", result);
