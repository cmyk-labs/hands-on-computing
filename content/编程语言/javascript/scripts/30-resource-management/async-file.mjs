// 所属章节：30-显式资源管理
// 演示知识点：FileHandle 用 await using 异步关闭与同步 dispose 回退
// 运行命令：node scripts/30-resource-management/async-file.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 write awaited and handle closed 与 asynchronous file cleaned
import assert from "node:assert/strict";
import { open, readFile, mkdtemp, rm } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
const root = import.meta.dirname;
const directory = await mkdtemp(resolve(root, "js-c-async-"));
try {
  const path = resolve(directory, "note.txt");
  let savedHandle;
  // 这个块界定文件寿命；写入与离开块时的异步关闭都要等待。
  {
    await using file = await open(path, "w");
    savedHandle = file;
    await file.writeFile("async saved", "utf8");
  }
  // 块外再读回文件，并用保留的句柄观察已关闭状态。
  assert.equal(await readFile(path, "utf8"), "async saved");
  await assert.rejects(savedHandle.stat(), { code: "EBADF" });
  console.log("write awaited and handle closed"); // → write awaited and handle closed
  // 对照：没有 asyncDispose 时，await using 也可以采用同步 dispose。
  const events = [];
  {
    await using fallback = { [Symbol.dispose]() { events.push("sync fallback"); } };
  }
  assert.deepEqual(events, ["sync fallback"]);
} finally {
  // 句柄关闭后清理本次目录；这里的 finally 不吞掉原始异常。
  const child = relative(root, directory);
  assert.ok(child.startsWith("js-c-async-") && !isAbsolute(child) && !child.includes(".."));
  await rm(directory, { recursive: true });
}
console.log("asynchronous file cleaned"); // → asynchronous file cleaned
