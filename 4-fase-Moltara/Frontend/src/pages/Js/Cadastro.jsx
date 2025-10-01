import React, { useState } from "react";
import "../Css/Cadastro.css";
import Navbar from "../../components/Js/Navbar";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaIdCard, FaQuestionCircle } from "react-icons/fa";

export default function Cadastro() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aceitouTermos) {
      alert("Você precisa aceitar os Termos de Uso para continuar.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuario", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cpf,
          email,
          senha,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const data = await response.json();
      alert("Conta criada com sucesso! ID: " + data.id);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário: " + error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-cadastro">
        <form className="formulario-cadastro" onSubmit={handleSubmit}>
          <div className="titulo-cadastro">CRIAR CONTA</div>
          <div className="subtitulo-cadastro">
            Informe seus dados para continuar a compra
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
              type="text"
              placeholder="CPF"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <FaIdCard className="icon" />
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

          <div className="input-icon">
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Crie uma senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {showSenha ? (
              <FaEyeSlash className="icon" onClick={() => setShowSenha(!showSenha)} />
            ) : (
              <FaEye className="icon" onClick={() => setShowSenha(!showSenha)} />
            )}
          </div>

          <div className="input-icon confirm-password">
            <input
              type={showConfirma ? "text" : "password"}
              placeholder="Confirme sua senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {showConfirma ? (
              <FaEyeSlash className="icon" onClick={() => setShowConfirma(!showConfirma)} />
            ) : (
              <FaEye className="icon" onClick={() => setShowConfirma(!showConfirma)} />
            )}
          </div>

          <div className="input-icon confirm-password">
            <input
              type="text"
              placeholder="Onde você conheceu o Moltara?"
            />
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
              <a rel="noopener" href="https://www.moltara.com.br/termos-de-uso/">
                Termos de Uso
              </a>
            </label>
          </div>

          <button type="submit" className="botao-cadastro">
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
}