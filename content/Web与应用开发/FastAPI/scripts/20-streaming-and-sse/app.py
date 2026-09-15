"""有限文本流与 SSE，由 Uvicorn 导入运行。"""

import asyncio
from collections.abc import AsyncIterator
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.sse import EventSourceResponse, ServerSentEvent


BASE_DIR = Path(__file__).resolve().parent
app = FastAPI(title="有限流式响应")
state = {"active": 0, "started": 0, "closed": 0, "produced": 0}


async def text_chunks() -> AsyncIterator[bytes]:
    try:
        for number in range(1, 4):
            yield f"part {number}\n".encode("utf-8")
            if number < 3:
                await asyncio.sleep(0.1)
    finally:
        print("文本生成器已退出", flush=True)


@app.get("/stream")
def stream_text() -> StreamingResponse:
    return StreamingResponse(text_chunks(), media_type="text/plain")


@app.get("/events", response_class=EventSourceResponse)
async def events() -> AsyncIterator[ServerSentEvent]:
    state["active"] += 1
    state["started"] += 1
    try:
        for step in range(1, 4):
            state["produced"] += 1
            yield ServerSentEvent(
                data={"step": step, "text": f"完成步骤 {step}"},
                event="done" if step == 3 else "update",
                id=str(step),
                retry=1000,
            )
            if step < 3:
                await asyncio.sleep(1.0)
    finally:
        state["active"] -= 1
        state["closed"] += 1
        print("SSE 生成器已退出", flush=True)


@app.get("/state")
def stream_state() -> dict[str, int]:
    return state.copy()


@app.get("/", include_in_schema=False)
def event_page() -> FileResponse:
    return FileResponse(BASE_DIR / "events.html", media_type="text/html")
