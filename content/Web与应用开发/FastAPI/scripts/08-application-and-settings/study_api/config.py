"""应用公开配置及其输入约束。"""

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="HOC_FASTAPI08_")

    app_name: str = "学习记录 API"
    revision: int = Field(default=1, ge=1, le=99)
