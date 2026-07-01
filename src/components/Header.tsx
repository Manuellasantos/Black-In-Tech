import "./Header.css";
import { useState, useRef, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { languageOutline, sunnyOutline, notificationsOutline } from "ionicons/icons";

interface HeaderProps {
    titulo: string;
}

const Header = ({ titulo }: HeaderProps) => {

    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    const notifications = [
        "Nova vaga UX publicada",
        "12 candidatos compatíveis encontrados",
        "Relatório ESG atualizado",
        "Meta ESG atingiu 85%"
    ];

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

                {/* Idioma */}
                <IonIcon
                    icon={languageOutline}
                    className="header-icon"
                />
                {/*Tema dark/light*/}
                <IonIcon
                    icon={sunnyOutline}
                    className="header-icon"
                />
                <div
                    ref={notificationRef}
                    className="notification-container"
                >
                    {/* Sino de notificação */}
                    <div
                        className="notification-wrapper"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <IonIcon
                            icon={notificationsOutline}
                            className="header-icon"
                        />

                        <span className="notification-badge">
                            {notifications.length}
                        </span>
                    </div>
                    {/* Sino Dropdown */}
                    {showNotifications && (
                        <div className="notifications-dropdown">

                            <h4>Notificações:</h4>

                            {notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="notification-item"
                                >
                                    <span className="notification-icon"></span>

                                    <span>
                                        {notification}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;