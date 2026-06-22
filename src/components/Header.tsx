import "./Header.css";

interface HeaderProps {
    titulo: string;
}

const Header = ({ titulo }: HeaderProps) => {
    return (
        <header className="header">
            <h1>{titulo}</h1>
        </header>
    );
};

export default Header;