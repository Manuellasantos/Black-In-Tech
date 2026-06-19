import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const PublicarVaga: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Publicar Vaga</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                Publicar Vaga
            </IonContent>
        </IonPage>
    );
};

export default PublicarVaga;