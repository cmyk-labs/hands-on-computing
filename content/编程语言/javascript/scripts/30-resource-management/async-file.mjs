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
  {
    await using file = await open(path, "w");
    savedHandle = file;
    await file.writeFile("async saved", "utf8");
  }
  assert.equal(await readFile(path, "utf8"), "async saved");
  await assert.rejects(savedHandle.stat(), { code: "EBADF" });
  console.log("write awaited and handle closed"); // → write awaited and handle closed
  const events = [];
  {
    await using fallback = { [Symbol.dispose]() { events.push("sync fallback"); } };
  }
  assert.deepEqual(events, ["sync fallback"]);
} finally {
  const child = relative(root, directory);
  assert.ok(child.startsWith("js-c-async-") && !isAbsolute(child) && !child.includes(".."));
  await rm(directory, { recursive: true });
}
console.log("asynchronous file cleaned"); // → asynchronous file cleaned
