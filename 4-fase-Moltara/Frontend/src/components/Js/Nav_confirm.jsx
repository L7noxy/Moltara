import React from 'react'
import '../Css/Nav_confirm.css'
import { IoCartOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { BsCreditCard } from "react-icons/bs";

export default function Nav_confirm() {
  return (
    <div className='container-nav-carrinho'>
      <div className='nav-carrinho'>
        <p className='meu-carrinho'><IoCartOutline color='BB252F' size={20} />Meu carrinho</p>
        <p><FaCheck color='BB252F' size={20} />Confirmação</p>
        <p><BsCreditCard color='BB252F' size={20} />Forma de pagamento</p>
      </div>
    </div>
  )
}
