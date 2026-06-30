from fastapi import APIRouter

from app.schemas.health import HealthResponse


router = APIRouter(tags=["health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Verificar disponibilidade",
    description="Confirma que a API foi inicializada e informa sua versão.",
    response_description="API disponível",
)
async def health_check() -> HealthResponse:
    return HealthResponse(service="app-bit-api", version="0.1.0")
