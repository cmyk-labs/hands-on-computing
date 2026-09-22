"""所属章节：10-数据库与增删改查
演示知识点：为数据库章节的进程重启实验提供创建和读取接口：create_app 按 FASTAPI_DATABASE_PATH 创建 SQLite Engine，POST /records 落库、GET /records/{record_id} 读取
运行命令：python -m uvicorn app:create_app --factory --app-dir scripts/10-database-and-crud --host 127.0.0.1 --port 8100（工作目录 content/Web与应用开发/FastAPI）
期望结果：重启服务后再次 GET 已创建记录仍返回数据，已提交记录不随进程退出丢失"""

from contextlib import asynccontextmanager
import os
from pathlib import Path
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine


class Record(SQLModel, table=True):
    """与 Notebook 中同名 SQLite 表保持相同结构。"""

    __tablename__ = "learning_record"

    id: int | None = Field(default=None, primary_key=True)
    title: str
    note: str | None = None


class RecordCreate(SQLModel):
    title: str = Field(min_length=1)
    note: str | None = None


class RecordPublic(SQLModel):
    id: int
    title: str
    note: str | None


def create_app() -> FastAPI:
    """读取本章指定的数据库路径，创建应用；导入模块不会监听端口。"""
    # 引擎随应用创建，数据库文件路径由本章启动环境传入。
    database_path = Path(os.environ["FASTAPI_DATABASE_PATH"]).resolve()
    engine = create_engine(
        f"sqlite:///{database_path.as_posix()}",
        connect_args={"check_same_thread": False},
    )

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        # 启动时建表，应用退出时释放引擎持有的连接资源。
        try:
            SQLModel.metadata.create_all(engine)
            yield
        finally:
            engine.dispose()

    app = FastAPI(lifespan=lifespan)

    def get_session():
        with Session(engine) as session:
            yield session

    @app.post("/records", response_model=RecordPublic, status_code=201)
    def create_record(
        payload: RecordCreate,
        session: Annotated[Session, Depends(get_session)],
    ):
        record = Record.model_validate(payload)
        # 写入并提交后刷新，取得数据库生成的编号。
        session.add(record)
        session.commit()
        session.refresh(record)
        return record

    @app.get("/records/{record_id}", response_model=RecordPublic)
    def read_record(
        record_id: int,
        session: Annotated[Session, Depends(get_session)],
    ):
        record = session.get(Record, record_id)
        if record is None:
            raise HTTPException(status_code=404, detail="记录不存在")
        return record

    return app
