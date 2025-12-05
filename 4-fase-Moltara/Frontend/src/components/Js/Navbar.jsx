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
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const { cart } = useCart();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUser({ nome: storedName });
      setIsLoggedIn(true);
    }
  }, [setUser, setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/usuario/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("userName");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
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
            <Link to="/perfil" className="profile-link">
              <LuCircleUserRound size={25} color="#fff" />
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

        <Link to="/carrinho">
          <HiShoppingCart color="#fff" size={20} />
          {cart.length}
        </Link>
      </div>
    </nav>
  );
}
