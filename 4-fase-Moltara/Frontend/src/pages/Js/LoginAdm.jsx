import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Css/loginAdm.css';
import axios from "axios";

axios.defaults.withCredentials = true;

export default function LoginAdm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const fazerLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/login",
        {
          email,
          senha,
        },
        { withCredentials: true }
      );

      
    } catch (error) {
      alert("Credenciais inválidas ou sem permissão");
    }
  };

  return (
    <div>
      <h1>Login Admin</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Senha"
        type="password"
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={fazerLogin}>Entrar</button>
    </div>
  );
}
