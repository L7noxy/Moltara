import React from 'react'
import '../../components/Css/Nav_pagamento.css'
import { IoCartOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { BsCreditCard } from "react-icons/bs";

export default function Nav_pagamento() {
  return (
    <div>
      <div className='nav-pagamento'>
        <p><IoCartOutline color='BB252F' size={20} />Meu carrinho</p>
        <p><FaCheck color='BB252F' size={20} />Confirmação</p>
        <p className='forma-pagamento'><BsCreditCard color='BB252F' size={25} />Forma de pagamento</p>
      </div>
    </div>
  )
}
