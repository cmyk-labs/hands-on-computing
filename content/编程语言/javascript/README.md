# JavaScript

代码写法见 [JavaScript 编程规范](JavaScript编程规范.md)。

环境：Node.js 24.11.0、npm 11.6.1；浏览器示例使用 Chrome 152。第 25 章开发工具固定为 ESLint 10.10.0、Prettier 3.6.2，由本目录 package.json 与 package-lock.json 管理；课程安排见 [plan.md](plan.md)。

## 准备环境

Step 1：从 [Node.js 24.11.0 官方下载页](https://nodejs.org/en/download/archive/v24.11.0)安装对应系统的版本，然后重新打开终端。

Step 2：确认 Node.js 版本为 v24.11.0。

```bash
node --version
```

Step 3：确认 npm 版本为 11.6.1。

```bash
npm --version
```

## 运行脚本

Step 1：从项目根目录进入 JavaScript 目录。

```bash
cd content/编程语言/javascript
```

Step 2：运行第一章示例。

```bash
node scripts/01-running-and-writing/basics.mjs
```

其他脚本使用对应章节的完整命令。语言示例主要使用内置能力；第 25 章需准备下列 npm 开发工具。

## npm 工具准备与日常检查

工作目录：content/编程语言/javascript。

Step 1：首次使用第 25 章或锁文件变化后，按锁文件安装工具。

```bash
npm ci --ignore-scripts --no-audit --no-fund
```

npm ci 会重建本目录 node_modules，先停止使用这些依赖的进程；首次安装需要联网。

Step 2：日常运行第 25 章的静态检查、格式检查与模块示例。

```bash
npm run check:25
```

Step 3：运行第 24 章自动化测试。

```bash
npm run test:24
```

单独的 lint、格式与覆盖率入口分别为 npm run lint:25、npm run format:25、npm run coverage:24。检查限定于相应章节示例，不扫描故意失败的反例。

工具依据：[ESLint 运行条件](https://eslint.org/docs/latest/use/getting-started)、[ESLint 10.10.0 配置](https://raw.githubusercontent.com/eslint/eslint/v10.10.0/package.json)、[Prettier 3.6.2 配置](https://raw.githubusercontent.com/prettier/prettier/3.6.2/package.json)、[npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)。

## 浏览器示例

首次使用预览服务时，先完成 [Python 运行环境准备](../python/README.md#准备环境)；服务只使用标准库。

Step 1：在 content/编程语言/javascript 目录的终端激活预览环境。

```bash
conda activate hands-on-computing
```

Step 2：启动第一章本地服务。

```bash
python -m http.server 8102 --bind 127.0.0.1
```

Step 3：打开[示例页面](http://127.0.0.1:8102/scripts/01-running-and-writing/index.html)，在开发者工具 Console 查看输出。

结束后按 Ctrl+C 停止服务。Notebook 查看方式见[开始使用](../../../docs/START_HERE.md)；PowerShell 若拦截 npm.ps1，使用 npm.cmd。

操作依据：[Node.js 24.11.0 命令行](https://nodejs.org/download/release/v24.11.0/docs/api/cli.html)、[Python 本地服务](https://docs.python.org/3.12/library/http.server.html#command-line-interface)。

## 本次修订与验证范围

2026-09-23 按新协议逐章检查全部 30 章、配套源码和每张示意图；使用 Node.js 24.11.0。实际重跑第 07、09、14–17、20、22–24、26、28 章中改变行为的脚本或消费者检查；第 24 章 9 项测试通过，第 26 章打包、离线安装和消费者导入通过。其余章节按实际修改核对源码、预期和静态结构，未将其记作全部脚本重跑。未重新完成全部浏览器交互、调试器操作、CPU/内存剖析、未改错误脚本和远程 CI。
