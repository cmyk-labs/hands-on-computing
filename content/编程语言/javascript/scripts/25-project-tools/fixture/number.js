// 所属章节：25-项目组织与工程工具
// 演示知识点：包内部 triple 函数，仅经 #number 子路径供 index.js 使用
// 运行命令：npm run check:25（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，不对外部导入者暴露
export const triple = (value) => value * 3;
