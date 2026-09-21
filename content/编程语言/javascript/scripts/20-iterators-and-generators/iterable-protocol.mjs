// 所属章节：20-迭代器与生成器
// 演示知识点：手写 Symbol.iterator 实现可重复遍历的整数区间
// 运行命令：node scripts/20-iterators-and-generators/iterable-protocol.mjs（工作目录 content/编程语言/javascript）
// 期望结果：两次展开均输出 2,3,4，游标逐次推进到 done
function range(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current >= end) return { value: undefined, done: true };
          return { value: current++, done: false };
        }
      };
    }
  };
}
const values = range(2, 5);
const iterator = values[Symbol.iterator]();
console.log(JSON.stringify(iterator.next()));
console.log([...values].join(","), [...values].join(","));
console.log(JSON.stringify(iterator.next()));
console.log(JSON.stringify(iterator.next()));
console.log(iterator.next().done, iterator.next().done);

// 按本例输入运行，输出依次为：
// {"value":2,"done":false}
// 2,3,4 2,3,4
// {"value":3,"done":false}
// {"value":4,"done":false}
// true true
