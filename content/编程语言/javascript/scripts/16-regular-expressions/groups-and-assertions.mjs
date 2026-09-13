const pair = /^(?<word>[a-z]+)-\k<word>$/;
const matched = pair.exec("go-go");
if (matched) console.log(matched[0], matched.groups.word, matched.index);
console.log(pair.test("go-stop"), /^(ab)-\1$/.test("ab-ab"));
console.log(/(?:cat|dog)s?/.exec("dogs")[0]);
console.log(/\d+(?=kg)/.exec("12kg")[0]);
console.log(/(?<=USD )\d+/.exec("USD 25")[0]);
console.log(/a(?!b)/.test("ac"), /(?<!x)a/.test("ba"));
console.log(/\bcat\b/.test("a cat!"), /^b$/m.test("a\nb\nc"));

// 按本例输入运行，输出依次为：
// go-go go 0
// false true
// dogs
// 12
// 25
// true true
// true true
