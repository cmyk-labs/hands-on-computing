import { a } from "./cycle-a.mjs";
export const b = "B";
export function readB() { return b + a; }
