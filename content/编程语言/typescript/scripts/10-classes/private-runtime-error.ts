// 所属章节：10-类与类型检查
// 演示知识点：#私有字段运行时身份检查的边界
// 运行命令：node .build/10-classes/private-runtime-error.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，抛出 TypeError，消息包含 Cannot read private member #value
export {};
class Secret {
  #value = 1;
  read(): number { return this.#value; }
}
Secret.prototype.read.call({}); // TypeError：接收者没有 Secret 的私有身份。
