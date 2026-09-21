"""所属章节：15-服务运行与多进程部署
演示知识点：用 PID、计数和一个临时资源观察 Uvicorn 服务进程：lifespan 创建并释放临时文件，GET /state 查询、POST /tick 递增进程内计数
运行命令：python -m uvicorn app:app --app-dir scripts/15-service-and-workers --host 127.0.0.1 --port 8150 --workers 1 --log-level info --timeout-graceful-shutdown 5（工作目录 content/Web与应用开发/FastAPI）
期望结果：三次 POST /tick 属于同一 PID 且计数为 1、2、3，重启后计数归零，日志按 PID 记录 startup、shutdown 与资源关闭"""
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
