import "./Sidebar.css";

const Sidebar = ()=> {
    return (
        <aside className="sidebar">
            <h2>App Bit</h2>
        
            <nav>
                <p>Dashboard</p>
                <p>Publicar Vaga</p>
                <p>Resultados</p>
                <p>Insights ESG</p>
                <p>Perfil</p>
                <p>Suporte</p>
            </nav>
        </aside>
    );
};

export default Sidebar;