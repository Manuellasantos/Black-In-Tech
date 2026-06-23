import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Layout from "../components/Layout";
import mapaBrasil from "../assets/mapa/brasil.svg";
import "./Insights.css";
const Insights: React.FC = () => {

    const indicadores = [
        {
            valor: "38%",
            titulo: "Diversidade Atual",
            variacao: "+12%",
            descricao: "crescimento no último trimestre",
            tendencia: "up",
            cor: "azul"
        },
        {
            valor: "87%",
            titulo: "Bem-estar dos Colaboradores",
            variacao: "-4%",
            descricao: "queda no último trimestre",
            tendencia: "down",
            cor: "escuro"
        },
        {
            valor: "8",
            titulo: "Contratações Inclusivas",
            variacao: "+6%",
            descricao: "crescimento no último trimestre",
            tendencia: "up",
            cor: "verde-escuro"
        },
        {
            valor: "5",
            titulo: "Regiões com Talentos Disponíveis",
            variacao: "",
            descricao: "",
            tendencia: "",
            cor: "amarelo"
        }
    ];

    const metasESG = {
        diversidadeAtual: 38,
        metaAnual: 50,
        progresso: 76
    };

    const evolucaoDiversidade = [
        { mes: "Jan", diversidade: 12 },
        { mes: "Fev", diversidade: 13 },
        { mes: "Mar", diversidade: 13 },
        { mes: "Abr", diversidade: 15 },
        { mes: "Mai", diversidade: 17 },
        { mes: "Jun", diversidade: 22 },
        { mes: "Jul", diversidade: 23 },
        { mes: "Ago", diversidade: 29 },
        { mes: "Set", diversidade: 30 },
        { mes: "Out", diversidade: 32 },
        { mes: "Nov", diversidade: 35 },
        { mes: "Dez", diversidade: 41 }
    ]

    const insights = [
        "Crescimento de 12% na diversidade da equipe.",
        "Maior concentração de talentos na região Sudeste.",
        "Aumento das contratações inclusivas no último trimestre.",
        "Meta ESG anual com 76% de progresso."
    ];

    const distribuicaoRegiao = [
        {
            regiao: "Sudeste",
            percentual: 85
        },
        {
            regiao: "Sul",
            percentual: 60
        },
        {
            regiao: "Nordeste",
            percentual: 75
        },
        {
            regiao: "Centro-Oeste",
            percentual: 45
        }
    ];

    const concentracaoTalentos = [
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
    ];

    return (
        <Layout titulo="Insights ESG">

            <div className="insights-cards">

                {indicadores.map((item, index) => (
                    <div
                        key={index}
                        className={`card-esg ${item.cor}`}
                    >
                        <h2>{item.valor}</h2>
                        <p>{item.titulo}</p>

                        {item.variacao && (
                            <span className="indicador-tendencia">

                                {item.tendencia === "up" ? (
                                    <FiTrendingUp className="icone-positivo" />
                                ) : (
                                    <FiTrendingDown className="icone-negativo" />
                                )}

                                <span className="texto-tendencia">
                                    {item.variacao} {item.descricao}
                                </span>

                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="insights-content">

                <div className="insights-left">

                    <div className="insight-card">
                        <h3>Metas ESG</h3>

                        <div className="meta-info">
                            <span className="meta-label">
                                Diversidade:
                            </span>

                            <span className="meta-valor">
                                {metasESG.diversidadeAtual}% / {metasESG.metaAnual}%
                            </span>
                        </div>

                        <div className="progress-container">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${metasESG.progresso}%`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="insight-card">
                        <h3>Evolução da Diversidade</h3>

                        <div className="grafico-container">
                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={evolucaoDiversidade}>
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="mes" />

                                    <YAxis />

                                    <Tooltip
                                        formatter={(value) => [`${value}%`, "Diversidade"]}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="diversidade"
                                        stroke="#FCBB1A"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="insight-card">
                        <h3>Distribuição por Região</h3>

                        <div className="regioes-container">

                            {distribuicaoRegiao.map((item, index) => (
                                <div
                                    key={index}
                                    className="regiao-item"
                                >
                                    <span className="regiao-nome">
                                        {item.regiao}
                                    </span>

                                    <div className="regiao-barra">
                                        <div
                                            className="regiao-preenchimento"
                                            style={{
                                                width: `${item.percentual}%`
                                            }}
                                        />
                                    </div>

                                    <span className="regiao-valor">
                                        {item.percentual}%
                                    </span>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="insights-right">
                    <div className="insight-card">
                        <div className="mapa-card">
                            <h3>Mapa de Concentração de Talentos</h3>

                            <div className="mapa-container">

                                <img
                                    src={mapaBrasil}
                                    alt="Mapa do Brasil"
                                    className="mapa-brasil"
                                />

                                {concentracaoTalentos.map((item) => (
                                    <div
                                        key={item.regiao}
                                        className={`badge-regiao ${item.regiao.toLowerCase()}`}
                                    >
                                        {item.percentual}%
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                    <div className="insight-card">
                        <h3>Insights Gerados</h3>

                        <ul className="lista-insights">
                            {insights.map((insight, index) => (
                                <li key={index}>
                                    {insight}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Insights;