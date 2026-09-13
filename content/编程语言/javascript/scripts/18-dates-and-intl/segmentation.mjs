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
