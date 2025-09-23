import React from 'react'
import '../Css/Perfil.css'
import Navbar from '../../components/Js/Navbar'
import Sidebar from '../../components/Js/Sidebar'
import { HiPencil } from "react-icons/hi2";

import { useState } from 'react'

export default function Perfil() {

  const [nome, setNome] = useState('Gabriel')
  const [email, setEmail] = useState('gabriel@gmail.com')

  return (
    <div>
      <div className="container-perfil">
        <div>
          <Navbar />
        </div>
        <div className='perfil'>
          <div className='perfil-user'>
            <img src="./img/foto-perfil.png" alt="" srcset="" />
            <div className='container-infos-perfil'>
              <div className='infos-perfil'>
                <ul>
                  <li>Bem Vindo: {nome}!</li>
                  <li>{email}</li>
                </ul>
              </div>
            </div>

            <div className='container-botoes-perfil'>
              <button className='editar-perfil' onClick={() => {}}><HiPencil />Editar Perfil</button>
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
