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

        mapa: [
            {
                regiao: "Norte",
                percentual: 5
            },
            {
                regiao: "Nordeste",
                percentual: 12
            },
            {
                regiao: "Centro-Oeste",
                percentual: 21
            },
            {
                regiao: "Sudeste",
                percentual: 47
            },
            {
                regiao: "Sul",
                percentual: 15
            }
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

            <div className="dashboard-card mapa-card">
                <h3>Mapa de Concentração de Talentos</h3>

                <div className="mapa-placeholder">
                    {dashboard.mapa.map((item, index) => (
                        <div
                            key={index}
                            className="mapa-item"
                        >
                            <div className="circulo"></div>
                            <span>
                                {item.regiao}
                            </span>
                            <strong>
                                {item.percentual}%
                            </strong>
                        </div>
                    ))}
                </div>
            </div>

        </Layout>
    );
};

export default Dashboard;