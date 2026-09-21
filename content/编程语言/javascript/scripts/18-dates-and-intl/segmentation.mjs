// 所属章节：18-日期、时间与国际化
// 演示知识点：Segmenter 的字素簇切分与词级分段
// 运行命令：node scripts/18-dates-and-intl/segmentation.mjs（工作目录 content/编程语言/javascript）
// 期望结果：组合字符与 emoji 计为一个字素簇；词分段过滤出 Read|two|chapters
const text = "e\u0301😀";
const graphemes = [...new Intl.Segmenter("en", {
  granularity: "grapheme"
}).segment(text)];
console.log(text.length, [...text].length, graphemes.length);
console.log(graphemes.map(part => part.index).join(","));
const words = new Intl.Segmenter("en", { granularity: "word" });
console.log([...words.segment("Read two chapters!")].filter(part =>
  part.isWordLike).map(part => part.segment).join("|"));

// 按本例输入运行，输出依次为：
// 4 3 2
// 0,2
// Read|two|chapters
