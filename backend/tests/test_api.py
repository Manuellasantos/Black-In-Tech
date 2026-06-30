import asyncio
from typing import Any

import httpx

from app.main import app


MATCH_PAYLOAD = {
    "empresa_id": "empresa-demo",
    "vaga": {
        "titulo": "Desenvolvedor Front-end",
        "skills": ["React", "TypeScript", "CSS"],
        "nivel": "junior",
        "regiao": "Grande Florianópolis",
        "modalidade": "hibrido",
    },
    "filtros": {
        "anti_vies": True,
        "diversidade_minima": 40,
    },
}


async def async_request(method: str, path: str, json: Any = None) -> httpx.Response:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        return await client.request(method, path, json=json)


def request(method: str, path: str, json: Any = None) -> httpx.Response:
    return asyncio.run(async_request(method, path, json=json))


def test_health_is_available_with_and_without_version_prefix() -> None:
    root_response = request("GET", "/health")
    versioned_response = request("GET", "/api/v1/health")

    assert root_response.status_code == 200
    assert versioned_response.status_code == 200
    assert root_response.json()["status"] == "ok"


def test_match_contract_and_public_alias() -> None:
    response = request("POST", "/match", json=MATCH_PAYLOAD)
    versioned_response = request("POST", "/api/v1/match", json=MATCH_PAYLOAD)

    assert response.status_code == 200
    assert versioned_response.status_code == 200
    body = response.json()
    assert body["total_analisados"] == 24
    assert len(body["candidatos"]) == 10
    assert body["candidatos"][0]["score_match"] == 100
    assert body["candidatos"][0]["anonimizado"] is True
    assert "score_breakdown" in body["candidatos"][0]
    assert body["diversidade_resultado"]["criterio"]


def test_match_rejects_empty_skills() -> None:
    payload = MATCH_PAYLOAD | {"vaga": MATCH_PAYLOAD["vaga"] | {"skills": []}}

    response = request("POST", "/match", json=payload)

    assert response.status_code == 422


def test_insights_exposes_mock_source_without_claiming_visent_data() -> None:
    response = request("GET", "/insights")

    assert response.status_code == 200
    body = response.json()
    assert sum(item["concentracao"] for item in body["mapa_talentos"]) == 24
    assert body["fonte_talentos"] == "candidatos_mockados_app_bit"
    assert "planejada" in body["fonte_conectividade"]


def test_openapi_documents_contract_examples_and_endpoints() -> None:
    response = request("GET", "/openapi.json")

    assert response.status_code == 200
    schema = response.json()
    match_operation = schema["paths"]["/api/v1/match"]["post"]
    assert match_operation["summary"] == "Gerar shortlist de candidatos"
    assert match_operation["description"]
    assert schema["components"]["schemas"]["MatchRequest"]["examples"]
    assert schema["components"]["schemas"]["MatchResponse"]["examples"]
    assert {tag["name"] for tag in schema["tags"]} == {"health", "matching", "insights"}
