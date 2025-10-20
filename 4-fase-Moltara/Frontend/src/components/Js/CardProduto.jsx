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
            preco: 30.99
        },
        {
            id: 2,
            nome: "Mouse Corsair M65",
            preco: 30.99
        },
        {
            id: 3,
            nome: "Mouse Corsair M65",
            preco: 30.99
        },
        {
            id: 4,
            nome: "Mouse Corsair M65",
            preco: 30.99
        },
        {
            id: 5,
            nome: "Mouse Corsair M65",
            preco: 30.99
        },
    ]

    return (
        <div>
            <div>
                <div className='container-produtos-home'>
                    {produtos.map((produto) => (
                        <div key={produto.id} className="card">
                            {/* <button className='btn-curtir' onClick={() => setCurtir(!curtir)}>{curtir ? (
                                <FaHeart color='#BB252F' />
                            ) : (
                                <FaRegHeart />

                            )}</button> */}
                            <div className='imgBox'>
                                <img src="https://www.invidcomputers.com/images/0000000000412169000440548Corsair-Mouse-M65-RGB-Elite-White-5.png" />
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

            <div className="card">

                <div className="imgBox">
                    <img src="https://www.invidcomputers.com/images/0000000000412169000440548Corsair-Mouse-M65-RGB-Elite-White-5.png" alt="mouse corsair" className="mouse" />
                </div>

                <div className="contentBox">
                    <h3>Mouse Corsair M65</h3>
                    <h2 className="price">{produtos[0].preco} R$</h2>
                    <Link to={""} className="buy">Comprar</Link>
                </div>

            </div>
        </div>

    )
}
