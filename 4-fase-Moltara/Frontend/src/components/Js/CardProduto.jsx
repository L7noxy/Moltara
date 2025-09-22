import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";


import '../Css/CardProduto.css'

export default function CardProduto() {

    const [curtir, setCurtir] = useState({})


    const produtos = [
        {
            id: 1,
            descricao: 'Cadeira Gamer KBM! GAMING Tempest CG500 Preta e Roxa, Com Almofadas, Descanso Para Pernas Retrátil, Reclinável - KGCG500PTRX',
            preco: 19.99
        },
        {
            id: 2,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 3,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 4,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 5,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
    ]

    return (
        <div>
            <div className='container-produtos-home'>
                {produtos.map((produto) => (
                    <div key={produto.id} className="card-produto">
                        <button className='btn-curtir' onClick={() => setCurtir(!curtir)}>{curtir ? (
                            <FaHeart />
                        ) : (
                            <FaRegHeart />

                        )}</button>
                        <div className='image-produto'>
                            <img src="./img/cadeira.png" />
                        </div>
                        <p>{produto.descricao}</p>

                        <div className='preco-card'>
                            <p>{produto.preco}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
