// 所属章节：17-JSON 与数据转换
// 演示知识点：超出安全整数的精度丢失与深拷贝丢失共享身份
// 运行命令：node scripts/17-json/precision-and-copy.mjs（工作目录 content/编程语言/javascript）
// 期望结果：id 解析成 9007199254740992；拷贝后 first 与 second 不再相等且互不影响
const rounded = JSON.parse('{"id":9007199254740993}');
console.log(rounded.id, Number.isSafeInteger(rounded.id));
const exact = JSON.parse('{"id":"9007199254740993"}');
console.log(BigInt(exact.id) === 9007199254740993n);
const shared = { minutes: 5 };
const original = { first: shared, second: shared };
const copy = JSON.parse(JSON.stringify(original));
console.log(original.first === original.second, copy.first === copy.second);
copy.first.minutes = 8;
console.log(copy.second.minutes, original.first.minutes);

// 按本例输入运行，输出依次为：
// 9007199254740992 false
// true
// true false
// 5 5
