# TypeScript

代码写法见 [TypeScript 编程规范](TypeScript编程规范.md)。

环境：Node.js 24.11.0、npm 11.6.1、TypeScript 7.0.2、@types/node 24.10.0。依赖与命令见 [package.json](package.json)，版本锁定在 [package-lock.json](package-lock.json)，课程安排见 [plan.md](plan.md)。

## 首次准备

Step 1：完成 [Node.js 与 npm 的准备](../javascript/README.md#准备环境)。

Step 2：从项目根目录进入 TypeScript 目录。

```bash
cd content/编程语言/typescript
```

Step 3：按锁文件安装项目依赖；依赖配置变更后重新执行。

```bash
npm ci
```

## VS Code 编辑器配置

Step 1：在 VS Code 中选择“文件 → 打开文件夹”，打开本项目的 content/编程语言/typescript 目录。

Step 2：在扩展面板安装 Microsoft 的 TypeScript 7，扩展标识为 TypeScriptTeam.native-preview。

Step 3：打开 greeting.ts，按 Ctrl+Shift+P，执行 TypeScript: Enable TypeScript 7。

Step 4：在命令面板执行 Preferences: Open Workspace Settings (JSON)，将下面设置合入工作区配置，使用本目录安装的编译器。

```json
{
  "js/ts.tsdk.path": "./node_modules/typescript"
}
```

greeting.ts 位于 scripts/01-typescript-toolchain/；悬停查看类型，并用第一章的检查命令对照诊断。操作依据：[TypeScript 7 官方扩展](https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.native-preview)。

## 运行章节

以下命令在 content/编程语言/typescript 执行。

Step 1：检查第一章正常示例的类型。

```bash
npm run check:01
```

Step 2：生成 JavaScript 文件。

```bash
npm run build:01
```

Step 3：运行生成的示例。

```bash
npm run run:01
```

其他章节按头部命令运行，章号使用两位数字，例如 03。纯类型示例只需检查；错误反例、测试和打包使用章节给出的独立命令。清理 .build 后，先重新编译再运行。

每章使用独立 tsconfig.json、项目内编译器并开启 strict；类型诊断与运行时错误的区别见[工具链章节](<01-TypeScript 与工具链.ipynb>)。

Notebook 查看方式见[开始使用](../../../docs/START_HERE.md)；PowerShell 若拦截 npm.ps1，使用 npm.cmd。

操作依据：[npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)、[npm run](https://docs.npmjs.com/cli/v11/commands/npm-run/)、[TypeScript 基础](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)。

## 本次修订与验证范围

2026-09-23、2026-09-26 按新协议逐章检查全部 29 章、配套源码/配置和每张示意图；沿用课程锁定的 TypeScript 7.0.2 与 Node.js 24.11.0。第 03、06、16、17、26、27、29 章完成受影响项目的真实构建与运行；第 16 章另核对 6 处预期类型诊断。第 18、25 章的临时打包、安装和消费者检查通过。第 24、25 章补齐独立消费者反例步骤，实际构建、本地离线安装后分别只得到预期 TS2345、TS2322，临时安装已清理。其余章节核对源码、类型关系、输出约定及文档结构，未把未改项目、浏览器交互、旧式装饰器、全部错误配置或性能场景记作本轮重跑。
