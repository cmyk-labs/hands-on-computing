import snapshot, { count, increment, settings } from "./counter.mjs";
console.log(snapshot, count);
increment();
settings.title = "模块";
console.log(snapshot, count, settings.title);

// 按本例输入运行，输出依次为：
// 0 0
// 0 1 模块
