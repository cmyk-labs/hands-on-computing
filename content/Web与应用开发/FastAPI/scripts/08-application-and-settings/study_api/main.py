"""所属章节：08-应用组织与配置
演示知识点：创建应用；模块导入时不读取配置或启动服务器：create_app 工厂装配 /api 记录路由与 /info 信息接口
运行命令：python -m uvicorn study_api.main:create_app --factory --app-dir scripts/08-application-and-settings --host 127.0.0.1 --port 8080（工作目录 content/Web与应用开发/FastAPI）
期望结果：GET /api/records/8 返回 200 且响应体含 record_id: 8，/info 返回应用名称与版本序号"""

from fastapi import FastAPI

from .config import Settings
from .routes import router


def create_app(settings: Settings | None = None) -> FastAPI:
    if settings is None:
        settings = Settings()
    application = FastAPI(title=settings.app_name)
    application.include_router(router, prefix="/api", tags=["records"])

    @application.get("/info", tags=["application"])
    def read_info() -> dict[str, str | int]:
        return {"app_name": settings.app_name, "revision": settings.revision}

    return application
