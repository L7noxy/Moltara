import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Css/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login:", { email, senha });
       
    };

    return (
        <div className="container-login">
            <div className="login-wrapper">
                {/* Shape decorativa de fundo */}
                <div className="login-background-shape"></div>

                <h2>Login</h2>
                <p className="subtitulo">Acesse sua conta para continuar</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Campo de Email */}
                    <div className="input-group">
                        <span className="icon">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo de Senha */}
                    <div className="input-group">
                        <span className="icon">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    {/* Botão Entrar */}
                    <button type="submit" className="btn-login">
                        Entrar
                    </button>
                </form>

                {/* Link para cadastro */}
                <p className="texto-link">
                    Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
                </p>
            </div> \
        </div>

    );
};

export default Login;
