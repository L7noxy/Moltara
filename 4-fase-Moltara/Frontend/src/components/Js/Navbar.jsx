import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";

import '../Css/Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Departamentos");

    const handleCategorySelect = (categoria) => {
        setSelectedCategory(categoria);
        setIsOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className='left-section-navbar'>
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

                {/* Botões e links */}
                <div className="buttons">
                    <Link to="/perfil">
                        <LuCircleUserRound size={25} color="#fff" />
                    </Link>

                    <Link to="/login" className="login-btn">Entrar</Link>
                    <p>ou</p>
                    <Link to="/cadastro" className="signup-btn">Cadastrar-se</Link>

                    <Link to="/carrinho">
                      <HiShoppingCart color="#fff" size={20} />
                    </Link>
                </div>
            </nav>
        </>
    );
}
