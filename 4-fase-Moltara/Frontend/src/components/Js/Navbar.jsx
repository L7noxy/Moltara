import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";

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
                <div>
                    <button onClick={() => navigate(-1)} className="back-btn">
                        <IoIosArrowRoundBack size={40} color="#fff" />
                    </button>
                </div>

                <div className="logo">Logo</div>

                <div className="category-wrapper">
                    <div className="category-filter" onClick={() => setIsOpen(!isOpen)}>
                        <span>{selectedCategory}</span>
                        <FaChevronDown className={`arrow ${isOpen ? "open" : ""}`} size={12} />
                    </div>

                    {isOpen && (
                        <div className="dropdown">
                            <p onClick={() => handleCategorySelect("Marca")}>Marca</p>
                            <p onClick={() => handleCategorySelect("Tamanho")}>Tamanho</p>
                            <p onClick={() => handleCategorySelect("Preço")}>Preço</p>
                        </div>
                    )}
                </div>

                {/* Barra de pesquisa */}
                <div className="search-bar">
                    <input type="text" placeholder="Pesquisar..." />
                    <button type="submit">
                        <IoSearchOutline size={20} color="#fff" />
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

                    <Link to="/produtoDetalhada">
                        <p>Página produto</p>
                    </Link>
                </div>
            </nav>
        </>
    );
}
