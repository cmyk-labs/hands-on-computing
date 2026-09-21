"""所属章节：22-OpenAPI 扩展与客户端生成
演示知识点：把正文逐步定义的最终接口与文档扩展合并：operation_id、标签、404 Problem 响应模型、x-owner 扩展与 custom_openapi 注入 x-course
运行命令：python -m uvicorn app:app --app-dir scripts/22-openapi-and-client --host 127.0.0.1 --port 8220（工作目录 content/Web与应用开发/FastAPI）
期望结果：服务发布的 /openapi.json 与正文 app.openapi() 一致，GET /records/1 返回记录、其他编号返回 404"""

from fastapi import FastAPI, HTTPException
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel


class Record(BaseModel):
    id: int
    title: str


app = FastAPI(
    title="Study API",
    version="1.0.0",
    description="查询一条用于学习的记录。",
    openapi_tags=[{"name": "records", "description": "学习记录查询"}],
)


class Problem(BaseModel):
    detail: str


@app.get(
    "/records/{record_id}",
    response_model=Record,
    operation_id="read_record",
    tags=["records"],
    summary="按编号查询记录",
    responses={404: {"model": Problem, "description": "记录不存在"}},
    openapi_extra={"x-owner": "learning-team"},
)
def read_record(record_id: int) -> Record:
    if record_id != 1:
        raise HTTPException(status_code=404, detail="record not found")
    return Record(id=1, title="学习 OpenAPI")


def custom_openapi() -> dict:
    if app.openapi_schema is not None:
        return app.openapi_schema
    schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
        tags=app.openapi_tags,
    )
    schema["info"]["x-course"] = "FastAPI"
    app.openapi_schema = schema
    return schema


app.openapi = custom_openapi
