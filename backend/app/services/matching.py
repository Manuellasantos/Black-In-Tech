from app.schemas.candidate import CandidateProfile
from app.schemas.match import (
    CandidatoMatch,
    DiversidadeResultado,
    MatchRequest,
    MatchResponse,
    ScoreBreakdown,
)
from app.services.normalization import (
    normalize_level,
    normalize_modality,
    normalize_region,
    normalize_skill,
)


LEVEL_ORDER = {"junior": 1, "pleno": 2, "senior": 3}


def calculate_match(candidate: CandidateProfile, request: MatchRequest) -> CandidatoMatch:
    required_skills = {normalize_skill(skill) for skill in request.vaga.skills}
    candidate_skills = {normalize_skill(skill) for skill in candidate.skills}
    matched_skills = required_skills & candidate_skills
    skills_score = 60 * len(matched_skills) / len(required_skills)

    requested_level = normalize_level(request.vaga.nivel)
    candidate_level = normalize_level(candidate.nivel)
    level_distance = abs(LEVEL_ORDER.get(requested_level, 0) - LEVEL_ORDER.get(candidate_level, 0))
    seniority_score = 20 if requested_level == candidate_level else 10 if level_distance == 1 else 0

    requested_modality = normalize_modality(request.vaga.modalidade)
    candidate_modalities = {normalize_modality(item) for item in candidate.modalidades}
    modality_score = 5 if requested_modality in candidate_modalities else 0
    region_matches = normalize_region(request.vaga.regiao) == normalize_region(candidate.regiao)
    location_score = 10 if region_matches or requested_modality == "remoto" else 0
    region_modality_score = location_score + modality_score

    availability_score = 5 if candidate.disponivel else 0
    breakdown = ScoreBreakdown(
        skills=round(skills_score, 2),
        senioridade=seniority_score,
        regiao_modalidade=region_modality_score,
        disponibilidade=availability_score,
    )
    total_score = round(sum(breakdown.model_dump().values()), 2)
    badge = candidate.badge_diversidade if candidate.badge_autodeclarado else None

    return CandidatoMatch(
        candidato_id=candidate.candidato_id,
        nome=_display_name(candidate, request.filtros.anti_vies),
        cargo=candidate.cargo,
        score_match=total_score,
        badge_diversidade=badge,
        skills=candidate.skills,
        nivel=candidate.nivel,
        regiao=candidate.regiao,
        lat=candidate.lat,
        lng=candidate.lng,
        anonimizado=request.filtros.anti_vies,
        score_breakdown=breakdown,
        explicacoes=_build_explanations(
            matched_count=len(matched_skills),
            required_count=len(required_skills),
            seniority_score=seniority_score,
            region_matches=region_matches,
            modality_matches=modality_score > 0,
            remote_job=requested_modality == "remoto",
            available=candidate.disponivel,
        ),
    )


def run_matching(
    request: MatchRequest,
    candidates: tuple[CandidateProfile, ...],
) -> MatchResponse:
    ranked = [calculate_match(candidate, request) for candidate in candidates]
    ranked.sort(key=lambda item: (-item.score_match, item.candidato_id))
    shortlist = ranked[: request.filtros.limite]
    diversity = _calculate_diversity(shortlist, request.filtros.diversidade_minima)
    return MatchResponse(
        candidatos=shortlist,
        total_analisados=len(candidates),
        diversidade_resultado=diversity,
    )


def _display_name(candidate: CandidateProfile, anti_bias: bool) -> str:
    if not anti_bias:
        return candidate.nome
    numeric_id = candidate.candidato_id.removeprefix("cand-")
    return f"Candidato {numeric_id}"


def _build_explanations(
    matched_count: int,
    required_count: int,
    seniority_score: float,
    region_matches: bool,
    modality_matches: bool,
    remote_job: bool,
    available: bool,
) -> list[str]:
    explanations = [f"Atende {matched_count} de {required_count} skills solicitadas"]
    if seniority_score == 20:
        explanations.append("Senioridade compatível")
    elif seniority_score == 10:
        explanations.append("Senioridade adjacente à solicitada")
    else:
        explanations.append("Senioridade distante da solicitada")
    if region_matches:
        explanations.append("Região compatível")
    elif remote_job:
        explanations.append("Localização flexível para vaga remota")
    else:
        explanations.append("Região diferente da solicitada")
    explanations.append("Modalidade compatível" if modality_matches else "Modalidade não informada como disponível")
    explanations.append("Disponível para oportunidades" if available else "Disponibilidade futura")
    return explanations


def _calculate_diversity(
    shortlist: list[CandidatoMatch],
    minimum: float,
) -> DiversidadeResultado:
    represented = sum(candidate.badge_diversidade is not None for candidate in shortlist)
    percentage = round(100 * represented / len(shortlist), 2) if shortlist else 0
    return DiversidadeResultado(
        total_shortlist=len(shortlist),
        candidatos_com_badge=represented,
        percentual_representacao=percentage,
        meta_diversidade=minimum,
        meta_atingida=percentage >= minimum,
        criterio="Badges autodeclarados na shortlist; não altera score nem elegibilidade",
    )
