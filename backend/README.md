# App BiT API

API do MVP B2B para matching inclusivo, explicável e independente de serviços pagos.

## Requisitos

- Python 3.12+
- pip

## Execução local

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev]'
cp .env.example .env
uvicorn app.main:app --reload
```

A documentação interativa estará disponível após iniciar a API:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI JSON: `http://localhost:8000/openapi.json`

O Swagger permite preencher o contrato de exemplo e executar `/match` diretamente pelo navegador.

## Testes

```bash
cd backend
pytest
```

## Endpoints

Os endpoints principais usam o prefixo `/api/v1`. Os aliases `/health`, `/match` e `/insights` também estão disponíveis para compatibilidade com o contrato do desafio.

- `GET /health`
- `POST /match`
- `GET /insights`
- `GET /api/v1/health`
- `POST /api/v1/match`
- `GET /api/v1/insights`

## Status das funcionalidades exigidas

| Funcionalidade | Status | Evidência / pendência |
|---|---|---|
| Publicação de vaga com skills, nível e região | Parcial | O formulário responsivo existe e `/match` recebe a vaga completa. A chamada do frontend e a persistência da vaga ainda serão integradas. |
| `/match` com shortlist, score e badge | Implementado | Retorna ranking, breakdown, explicações, badge autodeclarado e coordenadas. |
| Interface responsiva com shortlist | Parcial | A tela existe no frontend, mas ainda usa candidatos locais em vez da resposta da API. |
| Métricas básicas de diversidade | Implementado no backend | `/match` retorna representação, meta e status. O dashboard ainda usa valores estáticos. |
| README com execução e exemplos | Implementado | Este documento contém instalação, execução, endpoints e request/response. |
| Swagger / OpenAPI | Implementado | Disponível em `/docs`, `/redoc` e `/openapi.json`. |

O backend da fase 1 está funcional. Para considerar o MVP integrado, ainda é necessário conectar as telas `PublicarVaga` e `Resultados` ao endpoint `/match`.

## Exemplo de matching

```bash
curl -X POST http://localhost:8000/match \
  -H 'Content-Type: application/json' \
  -d '{
    "empresa_id": "empresa-demo",
    "vaga": {
      "titulo": "Desenvolvedor Front-end",
      "skills": ["React", "TypeScript", "CSS"],
      "nivel": "junior",
      "regiao": "Grande Florianópolis",
      "modalidade": "hibrido"
    },
    "filtros": {
      "anti_vies": true,
      "diversidade_minima": 40
    }
  }'
```

Resposta resumida:

```json
{
  "candidatos": [
    {
      "candidato_id": "cand-001",
      "nome": "Candidato 001",
      "score_match": 100,
      "badge_diversidade": "Mulheres na tecnologia",
      "score_breakdown": {
        "skills": 60,
        "senioridade": 20,
        "regiao_modalidade": 15,
        "disponibilidade": 5
      },
      "explicacoes": [
        "Atende 3 de 3 skills solicitadas",
        "Senioridade compatível"
      ]
    }
  ],
  "total_analisados": 24,
  "diversidade_resultado": {
    "total_shortlist": 10,
    "candidatos_com_badge": 9,
    "percentual_representacao": 90,
    "meta_diversidade": 40,
    "meta_atingida": true,
    "criterio": "Badges autodeclarados na shortlist; não altera score nem elegibilidade"
  }
}
```

## Critérios do score

| Critério | Peso máximo |
|---|---:|
| Skills | 60 |
| Senioridade | 20 |
| Região e modalidade | 15 |
| Disponibilidade | 5 |

Campos identitários, nome e badges não participam do cálculo. `diversidade_minima` mede a composição da shortlist e não elimina candidatos.

## Dados

Nesta fase, os talentos vêm de `app/data/candidates.json`. O endpoint `/insights` identifica explicitamente essa fonte e não apresenta os mocks como dados Vísent. A integração agregada com o dataset Vísent está planejada para a fase seguinte.

As configurações de PostgreSQL já estão previstas em `.env.example`, `app/core/config.py` e `app/db/`, mas o matching da fase 1 não depende do banco.

## Pandas e dataset Vísent

Pandas não é necessário para executar a fase 1 porque `/match` usa candidatos mockados em JSON e `/insights` ainda identifica a conectividade como pendente. Por isso, Pandas não foi adicionado como dependência nem existe importação dos CSVs nesta etapa.

O guia Pandas do repositório Vísent será usado na fase 2 para criar um processo de ETL. Esse processo deverá:

1. Ler `antenas_flp.csv` e `tensor_concentracao.csv` preservando `ecgi` como texto.
2. Agregar concentração e qualidade de rede por cluster.
3. Persistir somente os resultados agregados no PostgreSQL ou em um artefato pequeno.
4. Evitar carregar CSVs grandes a cada chamada de `/insights`.

Não será criado vínculo entre `assinante_hash` e candidatos da plataforma.
