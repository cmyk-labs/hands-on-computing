// 所属章节：28-命名空间与旧项目阅读
// 演示知识点：模块内命名空间、合并与别名，环境命名空间类型消费
// 运行命令：npm run run:28（工作目录 content/编程语言/typescript）
// 期望结果：输出 [ADA] 1
namespace Toolkit {
  export namespace Text {
    export function label(value: string): string { return "[" + value + "]"; }
  }
}
namespace Toolkit {
  export const version = "1";
}
import Text = Toolkit.Text;
const settings: LegacySettings.Options = { upper: true };
console.log(Text.label(settings.upper ? "ADA" : "Ada"), Toolkit.version); // [ADA] 1。
export {};
