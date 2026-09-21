// 所属章节：02-常用类型与类型推断
// 演示知识点：any 放宽检查使错误推迟到运行时的反例
// 运行命令：node .build/02-types-and-inference/any-runtime-error.js（工作目录 content/编程语言/typescript）
// 期望结果：非零退出并抛出 TypeError：数值没有这个字符串方法
const flexible: any = 12;
flexible.toUpperCase(); // 类型检查放行；运行时 TypeError：数值没有这个字符串方法
