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
