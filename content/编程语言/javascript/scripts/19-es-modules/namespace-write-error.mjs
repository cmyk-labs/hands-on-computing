import * as counter from "./counter.mjs";
counter.count = 10;

// 独立运行：退出状态为 1；诊断包含 TypeError；Cannot assign to read only property 'count'。
