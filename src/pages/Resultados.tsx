import React, { useMemo, useState, useEffect } from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { NavLink } from 'react-router-dom';
import { chatbubbleOutline, filterOutline, personOutline } from 'ionicons/icons';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { loadMatchSession } from '../services/matchSession';
import type { CandidatoMatch } from '../types/match';
import './Resultados.css';

const Resultados: React.FC = () => {
  const [matchSession] = useState(loadMatchSession);
  const [ordenacao, setOrdenacao] = useState('score');
  const [filtroRegiao, setFiltroRegiao] = useState('todos');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [filtroSkill, setFiltroSkill] = useState('todos');
  const [filtroDiversidade, setFiltroDiversidade] = useState('todos');

  const candidatos = useMemo(
    () => matchSession?.response.candidatos ?? [],
    [matchSession],
  );

  const candidatosFiltrados = useMemo(() => {
    const result = candidatos.filter((candidate) => {
      const matchesRegion = filtroRegiao === 'todos' || candidate.regiao === filtroRegiao;
      const matchesLevel = filtroNivel === 'todos' || candidate.nivel === filtroNivel;
      const matchesSkill = filtroSkill === 'todos' || candidate.skills.includes(filtroSkill);
      const matchesDiversity = filtroDiversidade === 'todos'
        || candidate.badge_diversidade === filtroDiversidade;
      return matchesRegion && matchesLevel && matchesSkill && matchesDiversity;
    });

    return result.sort((first, second) => {
      if (ordenacao === 'nome') {
        return first.nome.localeCompare(second.nome);
      }
      return second.score_match - first.score_match;
    });
  }, [candidatos, filtroDiversidade, filtroNivel, filtroRegiao, filtroSkill, ordenacao]);

  const regioes = uniqueValues(candidatos, (candidate) => candidate.regiao);
  const niveis = uniqueValues(candidatos, (candidate) => candidate.nivel);
  const skills = [...new Set(candidatos.flatMap((candidate) => candidate.skills))].sort();
  const diversityBadges = uniqueValues(
    candidatos.filter((candidate) => candidate.badge_diversidade),
    (candidate) => candidate.badge_diversidade ?? '',
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const verPerfil = (nome: string) => {
    alert(`Abrindo perfil de: ${nome}`);
  };

  const iniciarContato = (nome: string) => {
    alert(`Iniciando chat com: ${nome}`);
  };

  if (!matchSession) {
    return (
      <Layout titulo="Resultados">
        <div className="resultados-container">

          <div className="resultados-empty-state">
            <IonIcon icon={personOutline} />
            <h2>Nenhum matching executado</h2>
            <p>
              Publique uma vaga para gerar sua primeira shortlist de talentos.
            </p>
            <NavLink to="/publicar-vaga">
              Publicar uma vaga
            </NavLink>
          </div>
        </div>
      </Layout>
    );
  }

  const metrics = matchSession.response.diversidade_resultado;
  const bestCandidateId = candidatos[0]?.candidato_id;

  return (
    <Layout titulo="Resultados">

      <div className="resultados-container">
        <header className="header-resultados">
          <h1 className="titulo-resultados">Resultados</h1>
          <p className="contador-candidatos">
            <IonIcon icon={personOutline} /> {candidatosFiltrados.length} candidatos encontrados
          </p>
        </header>

        <section className="metricas-matching" aria-label="Métricas do matching">
          <div><strong>{matchSession.response.total_analisados}</strong><span>Total analisados</span></div>
          <div><strong>{metrics.total_shortlist}</strong><span>Na shortlist</span></div>
          <div><strong>{metrics.candidatos_com_badge}</strong><span>Com badge</span></div>
          <div><strong>{metrics.percentual_representacao}%</strong><span>Representação</span></div>
          <div className={metrics.meta_atingida ? 'meta-atingida' : 'meta-pendente'}>
            <strong>{metrics.meta_atingida ? 'Sim' : 'Não'}</strong>
            <span>Meta atingida</span>
          </div>
        </section>

        <div className="filtros-panel">
          <div className="filtro-info-vaga">
            <div><strong>Vaga:</strong> {matchSession.request.vaga.titulo}</div>
            <div><strong>Região:</strong> {matchSession.request.vaga.regiao}</div>
            <div><strong>Skills:</strong> {matchSession.request.vaga.skills.join(', ')}</div>
            <div><strong>Nível:</strong> {matchSession.request.vaga.nivel}</div>
          </div>

          <div className="ordenar-box">
            <label htmlFor="ordenacao">Ordenar por:</label>
            <select
              id="ordenacao"
              value={ordenacao}
              onChange={(event) => setOrdenacao(event.target.value)}
              className="select-custom"
            >
              <option value="score">Score de Compatibilidade</option>
              <option value="nome">Nome do Candidato</option>
            </select>
          </div>
        </div>

        <div className="filtros-rapidos-row">
          <FilterSelect label="Região" value={filtroRegiao} onChange={setFiltroRegiao} options={regioes} />
          <FilterSelect label="Nível" value={filtroNivel} onChange={setFiltroNivel} options={niveis} />
          <FilterSelect label="Skills" value={filtroSkill} onChange={setFiltroSkill} options={skills} />
          <FilterSelect
            label="Diversidade"
            value={filtroDiversidade}
            onChange={setFiltroDiversidade}
            options={diversityBadges}
          />
          <button className="btn-filter-main" onClick={() => alert('Abrindo painel avançado...')}>
            <IonIcon icon={filterOutline} /> Mais filtros
          </button>
        </div>

        <div className="candidatos-grid">
          {candidatosFiltrados.map((candidate) => (
            <div
              key={candidate.candidato_id}
              className={`candidato-card ${candidate.candidato_id === bestCandidateId ? 'card-destaque' : ''}`}
              style={{ borderColor: candidate.score_match <= 25 ? '#ef4444' : undefined }}
            >
              {candidate.candidato_id === bestCandidateId && (
                <span className="badge-destaque">🏆 Melhor compatibilidade</span>
              )}

              <div className="card-top-info">
                <div className="avatar-placeholder">
                  <IonIcon icon={personOutline} />
                </div>

                <div className="candidato-detalhes">
                  <h3>{candidate.nome}</h3>
                  <p className="cargo-text">{candidate.cargo} • {candidate.regiao}</p>
                </div>

                <div className="compatibilidade-badge" style={{ color: getScoreColor(candidate.score_match) }}>
                  <span className="porcentagem">{candidate.score_match}%</span>
                  <span className="status-text">Compatível</span>
                </div>
              </div>

              <div className="skills-section">
                <p className={`diversidade-tag ${candidate.badge_diversidade ? '' : 'sem-badge'}`}>
                  {candidate.badge_diversidade ?? 'Badge não declarado'}
                </p>
                <div className="skills-tags">{candidate.skills.join('  •  ')}</div>
              </div>

              <details className="score-details">
                <summary>Por que este score?</summary>
                <div className="score-breakdown">
                  <span>Skills <strong>{candidate.score_breakdown.skills}/60</strong></span>
                  <span>Senioridade <strong>{candidate.score_breakdown.senioridade}/20</strong></span>
                  <span>Região/modalidade <strong>{candidate.score_breakdown.regiao_modalidade}/15</strong></span>
                  <span>Disponibilidade <strong>{candidate.score_breakdown.disponibilidade}/5</strong></span>
                </div>
                <ul>
                  {candidate.explicacoes.map((explanation) => <li key={explanation}>{explanation}</li>)}
                </ul>
              </details>

              <div className="card-actions">
                <button className="btn-ver-perfil" onClick={() => verPerfil(candidate.nome)}>Ver Perfil</button>
                <button className="btn-contato" onClick={() => iniciarContato(candidate.nome)}>
                  <IonIcon icon={chatbubbleOutline} /> Contato
                </button>
              </div>
            </div>
          ))}

          {candidatosFiltrados.length === 0 && (
            <div className="sem-resultados-filtro">Nenhum candidato corresponde aos filtros selecionados.</div>
          )}
        </div>
      </div>

    </Layout>
  );
};

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const FilterSelect = ({ label, value, options, onChange }: FilterSelectProps) => (
  <div className="filter-select-wrapper">
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="btn-filter-selector"
    >
      <option value="todos">{label} (Todos)</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

function uniqueValues(
  candidates: CandidatoMatch[],
  selector: (candidate: CandidatoMatch) => string,
): string[] {
  return [...new Set(candidates.map(selector).filter(Boolean))].sort();
}

export default Resultados;
