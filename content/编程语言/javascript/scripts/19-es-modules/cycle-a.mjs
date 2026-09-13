import { readB } from "./cycle-b.mjs";
export const a = "A";
export function combined() { return a + readB(); }
