import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Perfil: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                Perfil
            </IonContent>
        </IonPage>
    );
};

export default Perfil;