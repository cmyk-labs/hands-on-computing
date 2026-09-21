"""所属章节：01-HTTP 接口与 FastAPI 运行
演示知识点：供 Uvicorn 导入的最小应用：GET /hello 查询参数问候与 POST /echo 字典请求体回显
运行命令：python -m uvicorn app:app --app-dir scripts/01-http-api-and-fastapi --host 127.0.0.1 --port 8010（工作目录 content/Web与应用开发/FastAPI）
期望结果：GET /hello?name=Lin 返回 200 与 {"message": "你好，Lin"}，/docs 与 /openapi.json 列出两条路由
"""

from fastapi import FastAPI

app = FastAPI()


@app.get("/hello")
def hello(name: str = "读者") -> dict[str, str]:
    return {"message": f"你好，{name}"}


@app.post("/echo")
def echo(payload: dict[str, str]) -> dict[str, str]:
    return payload
