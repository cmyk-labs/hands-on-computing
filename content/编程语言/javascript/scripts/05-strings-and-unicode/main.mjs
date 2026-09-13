const text = "JavaScript";
console.log(text.length, text[0], text.at(-1), text[99]);
console.log(text.charAt(99) === "");
console.log(text.slice(0, 4), text.slice(-6), text.slice(4, 0) === "");
console.log(text.substring(4, 0), text.substring(-2, 4));
const edited = "Type" + text.slice(4);
console.log(text, edited);
// 输出依次为：
// 10 J t undefined
// true
// Java Script true
// Java Java
// JavaScript TypeScript

const route = "  js/js/notes  ";
const clean = route.trim();
console.log(clean, clean.includes("js"), clean.indexOf("js"), clean.indexOf("ts"));
console.log(clean.startsWith("js/"), clean.endsWith("notes"));
console.log(clean.replace("js", "ts"), clean.replaceAll("js", "ts"));
console.log("ab".toUpperCase(), "AB".toLowerCase(), "7".padStart(3, "0"));
// 输出依次为：
// js/js/notes true 0 -1
// true true
// ts/js/notes ts/ts/notes
// AB ab 007

const name = "Ada";
const tasks = 2;
console.log(`${name} 完成 ${tasks + 1} 项`);
console.log("A\nB".length, "A\tB".length, "\\".length);
console.log("\u0041", "\u{1F680}");
const rawText = String.raw`A\nB`;
const interpolated = String.raw`A${"\n"}B`;
console.log(rawText, rawText.length, interpolated.length);
// 输出依次为：
// Ada 完成 3 项
// 3 3 1
// A 🚀
// A\nB 4 3

const label = "A🚀B";
console.log(label.length, label.charCodeAt(1).toString(16), label.codePointAt(1).toString(16));
console.log(label.codePointAt(2).toString(16), String.fromCodePoint(0x1F680));
console.log(label.slice(1, 3), label.slice(1, 2).isWellFormed());
let codePoints = 0;
for (const unit of label) {
  codePoints += 1;
}
console.log(codePoints);
console.log("é".length);
// 输出依次为：
// 4 d83d 1f680
// de80 🚀
// 🚀 false
// 3
// 2

const composed = "\u00E9";
const decomposed = "e\u0301";
console.log(composed === decomposed, composed === decomposed.normalize("NFC"));
console.log(composed.normalize("NFD").length);
console.log("①".normalize("NFC"), "①".normalize("NFKC"));
const broken = "\uD800";
console.log(broken.isWellFormed(), broken.toWellFormed().codePointAt(0).toString(16));
// 输出依次为：
// false true
// 2
// ① 1
// false fffd

const address = "https://example.test/search?q=学习";
console.log(encodeURI(address));
const term = "a&b c";
const component = encodeURIComponent(term);
console.log(component, decodeURIComponent(component));
console.log(decodeURI("%2F"), decodeURIComponent("%2F"));
console.log("/search?q=" + component);
// 输出依次为：
// https://example.test/search?q=%E5%AD%A6%E4%B9%A0
// a%26b%20c a&b c
// %2F /
// /search?q=a%26b%20c
