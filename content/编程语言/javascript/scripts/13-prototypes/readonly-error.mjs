const base = Object.create(null, { id: { value: 1, writable: false } });
const child = Object.create(base);
child.id = 2;

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot assign to read only property 'id'。
