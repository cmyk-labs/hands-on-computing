"""所属章节：16-API 综合交付实践
演示知识点：复用正文的输入、归属检查与 SQLite 事务，通过独立 Uvicorn 进程交付 HTTP API
运行命令：python scripts/16-api-delivery/app.py --stdin-stop（工作目录 content/Web与应用开发/FastAPI；由 Notebook 提供 DELIVERY_ 环境输入）
期望结果：真实请求完成创建与授权检查，正常退出记录 delivery disposed，重启后读到已提交记录
"""

import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Request, Response, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, ConfigDict, Field as ValidationField
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import UniqueConstraint
from sqlalchemy.exc import IntegrityError
from sqlmodel import Field, Session, SQLModel, create_engine, select


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="DELIVERY_")
    database_path: Path


settings = Settings()


class Record(SQLModel, table=True):
    __tablename__ = "delivery_record"
    __table_args__ = (UniqueConstraint("owner_id", "title"),)

    id: int | None = Field(default=None, primary_key=True)
    title: str
    owner_id: str


class RecordInput(BaseModel):
    model_config = ConfigDict(extra="forbid")
    title: str = ValidationField(min_length=1, max_length=80)


class RecordOutput(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str


class ErrorBody(BaseModel):
    detail: str


errors = {
    code: {"model": ErrorBody} for code in (401, 403, 404, 409)
}


logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = create_engine(
        f"sqlite:///{settings.database_path.as_posix()}",
        connect_args={"check_same_thread": False},
    )
    try:
        SQLModel.metadata.create_all(engine)
        app.state.engine = engine
        logger.info("delivery startup pid=%d", os.getpid())
        yield
    finally:
        engine.dispose()
        app.state.engine = None
        logger.info("delivery disposed pid=%d", os.getpid())


app = FastAPI(title="学习记录 API", lifespan=lifespan)


def get_session(request: Request):
    with Session(request.app.state.engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


tokens = {name: os.environ[f"DELIVERY_{name.upper()}_TOKEN"] for name in ("alice", "bob")}
token_users = {token: name for name, token in tokens.items()}
bearer = HTTPBearer(auto_error=False)


def get_user(
    credential: Annotated[HTTPAuthorizationCredentials | None, Security(bearer)],
) -> str:
    user_id = token_users.get(credential.credentials) if credential else None
    if user_id is None:
        raise HTTPException(
            401, "需要有效身份", headers={"WWW-Authenticate": "Bearer"}
        )
    return user_id


CurrentUser = Annotated[str, Security(get_user)]


def find_owned(session: Session, record_id: int, user_id: str) -> Record:
    record = session.get(Record, record_id)
    if record is None:
        raise HTTPException(404, "记录不存在")
    if record.owner_id != user_id:
        raise HTTPException(403, "无权操作这条记录")
    return record


def commit_changes(session: Session) -> None:
    try:
        session.commit()
    except IntegrityError as exc:
        session.rollback()
        raise HTTPException(409, "记录约束冲突") from exc


@app.post(
    "/records", status_code=201, response_model=RecordOutput,
    responses={401: errors[401], 409: errors[409]},
)
def create_record(body: RecordInput, user: CurrentUser, session: SessionDep):
    record = Record(title=body.title, owner_id=user)
    session.add(record)
    commit_changes(session)
    session.refresh(record)
    return RecordOutput.model_validate(record)


@app.get(
    "/records/{record_id}", response_model=RecordOutput,
    responses={401: errors[401], 403: errors[403], 404: errors[404]},
)
def read_record(record_id: int, user: CurrentUser, session: SessionDep):
    record = find_owned(session, record_id, user)
    return RecordOutput.model_validate(record)


@app.patch(
    "/records/{record_id}", response_model=RecordOutput,
    responses={401: errors[401], 403: errors[403], 404: errors[404], 409: errors[409]},
)
def rename_record(
    record_id: int, body: RecordInput, user: CurrentUser, session: SessionDep,
):
    # 更新前先按相同依赖取得身份和会话，再确认记录归属。
    record = find_owned(session, record_id, user)
    record.title = body.title
    commit_changes(session)
    # 提交后刷新对象，再用公开输出模型组织响应。
    session.refresh(record)
    return RecordOutput.model_validate(record)


@app.delete(
    "/records/{record_id}", status_code=204,
    responses={401: errors[401], 403: errors[403], 404: errors[404]},
)
def delete_record(record_id: int, user: CurrentUser, session: SessionDep) -> Response:
    record = find_owned(session, record_id, user)
    # 删除仍复用归属检查；成功返回 204，不附加 JSON 响应体。
    session.delete(record)
    commit_changes(session)
    return Response(status_code=204)


# 本文件是专用服务入口，由 Notebook 启动为独立进程。
import argparse
import sys
import threading

import uvicorn

parser = argparse.ArgumentParser(description="运行本章学习记录 API")
parser.add_argument("--stdin-stop", action="store_true")
args = parser.parse_args()
server = uvicorn.Server(uvicorn.Config(
    app, host="127.0.0.1", port=8160, timeout_graceful_shutdown=5,
))

def stop_on_input():
    """Notebook 发送一行或关闭管道后，请求服务正常退出。"""
    sys.stdin.readline()
    server.should_exit = True

if args.stdin_stop:
    threading.Thread(target=stop_on_input, daemon=True).start()
server.run()
