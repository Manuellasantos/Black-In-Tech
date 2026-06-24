import { FiUser, FiTarget, FiStar, FiGrid, FiFileText, FiTag, FiUsers } from "react-icons/fi";
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
                            <span>Nome</span>
                            <p>{responsavel.nome}</p>
                        </div>

                        <div className="responsavel-item">
                            <span>Cargo</span>
                            <p>{responsavel.cargo}</p>
                        </div>

                        <div className="responsavel-item">
                            <span>E-mail</span>
                            <p>{responsavel.email}</p>
                        </div>

                        <div className="responsavel-item">
                            <span>Telefone</span>
                            <p>{responsavel.telefone}</p>
                        </div>

                        <button className="btn-editar">
                            Editar
                        </button>

                    </div>
                </section>

                <div className="perfil-grid">

                    <section className="perfil-card">
                        <h3 className="section-title">
                            <FiTarget className="section-icon" />
                            Metas ESG
                        </h3>

                        <p>
                            Meta Diversidade:
                            {metas.diversidade}%
                        </p>

                        <p>
                            Contratações Inclusivas:
                            {metas.contratacoesInclusivas}
                        </p>
                    </section>

                    <section className="perfil-card plano-card">
                        <h3 className="section-title">
                            <FiStar className="section-icon" />
                            Plano da Plataforma
                        </h3>

                        <p>Premium Plus</p>

                        <p>R$ 599,90</p>

                        <p>Status: Ativo</p>
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