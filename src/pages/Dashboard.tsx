import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import Layout from "../components/Layout";
import "./Dashboard.css";
import { FiBarChart2, FiBriefcase, FiChevronRight, FiClock, FiZap } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";

const Dashboard = () => {

    const dashboard = {
        indicadores: [
            {
                titulo: "Diversidade Atual",
                valor: "38%",
                cor: "azul"
            },
            {
                titulo: "Contratações",
                valor: 12,
                cor: "escuro"
            },
            {
                titulo: "Vagas Abertas",
                valor: 5,
                cor: "verde-escuro"
            },
            {
                titulo: "Talentos Compatíveis",
                valor: 85,
                cor: "amarelo"
            }
        ],

        vagas: [
            "Designer UX",
            "Analista de Dados",
            "Desenvolvedor Front-End",
            "Engenheiro de Dados",
            "Desenvolvedor Back-End"
        ],

        diversidade: [
            { categoria: "Mulheres", valor: 82 },
            { categoria: "PCD", valor: 50 },
            { categoria: "LGBT", valor: 75 },
            { categoria: "Indígenas", valor: 40 },
            { categoria: "Pretos", valor: 65 },
            { categoria: "Outros", valor: 95 }
        ],

        atividades: [
            "Nova vaga UX publicada",
            "12 candidatos compatíveis encontrados",
            "Relatório ESG atualizado",
            "Perfil da empresa atualizado"
        ],

        insightsRapidos: [
            "Maior concentração de talentos no Sudeste",
            "Mulheres representam 38% dos candidatos",
            "Crescimento de 12% no matching este mês",
            "Diversidade aumentou 5% no último trimestre"
        ]
    };

    return (
        <Layout titulo="Dashboard">

            <div className="dashboard-cards">

                {dashboard.indicadores.map((item, index) => (

                    <div
                        key={index}
                        className={`card metric-card ${item.cor}`}
                    >
                        <h2>{item.valor}</h2>
                        <p>{item.titulo}</p>
                    </div>
                ))}
            </div>

            <div className="dashboard-middle">

                <div className="dashboard-card">
                    <h3 className="section-title">
                        <FiBarChart2 className="section-icon" />
                        Gráfico de Diversidade
                    </h3>

                    <div className="grafico-dashboard">
                        <ResponsiveContainer
                            width="100%"
                            height={240}
                        >
                            <BarChart data={dashboard.diversidade}>
                                <XAxis dataKey="categoria" />
                                <YAxis hide />
                                <Tooltip
                                    formatter={(value) => [`${value} candidatos`, "Quantidade"]}
                                />

                                <Bar
                                    dataKey="valor"
                                    radius={[4, 4, 0, 0]}
                                >
                                    {/* Revisar Cell deprecated no futuro. */}
                                    <Cell fill="#FCBB1A" />
                                    <Cell fill="#171A23" />
                                    <Cell fill="#6B8E00" />
                                    <Cell fill="#001F5B" />
                                    <Cell fill="#76AC6E" />
                                    <Cell fill="#237568" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3 className="section-title">
                        <FiBriefcase className="section-icon" />
                        Últimas Vagas Publicadas
                    </h3>

                    <ul className="lista-vagas">
                        {dashboard.vagas.map((vaga, index) => (
                            <li key={index}>
                                <FiChevronRight className="item-icon" />
                                {vaga}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="dashboard-bottom">

                <div className="dashboard-card">
                    <h3 className="section-title">
                        <FiClock className="section-icon" />
                        Atividade Recente
                    </h3>

                    <ul className="lista-atividades">
                        {dashboard.atividades.map((atividade, index) => (
                            <li key={index}>
                                <FiChevronRight className="item-icon" />
                                {atividade}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard-card">
                    <h3 className="section-title">
                        <FiZap className="section-icon" />
                        Insights Rápidos
                    </h3>

                    <ul className="lista-insights-rapidos" id="insights-rapidos">
                        {dashboard.insightsRapidos.map((insight, index) => (
                            <li key={index}>
                                <HiOutlineLightBulb className="item-icon" />
                                {insight}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </Layout>
    );
};

export default Dashboard;