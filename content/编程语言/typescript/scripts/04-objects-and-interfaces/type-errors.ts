export {};

interface NeedsTitle { title: string; }
const missing: NeedsTitle = {}; // 缺少必需属性 title。
interface WrongExtension extends NeedsTitle { title: number; } // 扩展属性必须兼容原接口。

interface OptionalOnly { nickname?: string; }
const explicitUndefined: OptionalOnly = { nickname: undefined }; // 开启 exactOptionalPropertyTypes 后不允许。
const mustExist: { nickname: string | undefined } = {}; // 联合含 undefined 不等于属性可省略。

const locked: { readonly id: number } = { id: 1 };
locked.id = 2; // readonly 阻止此处重新赋值。

interface WrongDictionary {
  [key: string]: number;
  title: string; // 已命名的属性也必须符合字符串索引签名。
}

interface KnownOptions { title: string; }
const extra: KnownOptions = { title: "对象", minutes: 12 }; // 新鲜字面量多出 minutes。
interface WeakOptions { minutes?: number; }
const unrelated = { duration: 12 };
const weak: WeakOptions = unrelated; // 与全可选目标没有任何共同属性。
