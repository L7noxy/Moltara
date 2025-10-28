import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';


import '../Css/CardProduto.css'

export default function CardProduto() {

    const [curtir, setCurtir] = useState({})

    const produtos = [
        {
            id: 1,
            nome: "Mouse Corsair M65",
            preco: 30.99,
            img: "https://www.invidcomputers.com/images/0000000000412169000440548Corsair-Mouse-M65-RGB-Elite-White-5.png"
        },
        {
            id: 2,
            nome: "Mouse Corsair M65",
            preco: 30.99,
            img: "./img/crosair_azul.webp"
        },
        {
            id: 3,
            nome: "Mouse Corsair M65",
            preco: 30.99,
            img: "./img/logitech_vermelho.png"
        },
        {
            id: 4,
            nome: "Mouse Corsair M65",
            preco: 30.99,
            img: "./img/crosair_azul.webp"
        },
        {
            id: 5,
            nome: "Mouse Corsair M65",
            preco: 30.99,
            img: "./img/logitech_vermelho.png"
        },
    ]

    return (
        <div>
            <div>
                <div className='container-produtos-home'>
                    {produtos.map((produto) => (
                        <div key={produto.id} className="card">
                            <button key={produto.id} className='btn-curtir' onClick={() => setCurtir(!curtir)}>{curtir ? (
                                <FaHeart color='#BB252F' />
                            ) : (
                                <FaRegHeart />

                            )}</button>
                            <div className='imgBox'>
                                <img src={produto.img} alt={produto.nome} />
                            </div>
                            <div className='contentBox'>
                                <h3>{produto.nome}</h3>
                                <h2 className="price">{produto.preco} R$</h2>
                                <Link to={""} className="buy">Comprar</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
