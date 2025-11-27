import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import "../Css/login.css";
import Navbar from "../../components/Js/Navbar.jsx";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaIdCard } from "react-icons/fa";

export default function Register() { // 👈 Renomeado para Register
  
  // 1. Estados
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // 2. Contexto e Navegação
  const { register } = useGlobalContext(); // 🔑 Obtendo a função de registro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpa mensagens anteriores
    setLoading(true);

    if (senha !== confirmarSenha) {
      setMessage("As senhas não coincidem!");
      setLoading(false);
      return;
    }
    
    // ⚠️ Removido: A API de cadastro é agora a função do Contexto (Backend/src/controllers/auth.controller.js)
    // O seu GlobalContext.register já faz o fetch e lida com o token!

    const result = await register(nome, email, senha);

    if (result.success) {
      setMessage("Cadastro realizado com sucesso! Redirecionando...");
      // Após o sucesso, o token já está salvo no GlobalContext.
      // Navega para a página principal (ou carrinho)
      navigate('/'); 
    } else {
      // Exibe o erro retornado pelo backend
      setMessage(`Erro no cadastro: ${result.error}`);
    }

    setLoading(false);
    
    // ❌ REMOVIDO: Limpeza de campos desnecessária e lógica de login/setTimeout errada.
    /* setNome("");
    setSenha("");
    setCpf("");
    setConfirmarSenha("");
    setEmail("");
    setLogin(true);
    if (login) { ... }
    */
  };

  return (
    <div>
      <Navbar />
      <div className="container-cadastro">
        <form className="formulario-cadastro" onSubmit={handleSubmit}> 
          <div className="subtitulo-cadastro">
            Informe seus dados para criar sua conta
          </div>

          {/* NOME */}
          <div className="input-icon">
            <input
              type="text"
              placeholder="Nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          {/* EMAIL */}
          <div className="input-icon">
            <input
              type="email"
              placeholder="Insira seu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>
          
          {/* CPF - ADICIONADO PARA CADASTRO COMPLETO */}
          <div className="input-icon">
            <input
              type="text"
              placeholder="CPF"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={14} // Máximo 14 para CPF formatado
            />
            <FaIdCard className="icon" />
          </div>

          {/* SENHA */}
          <div className="input-icon">
            <input
              type="password" // Tipo password para ocultar
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <FaEye className="icon" /> 
          </div>

          {/* CONFIRMAR SENHA */}
          <div className="input-icon">
            <input
              type="password" // Tipo password para ocultar
              placeholder="Confirme a Senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <FaEyeSlash className="icon" /> 
          </div>

          <button type="submit" className="botao-cadastro" disabled={loading}>
            {loading ? "CADASTRANDO..." : "CRIAR CONTA"}
          </button>
          
          {/* Mensagens de Sucesso/Erro */}
          {message && <p className="status-message">{message}</p>}

        </form>
      </div>
    </div>
  );
}