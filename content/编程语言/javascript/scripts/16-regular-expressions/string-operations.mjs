// 所属章节：16-正则表达式
// 演示知识点：match、matchAll、replace（命名组与函数替换）与 split
// 运行命令：node scripts/16-regular-expressions/string-operations.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 JS,TS、JS=12,TS=8 0 等值，与正文行内注释一致
const text = "JS:12 TS:8";
const pattern = /(?<name>[A-Z]+):(?<hours>\d+)/g;
console.log(text.match(/[A-Z]+/g).join(","));
const rows = [];
for (const match of text.matchAll(pattern)) {
  rows.push(match.groups.name + "=" + Number(match.groups.hours));
}
console.log(rows.join(","), pattern.lastIndex);
console.log(text.replace(/(?<name>[A-Z]+):(\d+)/g, "$<name>[$2]"));
console.log(text.replace(/\d+/g, digits => String(Number(digits) * 2)));
console.log(JSON.stringify("a, b; c".split(/[,;]\s*/)));
console.log(JSON.stringify("a,b".split(/(,)/)));

// 按本例输入运行，输出依次为：
// JS,TS
// JS=12,TS=8 0
// JS[12] TS[8]
// JS:24 TS:16
// ["a","b","c"]
// ["a",",","b"]
