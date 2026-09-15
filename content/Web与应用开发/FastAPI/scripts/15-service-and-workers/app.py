"""用 PID、计数和一个临时资源观察 Uvicorn 服务进程。"""
from contextlib import asynccontextmanager
import logging
import os
from tempfile import TemporaryFile

from fastapi import FastAPI, Request


LABEL = "v1"
logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """每个应用实例创建资源，并在正常关闭时释放。"""
    app.state.count = 0
    journal = TemporaryFile(mode="w+t", encoding="utf-8")
    app.state.journal = journal
    try:
        with journal:
            journal.write(f"pid={os.getpid()}\n")
            logger.info("startup pid=%d label=%s", os.getpid(), LABEL)
            yield
            logger.info("shutdown pid=%d", os.getpid())
    finally:
        logger.info("closed=%s pid=%d", journal.closed, os.getpid())


app = FastAPI(lifespan=lifespan)


@app.get("/state")
async def read_state(request: Request):
    """查询当前进程的状态，不增加计数。"""
    return {
        "pid": os.getpid(), "count": request.app.state.count, "label": LABEL,
        "journal_closed": request.app.state.journal.closed,
    }


@app.post("/tick")
async def tick(request: Request):
    """只增加当前 worker 的内存计数。"""
    request.app.state.count += 1
    logger.info("tick pid=%d count=%d", os.getpid(), request.app.state.count)
    return {
        "pid": os.getpid(), "count": request.app.state.count, "label": LABEL,
        "journal_closed": request.app.state.journal.closed,
    }
