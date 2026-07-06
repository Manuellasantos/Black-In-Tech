from collections import Counter, defaultdict

from app.schemas.candidate import CandidateProfile
from app.schemas.insights import InsightsResponse, MapaTalentoItem


def build_mock_insights(candidates: tuple[CandidateProfile, ...]) -> InsightsResponse:
    grouped: dict[str, list[CandidateProfile]] = defaultdict(list)
    for candidate in candidates:
        grouped[candidate.regiao].append(candidate)

    map_items = []
    for region, region_candidates in grouped.items():
        skills = Counter(skill for candidate in region_candidates for skill in candidate.skills)
        map_items.append(
            MapaTalentoItem(
                regiao=region,
                concentracao=len(region_candidates),
                cobertura_rede="pendente_integracao_visent",
                perfis_disponiveis=[skill for skill, _ in skills.most_common(5)],
                lat=round(sum(candidate.lat for candidate in region_candidates) / len(region_candidates), 6),
                lng=round(sum(candidate.lng for candidate in region_candidates) / len(region_candidates), 6),
            )
        )
    map_items.sort(key=lambda item: (-item.concentracao, item.regiao))
    return InsightsResponse(
        mapa_talentos=map_items,
        fonte_talentos="candidatos_mockados_app_bit",
        fonte_conectividade="integração Vísent planejada para a fase 2",
    )
