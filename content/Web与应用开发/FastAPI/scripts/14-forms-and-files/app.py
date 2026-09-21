"""所属章节：14-表单与文件处理
演示知识点：本章原生表单页面与小文本接口：Form 字段约束、.txt 上传校验（1024 字节、UTF-8）、finally 中关闭文件、示例下载与页面路由
运行命令：python -m uvicorn app:app --app-dir scripts/14-forms-and-files --host 127.0.0.1 --port 8140（工作目录 content/Web与应用开发/FastAPI）
期望结果：提交标题与上传 example.txt 返回含 filename、bytes、text 的 JSON，超限或非 UTF-8 文件返回 4xx"""

from pathlib import Path
from typing import Annotated

from fastapi import FastAPI, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse


BASE_DIR = Path(__file__).resolve().parent
MAX_BYTES = 1024
app = FastAPI(title="表单与文件")


@app.post("/form-note")
def form_note(title: Annotated[str, Form(min_length=1, max_length=30)]) -> dict[str, str]:
    return {"title": title}


@app.post("/upload-note")
async def upload_note(
    title: Annotated[str, Form(min_length=1, max_length=30)],
    upload: UploadFile,
) -> dict[str, str | int]:
    try:
        if not upload.filename or not upload.filename.lower().endswith(".txt"):
            raise HTTPException(400, "只接受 .txt 文件")
        data = await upload.read(MAX_BYTES + 1)
        if len(data) > MAX_BYTES:
            raise HTTPException(413, "文件不能超过 1024 字节")
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError as error:
            raise HTTPException(422, "文件必须采用 UTF-8 编码") from error
        return {
            "title": title,
            "filename": upload.filename,
            "bytes": len(data),
            "text": text,
        }
    finally:
        # 路由接管文件以后，无论返回还是抛出异常，都关闭文件。
        await upload.close()


@app.get("/example/download")
def download_example() -> FileResponse:
    return FileResponse(
        BASE_DIR / "example.txt", media_type="text/plain", filename="example.txt"
    )


@app.get("/", include_in_schema=False)
def form_page() -> FileResponse:
    return FileResponse(BASE_DIR / "forms.html", media_type="text/html")
