class Vault {
  #value = 7;
  read() { return this.#value; }
}
Vault.prototype.read.call({});

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot read private member #value。
