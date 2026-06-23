import React, { useState } from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { 
  helpCircleOutline, 
  chevronForwardOutline, 
  chatbubbleEllipsesOutline, 
  headsetOutline, 
  mailOutline, 
  logoWhatsapp, 
  callOutline, 
  timeOutline, 
  documentTextOutline, 
  sendOutline,
  languageOutline,
  sunnyOutline,
  notificationsOutline,
  searchOutline,
  chatboxOutline
} from 'ionicons/icons';
import Sidebar from '../components/Sidebar';
import './Suporte.css';

const Suporte: React.FC = () => {
  const [pesquisa, setPesquisa] = useState('');
  const [assunto, setAssunto] = useState('');
  const [categoria, setCategoria] = useState('Problema Técnico');
  const [mensagem, setMensagem] = useState('');

  const handleEnviarChamado = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sua solicitação foi enviada com sucesso!');
  };

  return (
    <IonPage>
      <div className="main-layout">
        <Sidebar />

        <IonContent className="suporte-content">
          <div className="suporte-container">
            
            <header className="suporte-header-top">
              <h1 className="suporte-header-title">
                <span className="title-yellow">Su</span>porte
              </h1>
              
              <div className="suporte-header-actions">
                <button className="header-icon-btn"><IonIcon icon={languageOutline} /></button>
                <button className="header-icon-btn"><IonIcon icon={sunnyOutline} /></button>
                <button className="header-icon-btn"><IonIcon icon={notificationsOutline} /></button>
              </div>
            </header>

            <div className="search-box-container">
              <input 
                type="text" 
                placeholder="Pesquisar dúvida..." 
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="input-search-custom"
              />
              <IonIcon icon={searchOutline} className="search-input-icon" />
            </div>

            <div className="suporte-grid">
              
              <div className="suporte-col-left">
                
                <div className="suporte-row-top">
                  
                  <div className="suporte-card">
                    <h2 className="suporte-card-title">
                      <div className="icon-wrapper"><IonIcon icon={helpCircleOutline} /></div>
                      <span>Perguntas Frequentes (FAQ):</span>
                    </h2>
                    <ul className="faq-list">
                      <li><IonIcon icon={chevronForwardOutline} /> <a href="#">Como publicar uma vaga?</a></li>
                      <li><IonIcon icon={chevronForwardOutline} /> <a href="#">Como funciona o Matching IA?</a></li>
                      <li><IonIcon icon={chevronForwardOutline} /> <a href="#">Como visualizar os Insights ESG?</a></li>
                      <li><IonIcon icon={chevronForwardOutline} /> <a href="#">Como alterar meu plano?</a></li>
                    </ul>
                  </div>

                  <div className="suporte-card card-ia">
                    <div className="ia-header">
                      <div className="icon-wrapper ia-icon"><IonIcon icon={chatbubbleEllipsesOutline} /></div>
                      <h2 className="ia-title">Assistente IA</h2>
                    </div>
                    <p className="ia-text">Tire dúvidas sobre a plataforma em tempo real.</p>
                    <button className="btn-iniciar-conversa">
                      <IonIcon icon={chatboxOutline} /> Iniciar Conversa
                    </button>
                  </div>

                </div>

                <div className="suporte-card card-canais">
                  <h2 className="suporte-card-title">
                    <div className="icon-wrapper"><IonIcon icon={headsetOutline} /></div>
                    <span>Canais de Atendimento</span>
                  </h2>
                  
                  <div className="canais-grid">
                    <div className="canal-item">
                      <IonIcon icon={mailOutline} className="canal-icon" />
                      <div>
                        <h3>E-mail</h3>
                        <p>suporte@appbit.com</p>
                      </div>
                    </div>
                    
                    <div className="canal-item">
                      <IonIcon icon={logoWhatsapp} className="canal-icon canal-wpp" />
                      <div>
                        <h3>WhatsApp</h3>
                        <p>(31) 4545-4545</p>
                      </div>
                    </div>

                    <div className="canal-item">
                      <IonIcon icon={callOutline} className="canal-icon" />
                      <div>
                        <h3>Telefone</h3>
                        <p>(31) 3333-3333</p>
                      </div>
                    </div>

                    <div className="canal-item">
                      <IonIcon icon={timeOutline} className="canal-icon" />
                      <div>
                        <h3>Horário</h3>
                        <p>Seg-Sex 08h às 18h</p>
                        <p>Sábado 8h às 14h</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="suporte-col-right">
                <div className="suporte-card card-chamado">
                  <h2 className="suporte-card-title">
                    <div className="icon-wrapper"><IonIcon icon={documentTextOutline} /></div>
                    <span>Abrir Chamado:</span>
                  </h2>

                  <form onSubmit={handleEnviarChamado} className="chamado-form">
                    <div className="form-group">
                      <label className="field-label-suporte">Assunto</label>
                      <input 
                        type="text" 
                        placeholder="Digite o assunto" 
                        className="input-text-custom"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="field-label-suporte">Categoria</label>
                      <div className="select-wrapper-suporte">
                        <select className="select-suporte-native">
                          <option>Problema Técnico</option>
                          <option>Financeiro</option>
                          <option>Melhorias</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label-suporte">Mensagem</label>
                      <textarea 
                        placeholder="Descreva sua solicitação..." 
                        className="textarea-custom"
                        required
                      />
                    </div>

                    <div className="form-actions-suporte">
                      <button type="submit" className="btn-enviar-solicitacao">
                        <IonIcon icon={sendOutline} /> Enviar Solicitação
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </IonContent>
      </div>
    </IonPage>
  );
};

export default Suporte;