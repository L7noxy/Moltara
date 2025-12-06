import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useGlobalContext } from "../../context/GlobalContext";
import { useCart } from "../../context/CartContext";
import "../Css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn, logout } = useGlobalContext();
  const { cart, totalItems } = useCart();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="left-section-navbar">
        <button onClick={() => navigate(-1)} className="back-btn">
          <IoIosArrowRoundBack size={40} color="#fff" />
        </button>
        <div className="logo">Logo</div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Pesquisar..." />
        <button type="submit">
          <IoSearchOutline size={20} color="#5F6368" />
        </button>
      </div>

      <div className="buttons">
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <Link to={'/painelDeControle'} className="admin-link">
                Admin
              </Link>
            )}
            <Link to="/perfil" className="profile-link">
              <span className="user-name">{user?.nome || "Meu Perfil"}</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Entrar
            </Link>
            <p>ou</p>
            <Link to="/cadastro" className="signup-btn">
              Cadastrar-se
            </Link>
          </>
        )}
        <div className="cart-icon-container">
          <Link to="/carrinho">
            <HiShoppingCart color="#fff" size={20} />
            <div className="cart-count">
              {totalItems}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
