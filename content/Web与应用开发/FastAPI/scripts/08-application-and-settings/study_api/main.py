"""创建应用；模块导入时不读取配置或启动服务器。"""

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
