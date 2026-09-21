// 所属章节：06-条件与循环
// 演示知识点：if/else 与 switch 匹配穿透、for/while/do-while、break/continue 与标签、for...in 与 for...of 的区别
// 运行命令：node scripts/06-conditions-and-loops/main.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各片段示例值，与行内注释一致
const score = 86;
let grade;
if (score >= 90) {
  grade = "优秀";
} else if (score >= 60) {
  grade = "通过";
} else {
  grade = "重试";
}
console.log(grade);
const input = "";
if (input === "") {
  console.log("需要输入");
}
// 输出依次为：
// 通过
// 需要输入

const command = "preview";
let action;
switch (command) {
  case "read":
  case "preview":
    action = "只读";
    break;
  case "write": {
    const permission = "已授权";
    action = permission;
    break;
  }
  default:
    action = "未知命令";
}
console.log(action);
let trail = "";
switch (1) {
  case 1:
    trail += "A"; // 这里有意不写 break
  case 2:
    trail += "B";
    break;
}
console.log(trail);
switch ("1") {
  case 1:
    console.log("数值");
    break;
  default:
    console.log("字符串没有匹配数值");
}
// 输出依次为：
// 只读
// AB
// 字符串没有匹配数值

const text = "JS";
let joined = "";
for (let i = 0; i < text.length; i += 1) {
  joined += text[i];
}
console.log(joined);
let sum = 0;
for (let value = 1; value <= 4; value += 1) {
  sum += value;
}
console.log(sum);
let emptyRuns = 0;
for (let i = 0; i < 0; i += 1) {
  emptyRuns += 1;
}
console.log(emptyRuns);
// 输出依次为：
// JS
// 10
// 0

let remaining = 3;
let processed = 0;
while (remaining > 0) {
  remaining -= 1;
  processed += 1;
}
console.log(remaining, processed);
let attempts = 0;
do {
  attempts += 1;
} while (false);
console.log(attempts);
// 输出依次为：
// 0 3
// 1

let selected = "";
for (let value = 1; value <= 9; value += 1) {
  if (value === 7) break;
  if (value % 2 === 0) continue;
  selected += value;
}
console.log(selected);
let cursor = 0;
let kept = 0;
while (cursor < 4) {
  cursor += 1; // 更新先于可能发生的 continue
  if (cursor === 2) continue;
  kept += 1;
}
console.log(cursor, kept);
// 输出依次为：
// 135
// 4 3

let found = "无";
search: for (let row = 0; row < 3; row += 1) {
  for (let col = 0; col < 3; col += 1) {
    if (row + col === 3) {
      found = `${row},${col}`;
      break search;
    }
  }
}
console.log(found);
let cells = "";
rows: for (let row = 0; row < 2; row += 1) {
  for (let col = 0; col < 3; col += 1) {
    if (col === 1) continue rows;
    cells += `${row}${col} `;
  }
}
console.log(cells.trim());
let marker = "开始";
finish: {
  marker = "结束";
  break finish;
  marker = "不会到达";
}
console.log(marker);
// 输出依次为：
// 1,2
// 00 10
// 结束

const settings = Object.create({ inherited: "来自原型" });
settings.own = "自身";
const allKeys = [];
const ownKeys = [];
for (const key in settings) {
  allKeys.push(key);
  if (Object.hasOwn(settings, key)) ownKeys.push(key);
}
console.log(allKeys.join(","), ownKeys.join(","));
const lessons = ["JS", "TS"];
lessons.note = "额外属性";
const keys = [];
const values = [];
for (const key in lessons) keys.push(key);
for (const value of lessons) values.push(value);
console.log(keys.join(","), values.join(","));
let symbols = 0;
for (const value of "A🚀") symbols += 1;
console.log(symbols);
// 输出依次为：
// own,inherited own
// 0,1,note JS,TS
// 2
