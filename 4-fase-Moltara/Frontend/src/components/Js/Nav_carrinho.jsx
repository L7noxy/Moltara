import React from 'react'
import '../Css/Nav_carrinho.css'
import { IoCartOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { BsCreditCard } from "react-icons/bs";

export default function Nav_carrinho() {
    return (
        <div className='container-nav-carrinho'>
            <div className='nav-carrinho'>
                <p><IoCartOutline color='BB252F' size={20} />Meu carrinho</p>
                <p><FaCheck color='BB252F' size={20} />Confirmação</p>
                <p><BsCreditCard color='BB252F' size={20} />Forma de pagamento</p>
            </div>
        </div>

    )
}
