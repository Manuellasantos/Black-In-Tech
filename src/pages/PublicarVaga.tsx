import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { 
  briefcaseOutline, 
  documentTextOutline, 
  codeSlashOutline, 
  peopleOutline, 
  barChartOutline, 
  desktopOutline, 
  pinOutline, 
  heartOutline,
  addOutline,
  closeOutline,
  sparklesOutline, 
} from 'ionicons/icons';
import Layout from '../components/Layout';
import './PublicarVaga.css';

const PublicarVaga: React.FC = () => {
  // Estados do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivel, setNivel] = useState('Júnior');
  const [modalidade, setModalidade] = useState('Presencial');
  const [regiao, setRegiao] = useState('Sudeste');
  const [prioridadeDiversidade, setPrioridadeDiversidade] = useState('Média');

  const [antiVies, setAntiVies] = useState(false);
  const [destacarGrupos, setDestacarGrupos] = useState(false);

  const [skills, setSkills] = useState<string[]>(['React', 'NodeJs', 'Python']);
  const [novaSkill, setNovaSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaSkill.trim() && !skills.includes(novaSkill.trim())) {
      setSkills([...skills, novaSkill.trim()]);
      setNovaSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleGerarMatching = () => {
    const dadosVaga = {
      titulo,
      descricao,
      nivel,
      modalidade,
      regiao,
      skills,
      diversidade: { antiVies, destacarGrupos },
      prioridadeDiversidade
    };
    console.log('Gerando Matching para a vaga:', dadosVaga);
    alert('Buscando candidatos ideais com base nos critérios...');
  };

  return (
    <Layout titulo="Publicar Vaga">

      <div className="publicar-vaga-container">

            <div className="vaga-form-card">
              
              <div className="form-grid">
                
                <div className="form-col">
                  
                  {/* Título da Vaga */}
                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={briefcaseOutline} /></div>
                      <span>Título da vaga</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Digite o título da vaga" 
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="input-text-custom"
                    />
                  </div>

                  {/* Descrição */}
                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={documentTextOutline} /></div>
                      <span>Descrição</span>
                    </label>
                    <textarea 
                      placeholder="Descreva a vaga, responsabilidades e requisitos..." 
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className="textarea-custom"
                    />
                  </div>

                  {/* Skills */}
                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={codeSlashOutline} /></div>
                      <span>Skills</span>
                    </label>
                    <div className="skills-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Adicionar skill" 
                        value={novaSkill}
                        onChange={(e) => setNovaSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                      />
                      <button type="button" onClick={handleAddSkill} className="btn-add-skill">
                        <IonIcon icon={addOutline} />
                      </button>
                    </div>
                    
                    <div className="tags-container">
                      {skills.map(skill => (
                        <span key={skill} className="skill-tag">
                          {skill}
                          <button type="button" onClick={() => handleRemoveSkill(skill)}>
                            <IonIcon icon={closeOutline} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={peopleOutline} /></div>
                      <span>Diversidade e Inclusão</span>
                    </label>
                    <div className="checkbox-box-container">
                      <label className="checkbox-custom-label">
                        <input 
                          type="checkbox" 
                          checked={antiVies} 
                          onChange={(e) => setAntiVies(e.target.checked)} 
                        />
                        <span className="checkbox-text">Aplicar filtro anti-viés</span>
                        <span className="info-badge">i</span>
                      </label>
                      
                      <label className="checkbox-custom-label">
                        <input 
                          type="checkbox" 
                          checked={destacarGrupos} 
                          onChange={(e) => setDestacarGrupos(e.target.checked)} 
                        />
                        <span className="checkbox-text">Destacar grupos sub-representados</span>
                        <span className="info-badge">i</span>
                      </label>
                    </div>
                  </div>

                </div>

                <div className="form-col">
                  
                  {/* Nível */}
                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={barChartOutline} /></div>
                      <span>Nível</span>
                    </label>
                    <div className="radio-pill-group">
                      {['Júnior', 'Pleno', 'Sênior'].map(op => (
                        <label key={op} className={`radio-pill-label ${nivel === op ? 'active' : ''}`}>
                          <input type="radio" name="nivel" value={op} checked={nivel === op} onChange={() => setNivel(op)} />
                          <span className="radio-dot"></span>
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Modalidade */}
                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={desktopOutline} /></div>
                      <span>Modalidade</span>
                    </label>
                    <div className="radio-pill-group">
                      {['Presencial', 'Híbrido', 'Remoto'].map(op => (
                        <label key={op} className={`radio-pill-label ${modalidade === op ? 'active' : ''}`}>
                          <input type="radio" name="modalidade" value={op} checked={modalidade === op} onChange={() => setModalidade(op)} />
                          <span className="radio-dot"></span>
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Região */}
                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={pinOutline} /></div>
                      <span>Região</span>
                    </label>
                    <div className="select-wrapper-vaga">
                      <select value={regiao} onChange={(e) => setRegiao(e.target.value)} className="select-vaga-native">
                        <option value="Sudeste">Sudeste</option>
                        <option value="Sul">Sul</option>
                        <option value="Nordeste">Nordeste</option>
                        <option value="Norte">Norte</option>
                        <option value="Centro-Oeste">Centro-Oeste</option>
                      </select>
                    </div>
                  </div>

                  {/* Prioridade para Diversidade */}
                  <div className="form-group">
                    <label className="field-label">
                      <div className="icon-wrapper"><IonIcon icon={heartOutline} /></div>
                      <span>Prioridade para Diversidade</span>
                    </label>
                    <div className="radio-vertical-group">
                      {['Baixa', 'Média', 'Alta'].map(op => (
                        <label key={op} className="radio-vertical-label">
                          <input 
                            type="radio" 
                            name="prioridade" 
                            value={op} 
                            checked={prioridadeDiversidade === op} 
                            onChange={() => setPrioridadeDiversidade(op)} 
                          />
                          <span className="radio-custom-circle"></span>
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {}
              <div className="form-actions-footer">
                <button type="button" onClick={handleGerarMatching} className="btn-gerar-matching">
                  <IonIcon icon={sparklesOutline} /> Gerar Matching
                </button>
              </div>

            </div>
      </div>
    </Layout>
  );
};

export default PublicarVaga;