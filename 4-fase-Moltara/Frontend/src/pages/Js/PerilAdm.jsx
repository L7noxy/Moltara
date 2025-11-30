import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/PerfilAdm.css";

function PerfilAdm() {
  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const carregarDadosPerfil = async () => {
      setIsLoading(true);
      setStatusMessage(null);

      try {
        const response = await axios.get("http://localhost:3000/api/admin/perfil", {
          withCredentials: true
        });

        const dadosAdm = response.data;

        setNome(dadosAdm.Nome);
        setEmail(dadosAdm.Email);

      } catch (error) {
        console.error("Erro ao carregar o perfil:", error);
        const msg = error.response?.data?.message || "Não foi possível carregar o perfil.";
        setStatusMessage({ type: "error", text: msg });
      } finally {
        setIsLoading(false);
      }
    };

    carregarDadosPerfil();
  }, []);

  const salvarDados = async () => {
    if (!Nome.trim() || !Email.trim()) {
      setStatusMessage({ type: "error", text: "Nome e Email são obrigatórios." });
      return;
    }

    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EmailRegex.test(Email)) {
      setStatusMessage({ type: "error", text: "Email inválido." });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    const dadosAtualizados = { Nome, Email };

    if (Senha.trim()) {
      dadosAtualizados.Senha = Senha;
    }

    try {
      await axios.put(
        "http://localhost:3000/api/admin/perfil",
        dadosAtualizados,
        { withCredentials: true }
      );

      setStatusMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
      setSenha("");

    } catch (error) {
      console.error("Erro ao atualizar:", error);
      const msg = error.response?.data?.message || "Erro ao salvar.";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Container-admPerfil">
      <div className="Container-formulario">

        <img src="/img/userAdm.png" className="iconPerfilAdm" />

        <div className="alinhamento-form">
          <label>Nome</label>
          <input type="text" value={Nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="alinhamento-form">
          <label>Email</label>
          <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="alinhamento-form">
          <label>Senha</label>
          <input type="password" value={Senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <button className="button-salvar" onClick={salvarDados}>
          Salvar
        </button>
      </div>
    </div>
  );
}

export default PerfilAdm;
