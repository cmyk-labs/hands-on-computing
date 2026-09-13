export interface Entry { title: string; hours: number }
export function total(entry: Entry): number { return entry.hours * 2; }
export const unit = "小时";
