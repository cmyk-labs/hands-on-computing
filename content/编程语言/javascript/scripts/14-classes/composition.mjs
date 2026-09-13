class Reporter {
  constructor(formatter) { this.formatter = formatter; }
  render(title) { return this.formatter(title); }
}
const plain = new Reporter(title => title);
const labeled = new Reporter(title => "课程:" + title);
console.log(plain.render("继承"), labeled.render("组合"));

// 按本例输入运行，输出依次为：
// 继承 课程:组合
