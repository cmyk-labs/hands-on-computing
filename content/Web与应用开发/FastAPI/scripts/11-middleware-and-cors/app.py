"""本地 CORS 实验 API；由 Uvicorn 导入并运行。"""
import logging
from uuid import uuid4

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware


api = FastAPI()
logger = logging.getLogger("uvicorn.error")
hits = {"simple": 0, "json": 0}


@api.middleware("http")
async def identify_request(request: Request, call_next):
    """给实际应用请求分配标识，记录方法、路径与返回状态。"""
    request_id = uuid4().hex
    request.state.request_id = request_id
    logger.info("request %s %s id=%s", request.method, request.url.path, request_id)
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    logger.info("response status=%s id=%s", response.status_code, request_id)
    return response


@api.get("/simple")
async def simple(request: Request):
    """计数已进入路由的 GET，包括浏览器无法读取响应的请求。"""
    hits["simple"] += 1
    return {"request_id": request.state.request_id, "visits": hits["simple"]}


@api.post("/json")
async def json_echo(payload: dict[str, str]):
    """计数实际 POST；CORS 预检不会进入这里。"""
    hits["json"] += 1
    return payload


@api.get("/stats")
async def statistics():
    """返回当前进程的演示计数；重启服务后归零。"""
    return dict(hits)


@api.post("/cookie")
async def set_demo_cookie(response: Response):
    """设置最长保留 300 秒的测试标记，不创建登录会话。"""
    response.set_cookie(
        "lesson11", "demo", max_age=300, httponly=True, samesite="lax",
    )
    return {"cookie_set": True}


@api.get("/credentials")
async def read_credentials(request: Request):
    """只报告是否收到测试标记，不将它解释为认证结果。"""
    return {"demo_cookie_received": request.cookies.get("lesson11") == "demo"}


@api.delete("/cookie")
async def clear_demo_cookie(response: Response):
    """清理测试 Cookie。"""
    response.delete_cookie("lesson11", httponly=True, samesite="lax")
    return {"cookie_cleared": True}


# CORS 位于应用外层，预检在这里完成；Uvicorn 仍会记录 OPTIONS 访问日志。
app = CORSMiddleware(
    api,
    allow_origins=["http://127.0.0.1:8111"],
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Content-Type"],
    allow_credentials=True,
    expose_headers=["X-Request-ID"],
    max_age=0,
)
