import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { filterOutline, chevronDownOutline, chatbubbleOutline, personOutline } from 'ionicons/icons';
import Layout from '../components/Layout';
import './Resultados.css';

interface Candidato {
  id: number;
  nome: string;
  cargo: string;
  compatibilidade: number;
  skills: string[];
  regiao: string;
  nivel: string;
  diversidade: string;
  destaque?: boolean;
}

const Resultados: React.FC = () => {
  // Adicionado propriedades reais de filtro em cada candidato para simular o comportamento
  const candidatosIniciais: Candidato[] = [
    { id: 1, nome: "Ana Silva", cargo: "Front-end Developer", compatibilidade: 95, skills: ["React", "TypeScript", "CSS"], regiao: "Sudeste", nivel: "Júnior", diversidade: "Mulheres", destaque: true },
    { id: 2, nome: "Carlos Souza", cargo: "Front-end Developer", compatibilidade: 89, skills: ["React", "Node.js", "JavaScript"], regiao: "Sul", nivel: "Pleno", diversidade: "Nenhuma" },
    { id: 3, nome: "Fernando Almeida", cargo: "Front-end Developer", compatibilidade: 82, skills: ["React", "Node.js", "JavaScript"], regiao: "Nordeste", nivel: "Sênior", diversidade: "PCD" },
    { id: 4, nome: "Gustavo Paiva", cargo: "Front-end Developer", compatibilidade: 77, skills: ["React", "CSS", "JavaScript"], regiao: "Centro-Oeste", nivel: "Júnior", diversidade: "Pretos/Pardos" },
    { id: 5, nome: "Mariana Costa", cargo: "Front-end Developer", compatibilidade: 70, skills: ["React", "CSS", "JavaScript"], regiao: "Norte", nivel: "Pleno", diversidade: "Mulheres" },
    { id: 6, nome: "Lucas Lima", cargo: "Front-end Developer", compatibilidade: 61, skills: ["React", "CSS", "JavaScript"], regiao: "Sudeste", nivel: "Júnior", diversidade: "Nenhuma" },
    { id: 7, nome: "Patricia Reis", cargo: "Front-end Developer", compatibilidade: 50, skills: ["React", "CSS", "JavaScript"], regiao: "Sul", nivel: "Sênior", diversidade: "LGBTQIA+" },
    { id: 8, nome: "Rodrigo Melo", cargo: "Front-end Developer", compatibilidade: 39, skills: ["React", "CSS", "JavaScript"], regiao: "Nordeste", nivel: "Júnior", diversidade: "Nenhuma" },
    { id: 9, nome: "Aline Ramos", cargo: "Front-end Developer", compatibilidade: 25, skills: ["React", "CSS", "JavaScript"], regiao: "Sudeste", nivel: "Pleno", diversidade: "PCD" },
  ];

  // States para gerenciar os candidatos exibidos e os termos selecionados nos filtros
  const [candidatosFiltrados, setCandidatosFiltrados] = useState<Candidato[]>(candidatosIniciais);
  const [ordenacao, setOrdenacao] = useState('score');
  
  const [filtroRegiao, setFiltroRegiao] = useState('todos');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [filtroSkill, setFiltroSkill] = useState('todos');
  const [filtroDiversidade, setFiltroDiversidade] = useState('todos');

  // Efeito que roda e filtra a lista toda vez que qualquer filtro for alterado
  useEffect(() => {
    let resultado = [...candidatosIniciais];

    if (filtroRegiao !== 'todos') {
      resultado = resultado.filter(c => c.regiao === filtroRegiao);
    }
    if (filtroNivel !== 'todos') {
      resultado = resultado.filter(c => c.nivel === filtroNivel);
    }
    if (filtroDiversidade !== 'todos') {
      resultado = resultado.filter(c => c.diversidade === filtroDiversidade);
    }
    if (filtroSkill !== 'todos') {
      resultado = resultado.filter(c => c.skills.includes(filtroSkill));
    }

    // Reaplica a ordenação ativa na lista filtrada
    if (ordenacao === 'score') {
      resultado.sort((a, b) => b.compatibilidade - a.compatibilidade);
    } else if (ordenacao === 'nome') {
      resultado.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    setCandidatosFiltrados(resultado);
  }, [filtroRegiao, filtroNivel, filtroSkill, filtroDiversidade, ordenacao]);

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdenacao(e.target.value);
  };

  const verPerfil = (nome: string) => {
    alert(`Abrindo perfil de: ${nome}`);
  };

  const iniciarContato = (nome: string) => {
    alert(`Iniciando chat com: ${nome}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Layout titulo="Resultados">

          <div className="resultados-container">
            
            <div className="contador-candidatos">
              <IonIcon icon={personOutline} /> 
              {candidatosFiltrados.length} candidatos encontrados
            </div>

            <div className="filtros-panel">
              <div className="filtro-info-vaga">
                <div><strong>Vaga:</strong> Desenvolvedor Front-end</div>
                <div><strong>Região Atual:</strong> {filtroRegiao === 'todos' ? 'Todas' : filtroRegiao}</div>
                <div><strong>Filtro Skill:</strong> {filtroSkill === 'todos' ? 'Todas' : filtroSkill}</div>
                <div><strong>Nível Atual:</strong> {filtroNivel === 'todos' ? 'Todos' : filtroNivel}</div>
              </div>
              
              <div className="ordenar-box">
                <label>Ordenar por:</label>
                <select value={ordenacao} onChange={handleOrderChange} className="select-custom">
                  <option value="score">Score de Compatibilidade</option>
                  <option value="nome">Nome do Candidato</option>
                </select>
              </div>
            </div>

            {/* Nova linha de botões seletores interativos */}
            <div className="filtros-rapidos-row">
              <div className="filter-select-wrapper">
                <select value={filtroRegiao} onChange={(e) => setFiltroRegiao(e.target.value)} className="btn-filter-selector">
                  <option value="todos">Região (Todas)</option>
                  <option value="Norte">Norte</option>
                  <option value="Nordeste">Nordeste</option>
                  <option value="Centro-Oeste">Centro-Oeste</option>
                  <option value="Sudeste">Sudeste</option>
                  <option value="Sul">Sul</option>
                </select>
                {/* <IonIcon icon={chevronDownOutline} className="select-arrow" /> */}
              </div>

              <div className="filter-select-wrapper">
                <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)} className="btn-filter-selector">
                  <option value="todos">Nível (Todos)</option>
                  <option value="Júnior">Iniciante / Júnior</option>
                  <option value="Pleno">Intermediário / Pleno</option>
                  <option value="Sênior">Avançado / Sênior</option>
                </select>
                {/* <IonIcon icon={chevronDownOutline} className="select-arrow" /> */}
              </div>

              <div className="filter-select-wrapper">
                <select value={filtroSkill} onChange={(e) => setFiltroSkill(e.target.value)} className="btn-filter-selector">
                  <option value="todos">Skills (Todas)</option>
                  <option value="React">React</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Node.js">Node.js</option>
                  <option value="CSS">CSS</option>
                  <option value="JavaScript">JavaScript</option>
                </select>
                {/* <IonIcon icon={chevronDownOutline} className="select-arrow" /> */}
              </div>

              <div className="filter-select-wrapper">
                <select value={filtroDiversidade} onChange={(e) => setFiltroDiversidade(e.target.value)} className="btn-filter-selector">
                  <option value="todos">Diversidade (Todas)</option>
                  <option value="Mulheres">Mulheres</option>
                  <option value="PCD">PCD</option>
                  <option value="Pretos/Pardos">Pretos / Pardos</option>
                  <option value="LGBTQIA+">LGBTQIA+</option>
                </select>
                {/* <IonIcon icon={chevronDownOutline} className="select-arrow" /> */}
              </div>

              <button className="btn-filter-main" onClick={() => alert('Abrindo painel avançado...')}>
                <IonIcon icon={filterOutline} /> Mais filtros
              </button>
            </div>

            <div className="candidatos-grid">
              {candidatosFiltrados.map((candidato) => (
                <div 
                  key={candidato.id} 
                  className={`candidato-card ${candidato.destaque ? 'card-destaque' : ''}`}
                  style={{ borderColor: candidato.compatibilidade <= 25 ? '#ef4444' : undefined }}
                >
                  {candidato.destaque && <span className="badge-destaque">🏆 Melhor compatibilidade</span>}

                  <div className="card-top-info">
                    <div className="avatar-placeholder">
                      <IonIcon icon={personOutline} />
                    </div>
                    
                    <div className="candidato-detalhes">
                      <h3>{candidato.nome}</h3>
                      <p className="cargo-text">{candidato.cargo} • {candidato.regiao}</p>
                    </div>

                    <div className="compatibilidade-badge" style={{ color: getScoreColor(candidato.compatibilidade) }}>
                      <span className="porcentagem">{candidato.compatibilidade}%</span>
                      <span className="status-text">Compatível</span>
                    </div>
                  </div>

                  <div className="skills-section">
                    <p className="diversidade-tag">Diversidade: {candidato.diversidade}</p>
                    <div className="skills-tags">
                      {candidato.skills.join('  •  ')}
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="btn-ver-perfil" onClick={() => verPerfil(candidato.nome)}>Ver Perfil</button>
                    <button className="btn-contato" onClick={() => iniciarContato(candidato.nome)}>
                      <IonIcon icon={chatbubbleOutline} /> Contato
                    </button>
                  </div>
                </div>
              ))}

              {candidatosFiltrados.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  Nenhum candidato corresponde aos filtros selecionados.
                </div>
              )}
            </div>

          </div>

    </Layout>
  );
};

export default Resultados;