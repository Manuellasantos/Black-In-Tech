import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem('logado', 'true');
    localStorage.setItem('usuario', email);
    
    window.location.href = '/dashboard';
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-no-padding">
        <div className="login-wrapper">
          
          {/* Partículas de fundo */}
          <div className="particula p1"></div>
          <div className="particula p2"></div>
          <div className="particula p3"></div>
          <div className="particula p4"></div>
          <div className="particula p5"></div>
          <div className="particula p6"></div>
          <div className="particula p7"></div>
          <div className="particula p8"></div>
          <div className="particula p9"></div>
          <div className="particula p10"></div>

          <div className="login-container">
            <img src="/logopng.svg" alt="Logo App Bit" className="logo-app" />

            <h1>Bem-vindo ao App Bit</h1>
            <p className="subtitle">
              Diversidade, inclusão e dados<br />para decisões mais inteligentes.
            </p>

            <form onSubmit={handleLogin}>
              
              {/* Campo de E-mail Animado */}
              <div className="input-group-animated">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" " 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <label htmlFor="email">E-mail</label>
              </div>

              {/* Campo de Senha Animado */}
              <div className="input-group-animated">
                <input 
                  type="password" 
                  id="password" 
                  placeholder=" " 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <label htmlFor="password">Senha</label>
              </div>

              <a href="#" className="forgot-password">Esqueceu sua senha?</a>

              <button type="submit" className="btn-primary">Entrar</button>
            </form>

            <div className="divider">ou continue com</div>

            <button className="btn-google">
              <img src="/icons8-google-50.svg" alt="Google" className="google-icon" />
              Google
            </button>

            <a href="/cadastro" className="footer-link">Não tem conta? Cadastre sua empresa</a>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;