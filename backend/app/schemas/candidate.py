from pydantic import BaseModel, Field


class CandidateProfile(BaseModel):
    candidato_id: str
    nome: str
    cargo: str
    skills: list[str]
    nivel: str
    regiao: str
    modalidades: list[str]
    disponivel: bool
    badge_diversidade: str | None = None
    badge_autodeclarado: bool = False
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)
