import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Dashboard: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                Dashboard
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;