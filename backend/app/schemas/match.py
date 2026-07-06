from pydantic import BaseModel, ConfigDict, Field, field_validator


class VagaInput(BaseModel):
    titulo: str = Field(min_length=2, max_length=120, examples=["Desenvolvedor Front-end"])
    descricao: str | None = Field(default=None, max_length=4_000, examples=["Construção de interfaces acessíveis"])
    skills: list[str] = Field(min_length=1, max_length=30, examples=[["React", "TypeScript", "CSS"]])
    nivel: str = Field(min_length=2, max_length=30, examples=["junior"])
    regiao: str = Field(min_length=2, max_length=120, examples=["Grande Florianópolis"])
    modalidade: str = Field(min_length=2, max_length=30, examples=["hibrido"])

    @field_validator("skills")
    @classmethod
    def validate_skills(cls, skills: list[str]) -> list[str]:
        cleaned = [skill.strip() for skill in skills if skill.strip()]
        if not cleaned:
            raise ValueError("Informe ao menos uma skill válida")
        return list(dict.fromkeys(cleaned))


class FiltrosInput(BaseModel):
    anti_vies: bool = Field(default=True, description="Anonimiza nomes durante a avaliação")
    diversidade_minima: float = Field(
        default=0,
        ge=0,
        le=100,
        description="Meta de representação medida após o ranking; não elimina candidatos",
        examples=[40],
    )
    limite: int = Field(default=10, ge=1, le=20, description="Quantidade máxima da shortlist")


class MatchRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
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
                        "limite": 10,
                    },
                }
            ]
        }
    )

    empresa_id: str = Field(min_length=2, max_length=120, examples=["empresa-demo"])
    vaga: VagaInput
    filtros: FiltrosInput = Field(default_factory=FiltrosInput)


class ScoreBreakdown(BaseModel):
    skills: float = Field(ge=0, le=60)
    senioridade: float = Field(ge=0, le=20)
    regiao_modalidade: float = Field(ge=0, le=15)
    disponibilidade: float = Field(ge=0, le=5)


class CandidatoMatch(BaseModel):
    candidato_id: str
    nome: str
    cargo: str
    score_match: float = Field(ge=0, le=100)
    badge_diversidade: str | None
    skills: list[str]
    nivel: str
    regiao: str
    lat: float
    lng: float
    anonimizado: bool
    score_breakdown: ScoreBreakdown
    explicacoes: list[str]


class DiversidadeResultado(BaseModel):
    total_shortlist: int
    candidatos_com_badge: int
    percentual_representacao: float = Field(ge=0, le=100)
    meta_diversidade: float = Field(ge=0, le=100)
    meta_atingida: bool
    criterio: str


class MatchResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "candidatos": [
                        {
                            "candidato_id": "cand-001",
                            "nome": "Candidato 001",
                            "cargo": "Desenvolvedora Front-end",
                            "score_match": 100,
                            "badge_diversidade": "Mulheres na tecnologia",
                            "skills": ["React", "TypeScript", "CSS", "HTML", "Figma"],
                            "nivel": "Júnior",
                            "regiao": "Grande Florianópolis",
                            "lat": -27.5954,
                            "lng": -48.548,
                            "anonimizado": True,
                            "score_breakdown": {
                                "skills": 60,
                                "senioridade": 20,
                                "regiao_modalidade": 15,
                                "disponibilidade": 5,
                            },
                            "explicacoes": [
                                "Atende 3 de 3 skills solicitadas",
                                "Senioridade compatível",
                            ],
                        }
                    ],
                    "total_analisados": 24,
                    "diversidade_resultado": {
                        "total_shortlist": 10,
                        "candidatos_com_badge": 9,
                        "percentual_representacao": 90,
                        "meta_diversidade": 40,
                        "meta_atingida": True,
                        "criterio": "Badges autodeclarados na shortlist; não altera score nem elegibilidade",
                    },
                }
            ]
        }
    )

    candidatos: list[CandidatoMatch]
    total_analisados: int
    diversidade_resultado: DiversidadeResultado
