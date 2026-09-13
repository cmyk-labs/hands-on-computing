const record = Object.seal({ count: 1 });
record.extra = 2;
// 预期错误：TypeError；object is not extensible
