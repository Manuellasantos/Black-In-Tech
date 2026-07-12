# 🚀 App BiT - Black In Tech

# 🚀 App BiT - Black In Tech

![Ionic](https://img.shields.io/badge/Ionic-React-3880FF?logo=ionic&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7)
![Hackathon](https://img.shields.io/badge/Wongola-Hackathon-orange)

## 📌 Sobre o Projeto

O **App BiT** é uma plataforma B2B de Matching Inclusivo desenvolvida durante um Hackathon da Wongola 2026.

A solução conecta empresas comprometidas com diversidade, inclusão e metas ESG a profissionais de grupos sub-representados, utilizando inteligência artificial e dados geográficos para tornar os processos seletivos mais inclusivos e eficientes.

---

## 🎯 Problema

Muitas empresas enfrentam desafios para:

- Encontrar talentos qualificados de grupos sub-representados;
- Reduzir vieses inconscientes nos processos seletivos;
- Acompanhar indicadores relacionados à diversidade e inclusão;
- Atender metas ESG de forma estratégica e baseada em dados.

---

## 💡 Solução

O App BiT oferece uma plataforma que:

- Conecta empresas a talentos diversos;
- Utiliza IA para gerar recomendações de candidatos;
- Exibe concentração de talentos por região;
- Disponibiliza indicadores e insights ESG;
- Auxilia empresas na construção de equipes mais inclusivas.

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Login empresarial
- Cadastro de empresa

### 📊 Dashboard
- Indicadores estratégicos
- Visualização de dados
- Gráficos de Diversidade

### 💼 Publicação de Vagas
- Cadastro de oportunidades
- Definição de requisitos e habilidades
- Critérios de inclusão

### 🤖 Matching Inteligente
- Recomendação automática de candidatos
- Ranking de compatibilidade
- Classificação por aderência à vaga

### 📈 Insights ESG
- Indicadores de diversidade
- Métricas de inclusão
- Apoio à tomada de decisão
- Mapa de concentração de talentos

### 👤 Perfil da Empresa
- Gerenciamento de informações
- Configurações da conta

### 🎧 Suporte
- Canal de atendimento
- Abertura de chamados


## 📸 Screenshots

### Dashboard

![Dashboard](docs/images/dashboard.jpg)

### Publicar Vaga

![Publicar Vaga](docs/images/publicar.jpg)

### Matching Inteligente

![Matching](docs/images/matching.jpg)

### Insights ESG

![Insights ESG](docs/images/insights.jpg)

### Versão Mobile

![Mobile](docs/images/mobile.jpg)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- Ionic React
- React
- TypeScript
- CSS

### Backend
- FastAPI
- Python

### Ferramentas
- Git
- GitHub
- Vercel
- Render
- Figma

---

## 🏗️ Arquitetura

```text
Frontend (Ionic React)
        │
        ▼
API REST (FastAPI)
        │
        ▼
Motor de Matching e Insights
```

---

## 🌐 Deploy

### Frontend

https://app-bit-hack.vercel.app

### Backend

#### API

https://black-in-tech.onrender.com

#### Swagger

https://black-in-tech.onrender.com/docs

---

## 👥 Equipe

| Integrante | Função |
|------------|---------|
| Daissa | Front-End Developer/Design Grafico
| Manuella Santos | Data Analyst / Front-End Developer |
| Jadson Sousa Mattos | Full Stack Developer |

---

## 📱 Telas Desenvolvidas

- Login
- Cadastro de Empresa
- Dashboard
- Publicar Vaga
- Resultados de Matching
- Insights ESG
- Perfil
- Suporte

---

## 🚀 Como Executar Localmente

### Frontend

Inicie o frontend em outro terminal:

```bash
cp .env.example .env.local
npm install
npm run dev
```
O frontend usa `VITE_API_URL`, com fallback local para `http://localhost:8000`. Ao gerar o matching, a resposta fica na sessão do navegador e alimenta a tela `/resultados`, inclusive após atualizar a página.

### Backend

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
---

## 🎥 Demonstração

Veja o vídeo de apresentação do projeto:

https://youtu.be/kecfVl9KGLk?si=Eax3pLsHiRZ0gsAl

---

## 🏆 Hackathon Wongola 2026

Projeto desenvolvido como solução para o desafio de Matching Inclusivo, com foco em Diversidade, Inclusão e ESG, conectando empresas e profissionais por meio de tecnologia e análise de dados.

---

## 📄 Licença

Projeto desenvolvido para fins educacionais e de participação em Hackathon.
