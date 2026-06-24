import { FiUser, FiTarget, FiStar, FiGrid, FiFileText, FiTag, FiUsers, FiEdit, FiBriefcase, FiMail, FiPhone, FiCheckCircle, FiArrowRight, FiCreditCard } from "react-icons/fi";
import { businessOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Layout from "../components/Layout";
import "./Perfil.css";
import logoCliente from "../assets/icons/logo-cliente.svg";
import responsavelCliente from "../assets/icons/avatar-responsavel.svg"

const Perfil: React.FC = () => {

    const empresa = {
        nome: "Cubo Solutions LTDA",
        cnpj: "00.000.000/0001-00",
        segmento: "Tecnologia",
        porte: "Médio Porte"
    };

    const responsavel = {
        foto: "/avatar.png",
        nome: "Maria Silva",
        cargo: "Gerente de RH",
        email: "maria@cubosolutions.br",
        telefone: "(31) 99999-9999"
    };

    const metas = {
        diversidade: 50,
        contratacoesInclusivas: 12
    };

    const plano = {
        nome: "Premium Plus",
        beneficios: [
            "Matching Inteligente",
            "Relatórios ESG",
            "Mapa de Talentos",
            "Suporte Prioritário"
        ],
        valor: "R$ 599,90",
        renovacao: "12/05/2027",
        proximaCobranca: "12/07/2026",
        pagamento: "Cartão de Crédito",
        status: "Ativo"
    };

    return (
        <Layout titulo="Perfil">
            <div className="perfil-container">

                <section className="perfil-card card-empresa">

                    <h3 className="section-title">
                        <IonIcon
                            icon={businessOutline}
                            className="section-icon"
                        />
                        Dados da Empresa
                    </h3>

                    <div className="empresa-info">

                        <div className="empresa-logo">
                            <img
                                src={logoCliente}
                                alt="Logo Empresa"
                            />
                        </div>

                        <div className="empresa-item">
                            <span>
                                <FiGrid className="info-icon" />
                                Nome da empresa
                            </span>
                            <p>{empresa.nome}</p>
                        </div>

                        <div className="empresa-item">
                            <span>
                                <FiFileText className="info-icon" />
                                CNPJ
                            </span>
                            <p>{empresa.cnpj}</p>
                        </div>

                        <div className="empresa-item">
                            <span>
                                <FiTag className="info-icon" />
                                Segmento
                            </span>
                            <p>{empresa.segmento}</p>
                        </div>

                        <div className="empresa-item">
                            <span>
                                <FiUsers className="info-icon" />
                                Porte
                            </span>
                            <p>{empresa.porte}</p>
                        </div>

                    </div>
                </section>

                <section className="perfil-card card-respon">

                    <h3 className="section-title">
                        <FiUser className="section-icon" />
                        Responsável
                    </h3>

                    <div className="responsavel-info">

                        <div className="responsavel-avatar">
                            <img
                                src={responsavelCliente}
                                alt={responsavel.nome}
                            />
                        </div>

                        <div className="responsavel-item">
                            <span>
                                <FiUser className="info-icon" />
                                Nome
                            </span>
                            <p>{responsavel.nome}</p>
                        </div>

                        <div className="responsavel-item">
                            <span>
                                <FiBriefcase className="info-icon" />
                                Cargo
                            </span>
                            <p>{responsavel.cargo}</p>
                        </div>

                        <div className="responsavel-item">
                            <span>
                                <FiMail className="info-icon" />
                                E-mail
                            </span>
                            <p>{responsavel.email}</p>
                        </div>

                        <div className="responsavel-item">
                            <span>
                                <FiPhone className="info-icon" />
                                Telefone
                            </span>
                            <p>{responsavel.telefone}</p>
                        </div>

                        <button className="btn-editar">
                            Editar
                            <FiEdit />
                        </button>

                    </div>
                </section>

                <div className="perfil-grid">

                    <section className="perfil-card metas-card">
                        <h3 className="section-title">
                            <FiTarget className="section-icon" />
                            Metas ESG
                        </h3>

                        <div className="meta-item">

                            <div className="meta-icone amarelo">
                                <FiUsers />
                            </div>

                            <div className="meta-info">
                                <span>Meta de Diversidade</span>
                                <h2 className="meta-valor amarelo-dado">
                                    {metas.diversidade}%
                                </h2>
                            </div>

                        </div>

                        <hr />

                        <div className="meta-item">

                            <div className="meta-icone azul">
                                <FiCheckCircle />
                            </div>

                            <div className="meta-info">
                                <span>Meta de Contratações Inclusivas</span>
                                <h2 className="meta-valor azul-dado">
                                    {metas.contratacoesInclusivas}
                                </h2>
                            </div>

                        </div>

                        <button className="btn-editar">
                            Editar
                            <FiEdit />
                        </button>

                    </section>

                    <section className="perfil-card plano-card">

                        <h3 className="section-title">
                            <FiStar className="section-icon" />
                            Plano da Plataforma
                        </h3>

                        <div className="plano-header">
                            <div className="plano-header-info">
                                <FiStar className="plano-star" />
                                <div>
                                    <span className="plano-label">
                                        Plano Contratado
                                    </span>
                                    <h4>{plano.nome}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="plano-content">
                            {/* COLUNA 1 */}
                            <div className="plano-coluna">
                                <div className="beneficios">
                                    {plano.beneficios.map((beneficio, index) => (
                                        <div
                                            key={index}
                                            className="beneficio-item"
                                        >
                                            <FiCheckCircle className="beneficio-icon" />
                                            <span>{beneficio}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn-editar btn-plano">
                                    Alterar Plano
                                    <FiArrowRight />
                                </button>
                            </div>

                            {/* COLUNA 2 */}

                            <div className="plano-coluna">
                                <div className="info-item">
                                    <span>Valor Mensal</span>
                                    <p>{plano.valor}</p>
                                </div>
                                <div className="info-item">
                                    <span>Próxima Cobrança</span>
                                    <p>{plano.proximaCobranca}</p>
                                </div>
                                <div className="info-item">
                                    <span>Forma de Pagamento</span>
                                    <p>{plano.pagamento}</p>
                                </div>
                            </div>

                            {/* COLUNA 3 */}

                            <div className="plano-coluna">
                                <div className="info-item">
                                    <span>Renovação</span>
                                    <p>{plano.renovacao}</p>
                                </div>
                                <hr className="plano-divider" />
                                <div className="status-box">
                                    <span>Status</span>
                                    <div className="status-ativo">
                                        <span className="status-dot"></span>
                                        Ativo
                                    </div>
                                </div>
                                <button className="btn-editar btn-plano">
                                    Atualizar Pagamento
                                    <FiCreditCard />
                                </button>
                            </div>
                        </div>

                    </section>

                </div>

                <button className="btn-salvar">
                    Salvar Alterações
                </button>

            </div>
        </Layout>

    );
};

export default Perfil;