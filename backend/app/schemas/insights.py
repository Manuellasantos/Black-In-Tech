from pydantic import BaseModel, ConfigDict


class MapaTalentoItem(BaseModel):
    regiao: str
    concentracao: int
    cobertura_rede: str
    perfis_disponiveis: list[str]
    lat: float
    lng: float


class InsightsResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "mapa_talentos": [
                        {
                            "regiao": "Grande Florianópolis",
                            "concentracao": 10,
                            "cobertura_rede": "pendente_integracao_visent",
                            "perfis_disponiveis": ["React", "TypeScript", "CSS"],
                            "lat": -27.6,
                            "lng": -48.58,
                        }
                    ],
                    "fonte_talentos": "candidatos_mockados_app_bit",
                    "fonte_conectividade": "integração Vísent planejada para a fase 2",
                }
            ]
        }
    )

    mapa_talentos: list[MapaTalentoItem]
    fonte_talentos: str
    fonte_conectividade: str
