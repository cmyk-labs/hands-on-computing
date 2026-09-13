Iterator.from([1]).flatMap(() => "JS").toArray();

// 独立运行：退出状态为 1；诊断包含 TypeError；called on non-object。
