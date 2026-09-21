// 所属章节：07-函数与参数
// 演示知识点：箭头函数不能作为构造函数调用
// 运行命令：node scripts/07-functions-and-parameters/arrow-constructor.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（build is not a constructor）并以非零状态退出
const build = () => ({ ready: true });
console.log(new build());
// 预期错误：TypeError；build is not a constructor
