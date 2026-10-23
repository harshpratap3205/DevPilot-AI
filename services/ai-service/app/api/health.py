from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone
import time

router = APIRouter()
start_time = time.time()

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    uptime: int
    timestamp: str

@router.get("/health", response_model=HealthResponse)
def get_health():
    return HealthResponse(
        status="ok",
        service="devpilot-ai-service",
        version="0.1.0",
        uptime=int(time.time() - start_time),
        timestamp=datetime.now(timezone.utc).isoformat()
    )
