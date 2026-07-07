import { NavLink } from "react-router-dom";
import {
    FiGrid,
    FiBriefcase,
    FiBarChart2,
    FiTrendingUp,
    FiUser,
    FiHelpCircle,
    FiLogOut
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {

    const handleLogout = () => {
        localStorage.removeItem("logado");
        localStorage.removeItem("usuario");

        window.location.href = "/login";
    };

    return (
        <aside className="sidebar">

            { }
            <div className="sidebar-header">
                { }
                <img src="/logopng.svg" alt="Logo" className="app-logo" />
                <h2 className="sidebar-logo">App Bit</h2>
            </div>

            <nav className="sidebar-nav">
                { }
                <div className="nav-group">
                    <NavLink to="/dashboard">
                        <FiGrid className="sidebar-icon" /> Dashboard
                    </NavLink>

                    <NavLink to="/publicar-vaga">
                        <FiBriefcase className="sidebar-icon" /> Publicar Vaga
                    </NavLink>

                    <NavLink to="/resultados">
                        <FiBarChart2 className="sidebar-icon" /> Resultados
                    </NavLink>

                    <NavLink to="/insights">
                        <FiTrendingUp className="sidebar-icon" /> Insights ESG
                    </NavLink>
                </div>

                { }
                <hr className="sidebar-divider" />

                { }
                <div className="nav-group">
                    <NavLink to="/perfil">
                        <FiUser className="sidebar-icon" /> Perfil
                    </NavLink>

                    <NavLink to="/suporte">
                        <FiHelpCircle className="sidebar-icon" /> Suporte
                    </NavLink>
                </div>
                <hr className="sidebar-divider" />

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <FiLogOut className="sidebar-icon" />
                    Sair
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;