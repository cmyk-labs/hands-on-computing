import * as api from "./public-api.mjs";
console.log(Object.keys(api).join(","));
console.log(api.describe(api.sum(5, 10)), api.math.minutesPerHour);
console.log(Object.hasOwn(api, "default"));

// 按本例输入运行，输出依次为：
// describe,math,minutesPerHour,sum
// 15 分钟 60
// false
