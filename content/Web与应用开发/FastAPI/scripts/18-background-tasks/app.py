"""本地响应后文件工作实验；由 Uvicorn 导入。"""
from contextlib import asynccontextmanager
import logging
from pathlib import Path
from tempfile import TemporaryDirectory
import threading

from fastapi import BackgroundTasks, FastAPI, HTTPException
from starlette.concurrency import run_in_threadpool

logger = logging.getLogger('uvicorn.error')


@asynccontextmanager
async def lifespan(app: FastAPI):
    with TemporaryDirectory(prefix='fastapi18-service-') as folder:
        app.state.path = Path(folder) / 'note.txt'
        app.state.gate = threading.Event()
        app.state.status = 'idle'
        yield
    logger.info('教学临时目录已删除：%s', not Path(folder).exists())


app = FastAPI(lifespan=lifespan)


def finish_file(fail: bool = False):
    try:
        if not app.state.gate.wait(10):
            raise TimeoutError('未收到继续信号')
        path = app.state.path.parent if fail else app.state.path
        with path.open('w', encoding='utf-8') as stream:
            stream.write('后台文件工作完成')
    except (OSError, TimeoutError):
        app.state.status = 'failed'
        logger.warning('文件任务失败')
    else:
        app.state.status = 'done'


@app.post('/jobs/background', status_code=202)
async def background_job(tasks: BackgroundTasks, fail: bool = False):
    if app.state.status == 'waiting':
        raise HTTPException(409, '已有待完成任务')
    app.state.gate.clear()
    app.state.status = 'waiting'
    tasks.add_task(finish_file, fail)
    return {'status': 'accepted'}


@app.post('/release')
async def release_job():
    app.state.gate.set()
    return {'released': True}


@app.post('/jobs/await')
async def awaited_job():
    if app.state.status == 'waiting':
        raise HTTPException(409, '已有待完成任务')
    app.state.status = 'waiting'
    app.state.gate.set()
    await run_in_threadpool(finish_file)
    return {'status': app.state.status}


@app.get('/state')
def read_state():
    text = None
    if app.state.status == 'done':
        text = app.state.path.read_text(encoding='utf-8')
    return {'status': app.state.status, 'text': text}
