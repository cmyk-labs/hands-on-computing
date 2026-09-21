// 所属章节：18-日期、时间与国际化
// 演示知识点：Collator 数值感知排序与 PluralRules 基数/序数选择
// 运行命令：node scripts/18-dates-and-intl/collation-and-plurals.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 lesson1,lesson2,lesson10；计数选 other/one/other；序数 2 为 two
const compare = new Intl.Collator("en", { numeric: true }).compare;
console.log(["lesson10", "lesson2", "lesson1"].sort(compare).join(","));
console.log(Math.sign(compare("lesson2", "lesson10")));
const plural = new Intl.PluralRules("en", { type: "cardinal" });
const nouns = { one: "lesson", other: "lessons" };
for (const count of [0, 1, 2]) {
  console.log(count, plural.select(count), nouns[plural.select(count)]);
}
console.log(new Intl.PluralRules("en", { type: "ordinal" }).select(2));

// 按本例输入运行，输出依次为：
// lesson1,lesson2,lesson10
// -1
// 0 other lessons
// 1 one lesson
// 2 other lessons
// two
