const record = {};
Object.defineProperty(record, "id", { value: 1 });
record.id = 2;
// 预期错误：TypeError；Cannot assign to read only property 'id'
