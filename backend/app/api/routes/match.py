from fastapi import APIRouter

from app.repositories.candidates import load_candidates
from app.schemas.match import MatchRequest, MatchResponse
from app.services.matching import run_matching


router = APIRouter(tags=["matching"])


@router.post(
    "/match",
    response_model=MatchResponse,
    summary="Gerar shortlist de candidatos",
    description=(
        "Calcula a compatibilidade por skills, senioridade, região, modalidade e "
        "disponibilidade. Quando `anti_vies` está ativo, o nome é anonimizado. "
        "Badges autodeclarados não alteram score ou elegibilidade."
    ),
    response_description="Shortlist ordenada por score de compatibilidade",
    responses={
        422: {
            "description": "Dados da vaga ou filtros inválidos",
        }
    },
)
async def match_candidates(request: MatchRequest) -> MatchResponse:
    return run_matching(request, load_candidates())
