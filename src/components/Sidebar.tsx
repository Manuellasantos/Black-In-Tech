import { Link } from "react-router-dom";
import dashboardIcon from "../assets/icons/icon-dash.svg";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">

            <h2>App Bit</h2>

            <nav className="sidebar-nav">
                <Link to="/dashboard">
                    <img src={dashboardIcon} alt="Dashboard"/>
                    Dashboard
                </Link>
                <Link to="/publicar-vaga">📄 Publicar Vaga</Link>
                <Link to="/resultados">🎯 Resultados</Link>
                <Link to="/insights">📊 Insights ESG</Link>
                <Link to="/perfil">👤 Perfil</Link>
                <Link to="/suporte">❓ Suporte</Link>

            </nav>
        </aside>
    );
};

export default Sidebar;