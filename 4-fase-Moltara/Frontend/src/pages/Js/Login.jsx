import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx"; 
import "../Css/login.css"; 
import Navbar from "../../components/Js/Navbar.jsx";
import { FaEye, FaEnvelope, FaLock } from "react-icons/fa"; // Trocado FaUser/FaIdCard por FaLock


export default function Login() {
  const { signin } = useAuth();
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if(!email || !senha) {
      setError("Prencha os campos de email e senha");
      return;
    }

    const res = signin(email, senha);

    if(res){
      setError(res)
      return;
    }
    Navigate("/")
  }
  return (
    <div>
      <Navbar />
      <div className="container-login">
        <form className="formulario-login" onSubmit={handleLogin}> 
          <h2 className="titulo-login">Faça seu Login</h2>
          <div className="subtitulo-login">
            Entre com seus dados para continuar
          </div>

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

          <div className="input-icon">
            <input
              type="password"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <FaLock className="icon" /> 
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