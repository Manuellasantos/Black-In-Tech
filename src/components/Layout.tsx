import "./Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
    titulo: string;
    children: React.ReactNode;
}

const Layout = ({ titulo, children }: LayoutProps) => {
    return (
        <div className="layout">

            <Sidebar />

            <div className="layout-content">

                <Header titulo={titulo} />

                <main className="main-content">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default Layout;