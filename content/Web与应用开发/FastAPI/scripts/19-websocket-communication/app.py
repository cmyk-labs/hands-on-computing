"""只供本地 WebSocket 教学：两用户、有限回声与连接计数。"""

from pathlib import Path
from secrets import token_urlsafe
from typing import Annotated

from fastapi import (
    Cookie,
    Depends,
    FastAPI,
    HTTPException,
    Response,
    WebSocket,
    WebSocketDisconnect,
    WebSocketException,
)
from fastapi.responses import FileResponse

app = FastAPI()
allowed_origin = "http://127.0.0.1:8190"
session_tokens = {user: token_urlsafe(16) for user in ("alice", "bob")}
session_users = {token: user for user, token in session_tokens.items()}
connections: set[WebSocket] = set()


@app.get("/")
def page() -> FileResponse:
    """页面与此模块放在同一目录。"""
    return FileResponse(Path(__file__).with_name("index.html"))


@app.post("/demo-session/{user}")
def set_demo_session(user: str, response: Response) -> dict:
    """仅建立虚构用户的演示 Cookie，不作为账号登录接口。"""
    if user not in session_tokens:
        raise HTTPException(404, "演示用户不存在")
    response.set_cookie(
        "fastapi_ws_demo", session_tokens[user],
        path="/ws", httponly=True, samesite="strict",
    )
    return {"user": user}


@app.delete("/demo-session", status_code=204)
def clear_demo_session() -> Response:
    """删除浏览器的演示 Cookie；已有连接仍需主动关闭。"""
    response = Response(status_code=204)
    response.delete_cookie("fastapi_ws_demo", path="/ws", httponly=True, samesite="strict")
    return response


async def get_demo_user(
    websocket: WebSocket,
    session: Annotated[str | None, Cookie(alias="fastapi_ws_demo")] = None,
) -> str:
    if websocket.headers.get("origin") != allowed_origin:
        raise WebSocketException(code=1008)
    user = session_users.get(session)
    if user is None:
        raise WebSocketException(code=1008)
    return user


DemoUser = Annotated[str, Depends(get_demo_user)]


@app.websocket("/ws")
async def managed_echo(websocket: WebSocket, user: DemoUser):
    """每条连接最多三条文字消息，任何退出路径都移除连接。"""
    await websocket.accept()
    connections.add(websocket)
    try:
        for number in range(1, 4):
            message = await websocket.receive()
            if message["type"] == "websocket.disconnect":
                return
            if "text" not in message:
                raise WebSocketException(code=1003)
            text = message["text"]
            if len(text) > 80:
                raise WebSocketException(code=1009)
            await websocket.send_json({"user": user, "number": number, "text": text})
        await websocket.close(code=1000)
    except WebSocketDisconnect:
        pass  # 发送时也可能遇到对端断开，仍执行 finally。
    finally:
        connections.discard(websocket)


@app.get("/connections")
async def count_connections() -> dict:
    """只观察本进程数量，不公开连接或凭据。"""
    return {"active": len(connections)}
