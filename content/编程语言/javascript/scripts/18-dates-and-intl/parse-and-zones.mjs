const withOffset = new Date("2025-01-02T08:00:00+08:00");
const utc = new Date("2025-01-02T00:00:00Z");
console.log(withOffset.getTime() === utc.getTime());
console.log(new Date("2025-01-02").toISOString());
const local = new Date("2025-01-02T08:00:00");
console.log(local.getFullYear(), local.getMonth(), local.getDate(), local.getHours());
const asUtc = Date.UTC(2025, 0, 2, 8);
console.log(local.getTime() === asUtc + local.getTimezoneOffset() * 60_000);
console.log(withOffset.getUTCHours());

// 按本例输入运行，输出依次为：
// true
// 2025-01-02T00:00:00.000Z
// 2025 0 2 8
// true
// 0
