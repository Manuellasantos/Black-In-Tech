import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Insights: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Insights</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                Insights
            </IonContent>
        </IonPage>
    );
};

export default Insights;