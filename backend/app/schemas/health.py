from typing import Literal

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: Literal["ok"] = Field(default="ok", description="Estado atual da API")
    service: str = Field(description="Nome técnico do serviço", examples=["app-bit-api"])
    version: str = Field(description="Versão da API", examples=["0.1.0"])
