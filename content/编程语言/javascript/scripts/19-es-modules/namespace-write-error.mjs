// 所属章节：19-ES 模块
// 演示知识点：命名空间属性拒绝写入的独立反例
// 运行命令：node scripts/19-es-modules/namespace-write-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError：Cannot assign to read only property 'count'，退出状态为 1
import * as counter from "./counter.mjs";
counter.count = 10;

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot assign to read only property 'count'。
