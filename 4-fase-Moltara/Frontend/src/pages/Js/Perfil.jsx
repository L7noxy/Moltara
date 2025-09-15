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
            <div className='perfil'>
              <div className='perfil-user'>
                <img src="./img/foto-perfil.png" alt="" srcset="" />
              </div>
              <div className='container-infos-perfil'>
                <div className='infos-perfil'>
                  <ul>
                    <li>Nome:</li>
                    <p>Endereço:</p>
                    <p>Telefone:</p>
                    <p>Email:</p>
                  </ul>
                </div>
              </div>
            </div>
            <div>
                <Sidebar />
            </div>
        </div>
    </div>
  )
}
