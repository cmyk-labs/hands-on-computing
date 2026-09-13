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
