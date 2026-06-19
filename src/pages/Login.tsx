import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Login: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                Login
            </IonContent>
        </IonPage>
    );
};

export default Login;