console.log(0b1010, 0o12, 0xA, 10);
console.log(1_024, 1.25e3, 1.25e-2);
console.log((255).toString(16), (10).toString(2));
console.log(0xFFn, 1_000n, Number("25"));
// 输出依次为：
// 10 10 10 10
// 1024 1250 0.0125
// ff 1010
// 255n 1000n 25

const largest = Number.MAX_SAFE_INTEGER;
console.log(largest, Number.isSafeInteger(largest), Number.isSafeInteger(largest + 1));
console.log(largest + 1 === largest + 2, Number.isInteger(largest + 1));
const computed = 0.1 + 0.2;
console.log(computed, computed === 0.3);
const tolerance = 1e-12; // 本例在 1 附近做演示，不推广到任意业务输入
console.log(Math.abs(computed - 0.3) < tolerance, Number.EPSILON);
const totalCents = 10 + 20;
console.log(totalCents, (totalCents / 100).toFixed(2));
// 输出依次为：
// 9007199254740991 true false
// true true
// 0.30000000000000004 false
// true 2.220446049250313e-16
// 30 0.30

console.log(1 / 0, -1 / 0, 0 / 0, Number.MAX_VALUE * 2);
console.log(Number.isFinite(12), Number.isFinite("12"), isFinite("12"));
console.log(Number.isNaN("oops"), isNaN("oops"), Number.isNaN(Number("oops")));
const seats = Number("12");
console.log(Number.isSafeInteger(seats) && seats >= 0);
// 输出依次为：
// Infinity -Infinity NaN Infinity
// true false true
// false true true
// true

console.log(Number("12px"), Number.parseInt("12px", 10), Number.parseFloat("12.5px"));
console.log(Number.parseInt("ff", 16), Number.parseInt("101", 2));
console.log(Number.parseInt("0b10"), Number("0b10"));
console.log(Number("1_000"), Number.parseInt("1_000", 10));
console.log(Number.parseInt("none", 10), Math.trunc(12.9));
// 输出依次为：
// NaN 12 12.5
// 255 5
// 0 2
// NaN 1
// NaN 12

console.log(Math.abs(-6), Math.sqrt(81), Math.hypot(3, 4));
console.log(Math.min(6, 2), Math.max(6, 2), Math.sin(0));
console.log(Math.floor(-1.5), Math.ceil(-1.5), Math.trunc(-1.5), Math.round(-1.5));
console.log(Object.is(Math.round(-0.1), -0));
console.log(Math.min(), Math.max());
// 输出依次为：
// 6 9 5
// 2 6 0
// -2 -1 -1 -1
// true
// Infinity -Infinity

const distance = 12.5;
console.log(distance.toFixed(2), distance.toPrecision(4), distance.toExponential(2));
console.log(typeof distance.toFixed(2), distance);
console.log((2.55).toFixed(1), (1e21).toFixed(2));
// 输出依次为：
// 12.50 12.50 1.25e+1
// string 12.5
// 2.5 1e+21

const exact = BigInt("9007199254740993");
console.log(exact, exact + 2n, 7n / 2n, -7n / 2n);
console.log(BigInt(9007199254740993), Number(exact));
console.log(2n < 3, 2n == 2, 2n === 2);
console.log(BigInt(12), Number(12n));
// 输出依次为：
// 9007199254740993n 9007199254740995n 3n -3n
// 9007199254740992n 9007199254740992
// true true false
// 12n 12

const countOptions = 6;
const sample = 0.42; // 固定输入只演示映射，不冒充随机测量
console.log(Math.floor(sample * countOptions));
const randomValue = Math.random();
console.log(randomValue >= 0 && randomValue < 1);
// 输出依次为：
// 2
// true
