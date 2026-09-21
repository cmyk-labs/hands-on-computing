// 所属章节：17-JSON 与数据转换
// 演示知识点：JSON.parse 解析、带缩进序列化与往返一致性
// 运行命令：node scripts/17-json/parse-and-format.mjs（工作目录 content/编程语言/javascript）
// 期望结果：首行输出 JS 30 false，随后为两行缩进 JSON 与两个 true
const text = '{"title":"JS","minutes":30,"done":false}';
const lesson = JSON.parse(text);
console.log(lesson.title, lesson.minutes, lesson.done);
const formatted = JSON.stringify(lesson, null, 2);
console.log(formatted);
console.log(JSON.parse(formatted).minutes === lesson.minutes);
console.log(JSON.parse("null") === null, JSON.parse("12"));

// 按本例输入运行，输出依次为：
// JS 30 false
// {
//   "title": "JS",
//   "minutes": 30,
//   "done": false
// }
// true
// true 12
