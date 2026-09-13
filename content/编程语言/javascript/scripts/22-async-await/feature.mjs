console.log("feature evaluated"); // → 对同一模块 URL 的两次导入，仅打印一次
export const factor = await Promise.resolve(3);
export const scale = (value) => value * factor;
