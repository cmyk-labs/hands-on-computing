// 所属章节：30-显式资源管理
// 演示知识点：DisposableStack 的 use、adopt、defer、move 与逆序释放
// 运行命令：node scripts/30-resource-management/stacks.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 defer,adopt:fd-7,use
import assert from "node:assert/strict";
const events = [];
const setup = new DisposableStack();
setup.use({ [Symbol.dispose]() { events.push("use"); } });
assert.equal(setup.adopt("fd-7", (value) => events.push(`adopt:${value}`)), "fd-7");
setup.defer(() => events.push("defer"));
const owned = setup.move();
assert.equal(setup.disposed, true);
setup.dispose();
assert.equal(events.length, 0);
assert.throws(() => setup.defer(() => {}), ReferenceError);
{
  using scope = owned;
}
owned.dispose();
assert.deepEqual(events, ["defer", "adopt:fd-7", "use"]);
console.log(events.join(",")); // → defer,adopt:fd-7,use
