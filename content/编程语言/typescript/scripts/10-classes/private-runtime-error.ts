export {};
class Secret {
  #value = 1;
  read(): number { return this.#value; }
}
Secret.prototype.read.call({}); // TypeError：接收者没有 Secret 的私有身份。
