import React from "react";
import "../Css/Perfil.css";
import Navbar from "../../components/Js/Navbar";
import Sidebar from "../../components/Js/Sidebar";
import { HiPencil } from "react-icons/hi2";

import { useState } from "react";

export default function Perfil() {
  const [nome, setNome] = useState("Gabriel");
  const [email, setEmail] = useState("gabriel@gmail.com");

  return (
    <div>
      <div>
        <Navbar />
        <div className="container-perfil">
          <Sidebar />
          <div className="perfil">
            <h1>Perfil</h1>
            <div className="perfil-info">
              <div className="perfil-info-item">
                <label>Nome:</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="perfil-info-item">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
