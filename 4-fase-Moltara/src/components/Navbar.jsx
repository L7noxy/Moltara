import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <>
            <div className='container-navbar'>
                <nav className="navbar">
                    <div className="buttons-container">
                        <Link to={"/cadastro"}>cadastro</Link>
                        <Link to={"/login"}>Login</Link>
                    </div>
                </nav>
            </div>
        </>
    )
}
