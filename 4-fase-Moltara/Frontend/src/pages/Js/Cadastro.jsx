import React, { useState } from "react";
import "../Css/Cadastro.css";
import Navbar from "../../components/Js/Navbar";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaIdCard, FaQuestionCircle } from "react-icons/fa";

export default function Cadastro() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aceitouTermos) {
      alert("Você precisa aceitar os Termos de Uso para continuar.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    alert("Conta criada com sucesso!");
    
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
            <input type="text" placeholder="Nome" required />
            <FaUser className="icon" />
          </div>

          <div className="input-icon">
            <input type="text" placeholder="CPF" required />
            <FaIdCard className="icon" />
          </div>

          <div className="input-icon">
            <input type="email" placeholder="Insira seu email" required />
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

          {/* Pergunta adicional */}
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
              <a rel="noopener noreferrer">
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