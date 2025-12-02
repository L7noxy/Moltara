import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";

import "../Css/Navbar.css";
import { useGlobalContext } from "../../context/GlobalContext";






export default function Navbar() {

  const navigate = useNavigate();
const { user, setUser, setIsLoggedIn, isLoggedIn } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setIsLoggedIn(false);

      navigate("/");

    } catch (error) {
      console.error("Erro ao fazer logout:", error);

    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log(`Pesquisando por: ${searchTerm}`);
      navigate(`/pesquisa?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };


  // const handleLogout = async () => {
  //   await fetch("http://localhost:3000/api/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   });
  // };
  
  return (
    <>
      <nav className="navbar">
        <div className="left-section-navbar">
          <button onClick={() => navigate(-1)} className="back-btn">
            <IoIosArrowRoundBack size={40} color="#fff" />
          </button>

          <div className="logo">Logo</div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
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
          </Link>
          {/* Provisoriooo */}
          {/*<Link to="/painelDeControle">Adm</Link>*/}
        </div>
      </nav>
    </>
  );
}
