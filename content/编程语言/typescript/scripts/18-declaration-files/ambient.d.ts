// 所属章节：18-声明文件与第三方类型
// 演示知识点：declare module 环境模块声明只描述类型，不提供实现
// 运行命令：node .build/18-declaration-files/missing-runtime.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，报错包含 ERR_MODULE_NOT_FOUND 与 ts-b-missing-host
declare module "ts-b-missing-host" {
  export function readCount(): number;
}
