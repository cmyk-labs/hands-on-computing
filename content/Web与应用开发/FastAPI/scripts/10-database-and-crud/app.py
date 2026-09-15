"""为数据库章节的进程重启实验提供创建和读取接口。"""

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
    database_path = Path(os.environ["FASTAPI_DATABASE_PATH"]).resolve()
    engine = create_engine(
        f"sqlite:///{database_path.as_posix()}",
        connect_args={"check_same_thread": False},
    )

    @asynccontextmanager
    async def lifespan(app: FastAPI):
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
