import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../Css/Cadastro.css";
import Navbar from "../../components/Js/Navbar.jsx";


export default function Cadastro() {
  const [mensagem, setMensagem] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/usuario/cadastro", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        senha,
        cpf,
      }),
    });

    const data = await res.json();
    setMensagem(data.message || "");

    if (res.ok) {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-cadastro">
        <form className="formulario-cadastro" onSubmit={handleRegister}>
          <h1 className="titulo-cadastro">CRIAR CONTA</h1>
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
              maxLength={40}
            />
          </div>

          <div className="input-icon">
            <input
              type="text"
              placeholder="CPF"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={11}
            />
          </div>

          <div className="input-icon">
            <input
              type="email"
              placeholder="Insira seu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-icon">
            <input
              type='password'
              placeholder="Crie uma senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="input-icon confirm-password">
            <input
              type='password'
              placeholder="Confirme sua senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <div className="input-icon confirm-password">
            <input type="text" placeholder="Onde você conheceu o Montara? (opcional)" />
          </div>

          <div className="termos">
            <input
              type="checkbox"
              id="termos"
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
            />
            <label htmlFor="termos" className="label-termos">
              <div>
                Li e aceito os{" "}
                <a
                  rel="noopener"
                  href="https://www.montara.com.br/termos-de-uso/"
                >
                  Termos de Uso
                </a>
              </div>

              <div className="renders-termos">
                {!aceitouTermos && (
                  <p>aceite os termos de uso para continuar</p>
                )}
                {senha !== confirmarSenha && <p>as senhas nao coincidem</p>}
              </div>
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
