"""所属章节：08-应用组织与配置
演示知识点：应用公开配置及其输入约束：Settings 以 HOC_FASTAPI08_ 前缀读取环境变量，校验 app_name 与范围 1～99 的 revision
运行命令：python -m uvicorn study_api.main:create_app --factory --app-dir scripts/08-application-and-settings --host 127.0.0.1 --port 8080（工作目录 content/Web与应用开发/FastAPI）
期望结果：未设置本章环境变量时 /info 返回“学习记录 API”和 1，revision 越界时创建配置抛出 ValidationError"""

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="HOC_FASTAPI08_")

    app_name: str = "学习记录 API"
    revision: int = Field(default=1, ge=1, le=99)
