# App Bit

O App Bit é uma plataforma que conecta empresas a talentos de grupos sub-representados por meio de um processo de recrutamento mais inclusivo, eficiente e orientado por dados.

A solução permite que recrutadores publiquem vagas, encontrem candidatos compatíveis e acompanhem métricas de diversidade, contribuindo para processos seletivos mais justos e alinhados às metas ESG.

## Funcionalidades

* Publicação de vagas
* Matching de candidatos por competências
* Score de compatibilidade
* Shortlist de talentos recomendados
* Dashboard com métricas de diversidade e ESG

## Como Funciona

1. A empresa publica uma vaga.
2. O sistema identifica candidatos compatíveis.
3. Os candidatos são classificados por score de aderência.
4. O recrutador visualiza recomendações e indicadores de diversidade.

## Objetivo

Facilitar a conexão entre empresas e profissionais diversos, promovendo contratações mais inclusivas e decisões baseadas em dados.

## Backend

A API FastAPI do MVP está em [`backend/`](./backend/). Consulte [`backend/README.md`](./backend/README.md) para configurar o ambiente, executar os testes e conhecer os contratos de `/match` e `/insights`.

## Execução integrada

Inicie o backend em um terminal:

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev]'
cp .env.example .env
uvicorn app.main:app --reload
```

Inicie o frontend em outro terminal:

```bash
cp .env.example .env.local
npm install
npm run dev
```

O frontend usa `VITE_API_URL`, com fallback local para `http://localhost:8000`. Ao gerar o matching, a resposta fica na sessão do navegador e alimenta a tela `/resultados`, inclusive após atualizar a página.
