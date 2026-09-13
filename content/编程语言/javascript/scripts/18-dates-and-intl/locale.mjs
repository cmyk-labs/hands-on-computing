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
