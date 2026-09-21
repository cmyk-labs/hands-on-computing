// 所属章节：18-声明文件与第三方类型
// 演示知识点：只有环境声明、缺少运行时模块的导入失败
// 运行命令：node .build/18-declaration-files/missing-runtime.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，报错包含 ERR_MODULE_NOT_FOUND 与 ts-b-missing-host
import { readCount } from "ts-b-missing-host";
console.log(readCount()); // 声明允许调用，但不会安装或创建宿主模块。
