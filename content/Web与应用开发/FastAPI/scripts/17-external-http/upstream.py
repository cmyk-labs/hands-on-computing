"""有限的本地上游；使用 Uvicorn 导入，不自行启动进程。"""

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
