"""所属章节：18-响应后的后台任务
演示知识点：本地响应后文件工作实验：BackgroundTasks 注册由 /release 放行的文件任务，/jobs/await 对照等待式执行，/state 查询任务状态
运行命令：python -m uvicorn app:app --app-dir scripts/18-background-tasks --host 127.0.0.1 --port 8180（工作目录 content/Web与应用开发/FastAPI）
期望结果：POST /jobs/background 立即返回 202，/release 后 /state 变为 done 且文本为“后台文件工作完成”，失败路径 status 为 failed"""
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
        # 路径、放行信号和状态属于本应用实例，临时目录跟随生命周期。
        app.state.path = Path(folder) / 'note.txt'
        app.state.gate = threading.Event()
        app.state.status = 'idle'
        yield
    # 预期：正常退出后日志显示教学临时目录已删除：True。
    logger.info('教学临时目录已删除：%s', not Path(folder).exists())


app = FastAPI(lifespan=lifespan)


def finish_file(fail: bool = False):
    # 等待 /release 放行；fail 分支故意把目录当文件，演示后台失败状态。
    try:
        if not app.state.gate.wait(10):
            raise TimeoutError('未收到继续信号')
        path = app.state.path.parent if fail else app.state.path
        with path.open('w', encoding='utf-8') as stream:
            stream.write('后台文件工作完成')
    except (OSError, TimeoutError):
        app.state.status = 'failed'
        # 预期：故意触发文件错误或等待超时时显示警告，任务状态为 failed。
        logger.warning('文件任务失败')
    else:
        app.state.status = 'done'


@app.post('/jobs/background', status_code=202)
async def background_job(tasks: BackgroundTasks, fail: bool = False):
    if app.state.status == 'waiting':
        raise HTTPException(409, '已有待完成任务')
    app.state.gate.clear()
    app.state.status = 'waiting'
    # 此处只登记工作，响应发送后才执行；等待式端点则直接 await 工作完成。
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
