import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './CadastroEmpresa.css';

const CadastroEmpresa: React.FC = () => {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const formatarCNPJ = (valor: string) => {
        valor = valor.replace(/\D/g, '');

        valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');

        return valor.slice(0, 18);
    };

    const handleCadastro = (e: React.FormEvent) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        if (senha.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        const cnpjLimpo = cnpj.replace(/\D/g, '');

        if (cnpjLimpo.length !== 14) {
            alert('CNPJ deve possuir 14 números.');
            return;
        }

        if (!nome.trim()) {
            alert('Informe o nome da empresa.');
            return;
        }

        const empresa = {
            nome,
            cnpj,
            email,
            senha
        };

        localStorage.setItem(
            'empresaDemo',
            JSON.stringify(empresa)
        );

        alert('Empresa cadastrada com sucesso!');

        window.location.href = '/login';
    };

    return (
        <IonPage>
            <IonContent fullscreen className="ion-no-padding">

                <div className="cadastro-wrapper">

                    <div className="cadastro-container">

                        <img
                            src="/logopng.svg"
                            alt="Logo App Bit"
                            className="logo-app"
                        />

                        <h1>Cadastro da Empresa</h1>

                        <p className="subtitle">
                            Cadastre sua empresa para acessar a plataforma App Bit.
                        </p>

                        <form onSubmit={handleCadastro}>

                            <div className="input-group-animated">
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder=" "
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                                <label htmlFor="nome">
                                    Nome da Empresa
                                </label>
                            </div>

                            <div className="input-group-animated">
                                <input
                                    type="text"
                                    id="cnpj"
                                    placeholder=" "
                                    value={cnpj}
                                    onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
                                    required
                                />
                                <label htmlFor="cnpj">
                                    CNPJ
                                </label>
                            </div>

                            <div className="input-group-animated">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">
                                    E-mail Corporativo
                                </label>
                            </div>

                            <div className="input-group-animated">
                                <input
                                    type="password"
                                    id="senha"
                                    placeholder=" "
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    minLength={6}
                                    required
                                />
                                <label htmlFor="senha">
                                    Senha
                                </label>
                            </div>

                            <div className="input-group-animated">
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    placeholder=" "
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required
                                />
                                <label htmlFor="confirmarSenha">
                                    Confirmar Senha
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                            >
                                Cadastrar Empresa
                            </button>

                        </form>

                    </div>

                </div>

            </IonContent>
        </IonPage>
    );
};

export default CadastroEmpresa;