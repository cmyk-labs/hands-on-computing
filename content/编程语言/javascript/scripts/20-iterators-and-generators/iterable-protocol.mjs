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
