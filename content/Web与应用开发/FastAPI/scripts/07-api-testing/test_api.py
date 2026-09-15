"""本章参数化与异步测试的小型文件，使用 python -m pytest 运行。"""
import pytest
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from httpx import ASGITransport, AsyncClient


def create_record_app() -> FastAPI:
    record_app = FastAPI()
    titles = {1: "阅读文档"}

    @record_app.get("/records/{record_id}")
    def read_record(record_id: int):
        if record_id not in titles:
            raise HTTPException(status_code=404, detail="记录不存在")
        return {"id": record_id, "title": titles[record_id]}

    @record_app.post("/records", status_code=201)
    def create_record(title: str):
        record_id = max(titles) + 1
        titles[record_id] = title
        return {"id": record_id, "title": title}

    return record_app


@pytest.mark.parametrize(
    "path,status,expected",
    [
        ("/records/1", 200, {"id": 1, "title": "阅读文档"}),
        ("/records/99", 404, {"detail": "记录不存在"}),
    ],
    ids=["found", "missing"],
)
def test_known_responses(path, status, expected):
    with TestClient(create_record_app()) as client:
        response = client.get(path)
    assert response.status_code == status
    assert response.json() == expected


@pytest.mark.anyio
@pytest.mark.parametrize("anyio_backend", ["asyncio"])
async def test_async_lookup(anyio_backend):
    transport = ASGITransport(app=create_record_app())
    async with AsyncClient(
        transport=transport, base_url="http://test"
    ) as client:
        response = await client.get("/records/1")
    assert response.status_code == 200
    assert response.json() == {"id": 1, "title": "阅读文档"}
