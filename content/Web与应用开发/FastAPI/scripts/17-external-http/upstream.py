"""所属章节：17-外部 HTTP 服务调用
演示知识点：提供本章讲解的成功、500 错误和延迟文本接口，供客户端做真实网络实验：GET /records/{record_id}（可延迟）、/failure 与流式 /slow-text
运行命令：python -m uvicorn upstream:upstream --app-dir scripts/17-external-http --host 127.0.0.1 --port 8170（工作目录 content/Web与应用开发/FastAPI）
期望结果：同一客户端顺序请求两条记录复用相同对端端口，/failure 返回 500，/slow-text 分段输出 ready、done 并在结束时打印生成器关闭"""

import asyncio
from collections.abc import AsyncIterator
from typing import Annotated

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import StreamingResponse


upstream = FastAPI(title="本地 HTTP 上游")


@upstream.get("/records/{record_id}")
async def read_record(
    record_id: int,
    request: Request,
    delay: Annotated[float, Query(ge=0, le=1)] = 0,
) -> dict[str, int | str | None]:
    await asyncio.sleep(delay)
    return {
        "id": record_id,
        "title": f"学习记录 {record_id}",
        "peer_port": request.client.port if request.client else None,
    }


@upstream.get("/failure")
def fail() -> None:
    raise HTTPException(500, "上游示例故意返回错误")


async def delayed_lines() -> AsyncIterator[bytes]:
    try:
        yield b"ready\n"
        await asyncio.sleep(1.0)
        yield b"done\n"
    finally:
        print("slow_text: generator closed", flush=True)


@upstream.get("/slow-text")
def slow_text() -> StreamingResponse:
    return StreamingResponse(delayed_lines(), media_type="text/plain")
