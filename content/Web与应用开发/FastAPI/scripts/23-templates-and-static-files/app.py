"""所属章节：23-模板与静态资源
演示知识点：组合本篇已讲解的页面路由、固定数据与静态资源：Jinja2Templates 渲染列表与详情页，挂载 /static，另提供 /api/records
运行命令：python -m uvicorn app:app --app-dir scripts/23-templates-and-static-files --host 127.0.0.1 --port 8230（工作目录 content/Web与应用开发/FastAPI）
期望结果：/ 列出两条记录链接，/records/999 返回 404 与“记录不存在”，/api/records 返回两条 JSON 记录"""

from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


base_path = Path(__file__).resolve().parent
app = FastAPI()
templates = Jinja2Templates(directory=base_path / "templates")
app.mount("/static", StaticFiles(directory=base_path / "static"), name="static")

records = [
    {"id": 1, "title": "模板上下文", "note": "用字典把学习内容传入页面。"},
    {
        "id": 2,
        "title": "自动转义实验",
        "note": "<script>alert('demo')</script><b>学习记录</b>",
    },
]


@app.get("/", response_class=HTMLResponse, name="record_list")
def record_list(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="list.html",
        context={"title": "学习记录", "records": records},
    )


@app.get("/records/{record_id}", response_class=HTMLResponse, name="record_detail")
def record_detail(request: Request, record_id: int):
    for record in records:
        if record["id"] == record_id:
            return templates.TemplateResponse(
                request=request, name="detail.html", context={"record": record}
            )
    raise HTTPException(status_code=404, detail="记录不存在")


@app.get("/api/records")
def record_data() -> list[dict[str, int | str]]:
    return records
