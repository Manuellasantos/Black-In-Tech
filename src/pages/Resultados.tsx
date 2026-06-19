import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Resultados: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Resultados</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                Resultados
            </IonContent>
        </IonPage>
    );
};

export default Resultados;