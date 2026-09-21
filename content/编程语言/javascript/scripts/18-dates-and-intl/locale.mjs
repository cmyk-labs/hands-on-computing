// 所属章节：18-日期、时间与国际化
// 演示知识点：Intl.Locale 解析区域标签、supportedLocalesOf 与 resolvedOptions
// 运行命令：node scripts/18-dates-and-intl/locale.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 zh Hans CN latn、zh-CN,en-US 与 en-US latn
const locale = new Intl.Locale("zh-Hans-CN-u-nu-latn");
console.log(locale.language, locale.script, locale.region, locale.numberingSystem);
console.log(Intl.NumberFormat.supportedLocalesOf(["zh-CN", "en-US"]).join(","));
const format = new Intl.NumberFormat("en-US", { numberingSystem: "latn" });
const options = format.resolvedOptions();
console.log(options.locale, options.numberingSystem);

// 按本例输入运行，输出依次为：
// zh Hans CN latn
// zh-CN,en-US
// en-US latn
