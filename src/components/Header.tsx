
interface HeaderProps {
    titulo: string;
}

const Header = ({ titulo }: HeaderProps) => {
    return (
        <div>
            <h1>{titulo}</h1>
        </div>
    );
};

export default Header;