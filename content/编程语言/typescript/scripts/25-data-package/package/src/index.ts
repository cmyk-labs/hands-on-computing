// 所属章节：25-综合工程实践
// 演示知识点：Reading 结构守卫、解析规范化、泛型 mapValues 与异步 loadReadings 模块
// 运行命令：npm run build:25（工作目录 content/编程语言/typescript）
// 期望结果：生成 dist 实现与 index.d.ts 声明
export interface Reading { sensor: string; value: number }
export type Result<T> = { ok: true; value: T }
  | { ok: false; code: "input" | "source"; message: string };

export function isReading(value: unknown): value is Reading {
  return (typeof value === "object" && value !== null || typeof value === "function")
    && "sensor" in value && typeof value.sensor === "string"
    && "value" in value && typeof value.value === "number";
}
export function parseReadings(value: unknown): Result<Reading[]> {
  if (!Array.isArray(value)) return { ok: false, code: "input", message: "需要数组" };
  const items: unknown[] = value;
  const readings: Reading[] = [];
  for (const item of items) {
    if (!isReading(item)) return { ok: false, code: "input", message: "读数无效" };
    if (typeof item === "function" || Array.isArray(item) || item.sensor.trim().length === 0
      || !Number.isFinite(item.value)) return { ok: false, code: "input", message: "读数无效" };
    readings.push({ sensor: item.sensor.trim(), value: item.value });
  }
  return { ok: true, value: readings };
}

export function mapValues<T, U>(items: readonly T[], select: (item: T) => U): U[] {
  return items.map(select);
}
export async function loadReadings(source: () => Promise<unknown>): Promise<Result<Reading[]>> {
  let input: unknown;
  try { input = await source(); }
  catch (error: unknown) {
    return { ok: false, code: "source", message: error instanceof Error ? error.message : "非 Error 异常" };
  }
  return parseReadings(input);
}
