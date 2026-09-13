Object.defineProperty({}, "value", { value: 1, get() { return 2; } });
// 预期错误：TypeError；Invalid property descriptor
