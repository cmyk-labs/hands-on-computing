"""两条用于观察路径组织的记录接口。"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/records")
def list_records() -> list[dict[str, str]]:
    return [{"title": "练习路由"}, {"title": "整理配置"}]


@router.get("/records/{record_id}")
def read_record(record_id: int) -> dict[str, int]:
    return {"record_id": record_id}
