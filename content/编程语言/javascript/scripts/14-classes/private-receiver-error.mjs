// 所属章节：14-类与继承
// 演示知识点：访问私有字段时，接收者须具有对应私有元素
// 运行命令：node scripts/14-classes/private-receiver-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 TypeError（Cannot read private member #value）
class Vault {
  #value = 7;
  read() { return this.#value; }
}
Vault.prototype.read.call({});

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot read private member #value。
