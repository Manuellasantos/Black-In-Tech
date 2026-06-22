import { NavLink } from "react-router-dom";
import { 
    FiGrid, 
    FiBriefcase, 
    FiBarChart2, 
    FiTrendingUp, 
    FiUser, 
    FiSettings, 
    FiHelpCircle 
} from "react-icons/fi"; 
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            
            {}
            <div className="sidebar-header">
                {}
                <img src="/logopng.svg" alt="Logo" className="app-logo" />
                <h2 className="sidebar-logo">App Bit</h2>
            </div>

            <nav className="sidebar-nav">
                {}
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

                {}
                <hr className="sidebar-divider" />

                {}
                <div className="nav-group">
                    <NavLink to="/perfil">
                        <FiUser className="sidebar-icon" /> Perfil
                    </NavLink>
                    
                    <NavLink to="/suporte">
                        <FiHelpCircle className="sidebar-icon" /> Suporte
                    </NavLink>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;