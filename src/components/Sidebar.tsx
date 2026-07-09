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
                        <FiGrid className="sidebar-icon" /> 
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/publicar-vaga">
                        <FiBriefcase className="sidebar-icon" /> 
                        <span>Publicar Vaga</span>
                    </NavLink>

                    <NavLink to="/resultados">
                        <FiBarChart2 className="sidebar-icon" /> 
                        <span>Resultados</span>
                    </NavLink>

                    <NavLink to="/insights">
                        <FiTrendingUp className="sidebar-icon" /> 
                        <span>Insights ESG</span>
                    </NavLink>
                </div>

                { }
                <hr className="sidebar-divider" />

                { }
                <div className="nav-group">
                    <NavLink to="/perfil">
                        <FiUser className="sidebar-icon" /> 
                        <span>Perfil</span>
                    </NavLink>

                    <NavLink to="/suporte">
                        <FiHelpCircle className="sidebar-icon" /> 
                        <span>Suporte</span>
                    </NavLink>
                </div>
                <hr className="sidebar-divider" />

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <FiLogOut className="sidebar-icon" />
                    <span>Sair</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;