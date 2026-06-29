import Layout from "../components/Layout";
import "./Dashboard.css";

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
            "Desenvolvedor Front-End"
        ],

        diversidade: [
            { categoria: "Mulheres", valor: 82, cor: "barra-azul" },
            { categoria: "PCD", valor: 70, cor: "vinho" },
            { categoria: "LGBTQIA+", valor: 95, cor: "verde" },
            { categoria: "Indígenas", valor: 40, cor: "vermelha" },
            { categoria: "Pretos/Pardos", valor: 65, cor: "amarela" },
            { categoria: "Outros", valor: 115, cor: "barra-escura" }
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
                    <h3>Gráfico de Diversidade</h3>

                    <div className="grafico-placeholder">
                        {dashboard.diversidade.map((item, index) => (

                            <div
                                key={index}
                                className={`barra ${item.cor}`}
                                style={{ height: `${item.valor}px` }}
                                title={item.categoria}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>Últimas Vagas Publicadas</h3>

                    <ul className="lista-vagas">
                        {dashboard.vagas.map((vaga, index) => (
                            <li key={index}>
                                ▶ {vaga}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="dashboard-bottom">

                    <div className="dashboard-card">
                        <h3>Atividade Recente</h3>

                        <ul className="lista-atividades">
                            {dashboard.atividades.map((atividade, index) => (
                                <li key={index}>
                                    • {atividade}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="dashboard-card">
                        <h3>Insights Rápidos</h3>

                        <ul className="lista-insights">
                            {dashboard.insightsRapidos.map((insight, index) => (
                                <li key={index}>
                                    💡 {insight}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

        </Layout>
    );
};

export default Dashboard;