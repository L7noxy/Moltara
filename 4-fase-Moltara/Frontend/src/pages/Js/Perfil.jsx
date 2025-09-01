import React from 'react'
import '../Css/Perfil.css'
import Navbar from '../../components/Js/Navbar'
import Sidebar from '../../components/Js/Sidebar'

export default function Perfil() {
  return (
    <div>
        <div className="container-perfil">
            <div>
                <Navbar />
            </div>
            <div>
                <Sidebar />
            </div>
        </div>
    </div>
  )
}
