import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../Css/login.css";
import Navbar from "../../components/Js/Navbar.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";

import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault(); 

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuario/login",
        { email, senha },
        { withCredentials: true }
      );

      localStorage.setItem("userName", response.data.nome);

      setMessage("Login realizado com sucesso");

      if (response.data.role === "user") {
        navigate("/");
      } else if (response.data.role === "admin") {
        navigate("/painelDeControle");
      }
    } catch (err) {
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-login">
        <form className="formulario-login" onSubmit={(e) => fazerLogin(e)}>
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

          <div className="links-adicionais">
            <Link to="/cadastro">Não tem conta? Cadastre-se aqui</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
