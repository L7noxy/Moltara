import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";


import '../Css/Navbar.css'

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar">
                <div><button onClick={() => navigate(-1)}><IoIosArrowRoundBack size={40} color='#ffffffff'/></button></div>
                <div className="logo">Logo</div>

                <div className="search-bar">
                    <input type="text" placeholder="Pesquisar..." />
                    <button type="submit"><IoSearchOutline size={20} color='#ffffffff' /></button>
                </div>

                <div className="buttons">
                    <Link to={"/perfil"}>
                        <LuCircleUserRound size={25} color='#ffffffff' />
                    </Link>

                    <Link to={"/login"} className="login-btn">Entrar</Link>
                    <p>ou</p>
                    <Link to={"/cadastro"} className="signup-btn">Cadastrar-se</Link>

                    <Link to={"/carrinho"}>
                        <HiShoppingCart color='#ffffffff' size={20} />
                    </Link>

                    <Link to={"/produtoDetalhada"}>
                        <p>Página produto</p>
                    </Link>

                </div>
            </nav>
        </>
    )
}