import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import "../Css/login.css"; 
import Navbar from "../../components/Js/Navbar.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Removida FaEye, pois não foi usada na lógica


export default function Login() {  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const LOGIN_URL = 'http://localhost:3000/api/usuario/login'; 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento padrão da página

    setError("");
    setMessage("");
    setLoading(true);

    try {
      // 2. Faz a requisição POST para o backend
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      // 3. Processa a resposta
      if (response.ok) {
        // Sucesso no login
        const { token } = data; 
        setMessage("Login bem-sucedido!");

        // 4. Armazena o JWT no Local Storage ou em Cookies
        localStorage.setItem('token', token); 
        
        // 5. Redireciona o usuário (ex: para a Dashboard)
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 1000); 

      } else {
        // Falha no login (ex: email/senha inválidos)
        setError(data.error || "Ocorreu um erro no login.");
        setMessage("");
      }

    } catch (err) {
      // Erro de rede ou servidor
      console.error("Erro na requisição:", err);
      setError("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      setMessage("");
    } finally {
      setLoading(false); // Finaliza o estado de loading
    }
  };


  return (
    <div>
      <Navbar />
      <div className="container-login">
        {/* 2. Adiciona o manipulador onSubmit ao formulário */}
        <form className="formulario-login" onSubmit={handleSubmit}> 
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
          
          {error && <p className="status-error">{error}</p>}
          {message && <p className="status-success">{message}</p>} 
          {/* Adicione classes status-error e status-success no seu CSS */}

          <div className="links-adicionais">
            <Link to="/cadastro">Não tem conta? Cadastre-se aqui</Link>
          </div>

        </form>
      </div>
    </div>
  );
}