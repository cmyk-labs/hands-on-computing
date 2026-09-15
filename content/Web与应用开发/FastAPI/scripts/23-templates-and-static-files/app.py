"""本地固定学习记录：HTML 模板与静态资源。"""

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
