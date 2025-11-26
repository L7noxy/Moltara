import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../Css/login.css";
import Navbar from "../../components/Js/Navbar.jsx";

import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaUser,
  FaIdCard,
  FaQuestionCircle,
} from "react-icons/fa";

export default function Login() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/usuario/cadastro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            senha,
            cpf,
          }),
        }
      );

      setNome("");
      setSenha("");
      setCpf("");
      setConfirmarSenha("");
      setEmail("");
    } catch (erro) {
      console.error("Ocorreu um erro:", erro);
    }

    setLogado(true);

    if (logado) {
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-cadastro">
        <form className="formulario-login" onSubmit={handleSubmit}>
          <div className="subtitulo-cadastro">
            Informe seus dados para continuar o Login
          </div>

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

          <button type="submit" className="botao-cadastro">
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
}
