import "./Header.css";
import { IonIcon } from "@ionic/react";
import { languageOutline, sunnyOutline, notificationsOutline } from "ionicons/icons";

interface HeaderProps {
    titulo: string;
}

const Header = ({ titulo }: HeaderProps) => {

    const titulos: Record<string, [string, string]> = {
        "Dashboard": ["Dash", "board"],
        "Resultados": ["Resul", "tados"],
        "Perfil": ["Per", "fil"],
        "Suporte": ["Su", "porte"],
        "Insights ESG": ["Insights", " ESG"],
        "Publicar Vaga": ["Publicar", " Vaga"]
    };

    const [amarelo, azul] =
        titulos[titulo] || ["", titulo];

    return (
        <header className="header">

            <h1 className="header-title">
                <span className="titulo-amarelo">
                    {amarelo}
                </span>

                <span className="titulo-azul">
                    {azul}
                </span>
            </h1>

            <div className="header-actions">

                <IonIcon 
                    icon={languageOutline} 
                    className="header-icon"
                />

                <IonIcon 
                    icon={sunnyOutline}
                    className="header-icon" 
                />

                <IonIcon 
                    icon={notificationsOutline}
                    className="header-icon"
                />

            </div>
        </header>
    );
};

export default Header;