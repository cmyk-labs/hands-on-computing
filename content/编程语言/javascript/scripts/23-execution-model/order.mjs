const events = ["sync"];
process.nextTick(() => events.push("nextTick"));
Promise.resolve().then(() => events.push("promise"));
queueMicrotask(() => events.push("microtask"));
setImmediate(() => console.log(events.join(","))); // → sync,promise,microtask,nextTick
