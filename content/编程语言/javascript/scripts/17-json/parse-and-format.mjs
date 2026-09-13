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
