from fastapi import APIRouter

from app.repositories.candidates import load_candidates
from app.schemas.insights import InsightsResponse
from app.services.insights import build_mock_insights


router = APIRouter(tags=["insights"])


@router.get(
    "/insights",
    response_model=InsightsResponse,
    summary="Consultar concentração de talentos",
    description=(
        "Agrupa os candidatos mockados por região. A resposta identifica a fonte "
        "e não apresenta conectividade como dado Vísent antes da integração da fase 2."
    ),
    response_description="Concentração regional e fontes utilizadas",
)
async def get_insights() -> InsightsResponse:
    return build_mock_insights(load_candidates())
