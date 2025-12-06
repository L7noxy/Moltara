import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Js/Navbar.jsx";
import Footer from "../../components/Js/Footer.jsx";
import { useGlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import {
  FaUserCircle,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import "../Css/Perfil.css";

export default function Perfil() {
  const navigate = useNavigate();
  const { user, setUser, logout, loadingUser } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      setMessage("");
      setError("");
      const response = await axios.put(
        "http://localhost:3000/api/usuario/atualizar",
        formData,
        { withCredentials: true }
      );

      setUser(response.data);
      setIsEditing(false);
      setMessage("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar perfil.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja apagar sua conta? Esta ação é irreversível.")) {
      try {
        await axios.delete("http://localhost:3000/api/usuario/deletar", { withCredentials: true });
        logout();
        navigate("/");
      } catch (err) {
        console.error(err);
        setError("Erro ao deletar conta.");
      }
    }
  };

  if (loadingUser) {
    return (
      <div className="perfil-container">
        <Navbar />
        <div className="perfil-loading">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="perfil-container">
        <Navbar />
        <div className="perfil-content-wrapper" style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <h2>Você não está logado.</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="perfil-container">
      <Navbar />
      <div className="perfil-content-wrapper">
        <aside className="perfil-sidebar">
          <div className="perfil-avatar-section">
            <FaUserCircle size={80} color="#ccc" />
            <h2 className="perfil-nome">{user.nome}</h2>
          </div>

          <nav className="perfil-navigation">
            <ul className="perfil-nav-list">
              <li>
                <FaShoppingBag /> <span>Meus Pedidos</span>
              </li>
              <li>
                <FaMapMarkerAlt /> <span>Endereços</span>
              </li>
              <li onClick={logout} className="perfil-nav-item logout" style={{ cursor: 'pointer' }}>
                <FaSignOutAlt /> <span>Sair</span>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="perfil-main-content">
          <h1 className="perfil-main-title">Meu Perfil</h1>

          {message && <p className="status-success" style={{ color: 'green', marginBottom: '10px' }}>{message}</p>}
          {error && <p className="status-error" style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <section className="perfil-info-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Informações Pessoais</h3>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="perfil-edit-button" style={{ width: 'auto', padding: '5px 15px' }}>
                  <FaEdit /> Editar
                </button>
              )}
            </div>

            <div className="info-item">
              <strong>Nome:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="perfil-input"
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              ) : (
                <span>{user.nome}</span>
              )}
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="perfil-input"
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
            <div className="info-item">
              <strong>CPF:</strong> <span>{user.cpf}</span>
            </div>

            {isEditing && (
              <div style={{ marginTop: '20px' }}>
                <button onClick={handleUpdate} className="perfil-edit-button" style={{ marginRight: '10px' }}>Salvar</button>
                <button onClick={() => setIsEditing(false)} className="perfil-edit-button" style={{ backgroundColor: '#ccc' }}>Cancelar</button>
              </div>
            )}
          </section>

          <section className="perfil-info-section" style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h3>Zona de Perigo</h3>
            <button onClick={handleDelete} className="perfil-edit-button" style={{ backgroundColor: '#ff4444', color: 'white' }}>
              <FaTrash /> Deletar Conta
            </button>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
