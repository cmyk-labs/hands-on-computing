// 所属章节：28-Proxy、Reflect 与元编程
// 演示知识点：可撤销代理的访问边界与重复 revoke 幂等
// 运行命令：node scripts/28-metaprogramming/revocable.mjs（工作目录 content/编程语言/javascript）
// 期望结果：撤销后访问抛 TypeError，输出 revoked proxy retained value open
import assert from "node:assert/strict";
const target = { status: "open" };
const { proxy, revoke } = Proxy.revocable(target, {});
const value = proxy.status;
revoke();
revoke();
assert.throws(() => proxy.status, TypeError);
assert.equal(value, "open");
assert.equal(target.status, "open");
console.log("revoked proxy retained value", value); // → revoked proxy retained value open
