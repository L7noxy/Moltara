import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx"; 
import "../Css/login.css"; 
import Navbar from "../../components/Js/Navbar.jsx";
import { FaEye, FaEnvelope, FaLock } from "react-icons/fa"; // Trocado FaUser/FaIdCard por FaLock

export default function Login() {
  
  // 1. Estados essenciais para o Login
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // 2. Contexto e Navegação
  // 🔑 Usa a função 'login' do GlobalContext
  const { login } = useGlobalContext(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpa mensagens anteriores
    setLoading(true);

    const result = await login(email, senha);

    if (result.success) {
      setMessage("Login bem-sucedido! Redirecionando...");
      navigate('/'); 
    } else {
      setMessage(`Erro ao fazer login: ${result.error}`);
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      {/* ⚠️ Alterada a classe container-cadastro para container-login */}
      <div className="container-login">
        {/* ⚠️ Alterada a classe formulario-cadastro para formulario-login */}
        <form className="formulario-login" onSubmit={handleSubmit}> 
          <h2 className="titulo-login">Faça seu Login</h2>
          <div className="subtitulo-login">
            Entre com seus dados para continuar
          </div>

          {/* EMAIL */}
          <div className="input-icon">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>

          {/* SENHA */}
          <div className="input-icon">
            <input
              type="password"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <FaLock className="icon" /> {/* Ícone de cadeado */}
          </div>

          <button type="submit" className="botao-login" disabled={loading}>
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </button>
          
          {message && <p className="status-message">{message}</p>}

          <div className="links-adicionais">
            <Link to="/cadastro">Não tem conta? Cadastre-se aqui</Link>
          </div>

        </form>
      </div>
    </div>
  );
}