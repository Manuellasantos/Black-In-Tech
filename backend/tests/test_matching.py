from app.repositories.candidates import load_candidates
from app.schemas.match import FiltrosInput, MatchRequest, VagaInput
from app.services.matching import calculate_match, run_matching
from app.services.normalization import normalize_level, normalize_region, normalize_skill


def build_request(*, anti_bias: bool = True, diversity_minimum: float = 40) -> MatchRequest:
    return MatchRequest(
        empresa_id="empresa-demo",
        vaga=VagaInput(
            titulo="Desenvolvedor Front-end",
            skills=["React", "TypeScript", "CSS"],
            nivel="junior",
            regiao="Grande Florianópolis",
            modalidade="hibrido",
        ),
        filtros=FiltrosInput(
            anti_vies=anti_bias,
            diversidade_minima=diversity_minimum,
            limite=20,
        ),
    )


def test_normalizes_common_aliases() -> None:
    assert normalize_skill("Node.js") == "nodejs"
    assert normalize_skill("ReactJS") == "react"
    assert normalize_level("Sênior") == "senior"
    assert normalize_region("São José") == "grande florianopolis"


def test_exact_candidate_reaches_maximum_score() -> None:
    candidate = load_candidates()[0]

    result = calculate_match(candidate, build_request())

    assert result.score_match == 100
    assert result.score_breakdown.skills == 60
    assert result.score_breakdown.senioridade == 20
    assert result.score_breakdown.regiao_modalidade == 15
    assert result.score_breakdown.disponibilidade == 5


def test_results_are_sorted_by_score_descending() -> None:
    response = run_matching(build_request(), load_candidates())
    scores = [candidate.score_match for candidate in response.candidatos]

    assert scores == sorted(scores, reverse=True)
    assert response.candidatos[0].candidato_id == "cand-001"


def test_anti_bias_anonymizes_without_changing_ranking_or_score() -> None:
    biased_view = run_matching(build_request(anti_bias=False), load_candidates())
    blind_view = run_matching(build_request(anti_bias=True), load_candidates())

    assert [item.candidato_id for item in blind_view.candidatos] == [
        item.candidato_id for item in biased_view.candidatos
    ]
    assert [item.score_match for item in blind_view.candidatos] == [
        item.score_match for item in biased_view.candidatos
    ]
    assert blind_view.candidatos[0].nome == "Candidato 001"
    assert biased_view.candidatos[0].nome == "Ana Martins"


def test_identity_fields_do_not_affect_candidate_score() -> None:
    candidate = load_candidates()[0]
    changed_identity = candidate.model_copy(
        update={
            "nome": "Nome Diferente",
            "badge_diversidade": None,
            "badge_autodeclarado": False,
        }
    )

    original_result = calculate_match(candidate, build_request())
    changed_result = calculate_match(changed_identity, build_request())

    assert original_result.score_match == changed_result.score_match
    assert original_result.score_breakdown == changed_result.score_breakdown


def test_diversity_target_does_not_filter_qualified_candidates() -> None:
    no_target = run_matching(build_request(diversity_minimum=0), load_candidates())
    maximum_target = run_matching(build_request(diversity_minimum=100), load_candidates())

    assert [item.candidato_id for item in no_target.candidatos] == [
        item.candidato_id for item in maximum_target.candidatos
    ]
    assert no_target.diversidade_resultado.meta_atingida is True
    assert maximum_target.diversidade_resultado.meta_diversidade == 100
