import React from 'react'
import './Navbar.css'

export default function Navbar() {
    return (
        <>
            <div className='container-navbar'>
                <div className='navbar'>
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Sobre</a></li>
                            <li><a href="#">Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
