// 所属章节：30-显式资源管理
// 演示知识点：真实文件句柄封装为 Symbol.dispose 的同步释放
// 运行命令：node scripts/30-resource-management/sync-file.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 body,marker disposed,file closed 与 synchronous file cleaned
import { rm } from "node:fs/promises";
import assert from "node:assert/strict";
import { openSync, closeSync, writeFileSync, readFileSync, fstatSync, mkdtempSync } from "node:fs";
import { resolve, relative, isAbsolute } from "node:path";
class SyncFile {
  constructor(path, events) { this.fd = openSync(path, "w"); this.events = events; }
  [Symbol.dispose]() {
    // 释放后置空；重复释放不再关闭可能被系统重新分配的文件描述符。
    if (this.fd === undefined) return;
    closeSync(this.fd);
    this.fd = undefined;
    this.events.push("file closed");
  }
}
const root = import.meta.dirname;
const directory = mkdtempSync(resolve(root, "js-c-sync-"));
try {
  const events = [];
  const path = resolve(directory, "note.txt");
  let savedFd;
  // 函数作用域结束时按声明的逆序释放：先 marker，后 file。
  function writeNote() {
    using file = new SyncFile(path, events);
    using marker = { [Symbol.dispose]() { events.push("marker disposed"); } };
    // null 不注册释放动作；保留此行用于观察允许的空资源。
    using absent = null;
    savedFd = file.fd;
    writeFileSync(file.fd, "saved", "utf8");
    events.push("body");
    return "returned";
  }
  // 返回值已取得时资源也已释放：读回文件，并检查旧描述符已关闭。
  assert.equal(writeNote(), "returned");
  assert.deepEqual(events, ["body", "marker disposed", "file closed"]);
  assert.equal(readFileSync(path, "utf8"), "saved");
  assert.throws(() => fstatSync(savedFd), { code: "EBADF" });
  console.log(events.join(",")); // → body,marker disposed,file closed
} finally {
  // 文件释放与临时目录清理是两层职责；失败时仍删除本次目录。
  const child = relative(root, directory);
  assert.ok(child.startsWith("js-c-sync-") && !isAbsolute(child) && !child.includes(".."));
  await rm(directory, { recursive: true });
}
console.log("synchronous file cleaned"); // → synchronous file cleaned
