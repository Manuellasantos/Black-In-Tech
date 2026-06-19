import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Suporte: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Suporte</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                Suporte
            </IonContent>
        </IonPage>
    );
};

export default Suporte;