import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5"; //icone de pesquisa
import { LuCircleUserRound } from "react-icons/lu"; //icone do usuario
import './Navbar.css'

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="logo">Logo</div>

                <div className="search-bar">
                    <input type="text" placeholder="Pesquisar..." />
                    <button type="submit"><IoSearchOutline size={20}/></button>
                </div>

                <div className="buttons">
                    <LuCircleUserRound size={20}/>
                    <Link to="/login" className="login-btn">Entrar</Link>
                    <p>ou</p>
                    <Link className="signup-btn">Cadastrar-se</Link>
                </div>
            </nav>
        </>
    )
}
