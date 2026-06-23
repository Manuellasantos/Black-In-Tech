import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import Layout from "../components/Layout";
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

                        <p>
                            Diversidade Atual:
                            <strong> {metasESG.diversidadeAtual}%</strong>
                        </p>
                        <p>
                            Meta Anual:
                            <strong> {metasESG.metaAnual}%</strong>
                        </p>
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

                        <div className="grafico-placeholder">
                            <div className="barra barra1"></div>
                            <div className="barra barra2"></div>
                            <div className="barra barra3"></div>
                            <div className="barra barra4"></div>
                            <div className="barra barra5"></div>
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
                        <h3>Mapa de Concentração de Talentos</h3>

                        <div className="mapa-placeholder">
                            <div className="circulo circulo-amarelo"></div>
                            <div className="circulo circulo-roxo"></div>
                            <div className="circulo circulo-azul"></div>
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