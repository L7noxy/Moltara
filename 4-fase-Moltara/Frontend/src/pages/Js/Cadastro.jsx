import React, { useState, useEffect } from "react";
import "../Css/Cadastro.css";
import Navbar from "../../components/Js/Navbar";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaUser,
  FaIdCard,
  FaQuestionCircle,
} from "react-icons/fa";

export default function Cadastro() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const dados = { nome, email };

    try {
      const resposta = await fetch("https://sua-api.com/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao salvar os dados.");
      }

      const data = await resposta.json();
      console.log("Dados salvos com sucesso:", data);

      setMensagem("Dados salvos com sucesso!");
      setNome("");
      setEmail("");
    } catch (erro) {
      console.error("Ocorreu um erro:", erro);
      setMensagem("Ocorreu um erro ao salvar os dados.");
    }
  };

  useEffect(() => {
    try {
      const storedSenha = localStorage.getItem("senha");
      if (storedSenha) {
        setSenha(storedSenha);
      }
    } catch (error) {
      console.error("Erro ao obter senha do localStorage:", error);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-cadastro">
        <form className="formulario-cadastro" onSubmit={handleSubmit}>
          <div className="titulo-cadastro">CRIAR CONTA</div>
          <div className="subtitulo-cadastro">
            Informe seus dados para continuar a compra
          </div>

          {/* Nome */}
          <div className="input-icon">
            <input
              type="text"
              placeholder="Nome"
              required
              value={nome}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>

          {/* CPF */}
          <div className="input-icon">
            <input
              type="text"
              placeholder="CPF"
              required
              value={cpf}
              onChange={handleChange}
            />
            <FaIdCard className="icon" />
          </div>

          {/* Email */}
          <div className="input-icon">
            <input
              type="email"
              placeholder="Insira seu email"
              required
              value={email}
              onChange={handleChange}
            />
            <FaEnvelope className="icon" />
          </div>

          {/* Senha */}
          <div className="input-icon">
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Crie uma senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {showSenha ? (
              <FaEyeSlash
                className="icon"
                onClick={() => setShowSenha(!showSenha)}
              />
            ) : (
              <FaEye
                className="icon"
                onClick={() => setShowSenha(!showSenha)}
                values={senha}
              />
            )}
          </div>

          {/* Confirmar senha */}
          <div className="input-icon confirm-password">
            <input
              type={showConfirma ? "text" : "password"}
              placeholder="Confirme sua senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {showConfirma ? (
              <FaEyeSlash
                className="icon"
                onClick={() => setShowConfirma(!showConfirma)}
              />
            ) : (
              <FaEye
                className="icon"
                onClick={() => setShowConfirma(!showConfirma)}
              />
            )}
          </div>

          {/* Pergunta adicional */}
          <div className="input-icon confirm-password">
            <input type="text" placeholder="Onde você conheceu o Moltara?" />
            <FaQuestionCircle className="icon" />
          </div>

          {/* Checkbox Termos */}
          <div className="termos">
            <input
              type="checkbox"
              id="termos"
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
            />
            <label htmlFor="termos">
              Li e aceito os{" "}
              <a href="/termos" target="_blank" rel="noopener noreferrer">
                Termos de Uso
              </a>
            </label>
          </div>

          {/* Botão */}
          <button type="submit" className="botao-cadastro">
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
}
