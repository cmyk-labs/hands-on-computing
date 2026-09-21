"""所属章节：08-应用组织与配置
演示知识点：两条用于观察路径组织的记录接口：APIRouter 提供 GET /records 列表与 GET /records/{record_id} 查询
运行命令：python -m uvicorn study_api.main:create_app --factory --app-dir scripts/08-application-and-settings --host 127.0.0.1 --port 8080（工作目录 content/Web与应用开发/FastAPI）
期望结果：经 include_router 的 /api 前缀访问，GET /api/records/8 返回 200 与 record_id: 8"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/records")
def list_records() -> list[dict[str, str]]:
    return [{"title": "练习路由"}, {"title": "整理配置"}]


@router.get("/records/{record_id}")
def read_record(record_id: int) -> dict[str, int]:
    return {"record_id": record_id}
