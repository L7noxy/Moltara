import React from 'react'
import '../../pages/Css/Pagamento.css'
import Navbar from '../../components/Js/Navbar'
import Nav_pagamento from '../../components/Js/Nav_pagamento'
import { FaPix } from "react-icons/fa6";

export default function Pagamento() {
  return (
    <div>
      <Navbar />
      <div className="container-pagamento">
        <div className='container-pagamento-itens'>
          <Nav_pagamento />
          <div className="container-forma-pagamento">
            <h2>Metodo de pagamento</h2>
            <div className='forma-pagamento-itens'>
              <div className='pix'>
                <p>pix</p>
              </div>
              <div className="cartao">
                <p>cartão de crédito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
