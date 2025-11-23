import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Js/Navbar.jsx"; 2
import Footer from "../../components/Js/Footer.jsx";
import { FaUserCircle, FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';

import "../Css/Perfil.css";

export default function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: "Maria da Silva",
    email: "maria.silva@example.com",
    telefone: "(11) 98765-4321",
    enderecoPrincipal: "Rua das Flores, 123 - Apt 45, Centro - São Paulo, SP",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
      } catch (err) {
        setError("Não foi possível carregar os dados do usuário.");
        setIsLoading(false);
        console.error("Erro ao carregar perfil:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUsuario((prev) => ({ ...prev, avatarUrl: reader.result }));
        alert("Avatar atualizado (somente localmente).");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    alert("Você foi desconectado!");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="perfil-container">
        <Navbar />
        <div className="perfil-loading">Carregando perfil...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="perfil-container">
        <Navbar />
        <div className="perfil-error">Erro: {error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <Navbar />
      <div className="perfil-content-wrapper">
        <aside className="perfil-sidebar">
          <div className="perfil-avatar-section">
            <img
              src={usuario.avatarUrl}
              className="perfil-avatar"
            />
            <label htmlFor="avatar-upload" className="avatar-upload-label">
              Alterar Avatar
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden-input"
              />
            </label>
            <h2 className="perfil-nome">{usuario.nome}</h2>
          </div>

          <nav className="perfil-navigation">
            <ul className="perfil-nav-list">
              <li>
                <FaShoppingBag /> <span>Meus Pedidos</span>
              </li>
              <li>
                <FaMapMarkerAlt /> <span>Endereços de Entrega</span>
              </li>
              <li>
                <FaCreditCard /> <span>Métodos de Pagamento</span>
              </li>
              <li>
                <FaCog /> <span>Configurações da Conta</span>
              </li>
              <li onClick={handleLogout} className="perfil-nav-item logout">
                <FaSignOutAlt /> <span>Sair</span>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="perfil-main-content">
          <h1 className="perfil-main-title">Meu Perfil</h1>

          <section className="perfil-info-section">
            <h3>Informações Pessoais</h3>
            <div className="info-item">
              <strong>Nome:</strong> <span>{usuario.nome}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong> <span>{usuario.email}</span>
            </div>
            <div className="info-item">
              <strong>Telefone:</strong> <span>{usuario.telefone}</span>
            </div>
            <button className="perfil-edit-button">Editar Informações</button>
          </section>

          <section className="perfil-info-section">
            <h3>Endereço Principal</h3>
            <div className="info-item">
              <span>{usuario.enderecoPrincipal}</span>
            </div>
            <button className="perfil-edit-button">Gerenciar Endereços</button>
          </section>

          {/* Você pode adicionar mais seções aqui, como "Últimos Pedidos" */}
          <section className="perfil-info-section">
            <h3>Últimos Pedidos</h3>
            <p className="no-data">Nenhum pedido recente.</p>
            <button className="perfil-edit-button">Ver Todos os Pedidos</button>
          </section>
        </main>
      </div>
    </div>
  );
}
