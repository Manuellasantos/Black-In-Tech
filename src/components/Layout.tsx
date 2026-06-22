import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
    titulo: string;
    children: React.ReactNode;
}

const Layout = ({ titulo, children }: LayoutProps) => {
    return (
        <div>

            <Sidebar />

            <div>

                <Header titulo={titulo} />

                <main>
                    {children}
                </main>

            </div>

        </div>
    );
};

export default Layout;