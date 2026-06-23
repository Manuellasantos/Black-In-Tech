import Layout from "../components/Layout";
import "./Dashboard.css";

const Dashboard = () => {
    return(
        <Layout titulo="Dashboard">

            <div className="dashboard-cards">

                <div className="card metric-card azul">
                    <h2>38%</h2>
                    <p>Diversidade Atual</p>
                </div>

                <div className="card metric-card escuro">
                    <h2>12</h2>
                    <p>Contratações</p>
                </div>

                <div className="card metric-card amarelo">
                    <h2>5</h2>
                    <p>Vagas Abertas</p>
                </div>

                <div className="card metric-card roxo">
                    <h2>85</h2>
                    <p>Talentos Compatíveis</p>
                </div>

            </div>

            <div className="dashboard-middle">

                <div className="dashboard-card">
                    <h3>Gráfico de Diversidade</h3>

                    <div className="grafico-placeholder">
                        <div className="barra barra-azul"></div>
                        <div className="barra vinho"></div>
                        <div className="barra verde"></div>
                        <div className="barra vermelha"></div>
                        <div className="barra amarela"></div>
                        <div className="barra barra-escura"></div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>Últimas Vagas Publicadas</h3>

                    <ul className="lista-vagas">
                        <li>▶ Designer UX</li>
                        <li>▶ Analista de Dados</li>
                        <li>▶ Desenvolvedor Front-End</li>
                    </ul>
                </div>

            </div>

            <div className="dashboard-card mapa-card">
                <h3>Mapa de Concentração de Talentos</h3>

                <div className="mapa-placeholder">
                    <div className="circulo circulo-amarelo"></div>
                    <div className="circulo circulo-roxo"></div>
                    <div className="circulo circulo-azul"></div>
                </div>
            </div>

        </Layout>
    );
};

export default Dashboard;