// 所属章节：04-对象类型、类型别名与接口
// 演示知识点：缺少必需属性、扩展不兼容、exactOptionalPropertyTypes、readonly 重赋值、索引签名冲突、新鲜字面量多余属性与弱类型检测的类型错误反例
// 运行命令：npm run errors:04（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
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
