import React from 'react'
import './Navbar.css'

export default function Navbar() {
    return (
        <>
            <div className='container-navbar'>
                <div className='navbar'>
                    <nav>
                        <ul>
                            <li><a to={"/login"}>Entre</a></li>
                            <p>ou</p>
                            <li><a>Cadastre-se</a></li>
                            <li><a>Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
