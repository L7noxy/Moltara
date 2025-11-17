import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

import "../Css/CardProduto.css";

export default function CardProduto() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3000/api/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preco,
          nome,
          descricao,
        }),
      });
    } catch (error) {
      console.error("Erro ao criar nova compra:", error);
    }
  };

  const handleCurtir = (idProduto) => {
      setCurtidos((prevCurtidos) => ({
      ...prevCurtidos,
      [idProduto]: !prevCurtidos[idProduto],
    }));
  };

  const [curtidos, setCurtidos] = useState({});

  const produtos = [
    {
      id: 1,
      nome: "Mouse Corsair ç65",
      preco: 30.99,
      img: "https://www.invidcomputers.com/images/0000000000412169000440548Corsair-Mouse-M65-RGB-Elite-White-5.png",
    },
    {
      id: 2,
      nome: "Mouse Corsair M61235",
      preco: 30.99,
      img: "./img/crosair_azul.webp",
    },
    {
      id: 3,
      nome: "Mouse Corsair M265",
      preco: 30.99,
      img: "./img/logitech_vermelho.png",
    },
    {
      id: 4,
      nome: "Mouse Corsair Me65",
      preco: 30.99,
      img: "./img/crosair_azul.webp",
    },
    {
      id: 5,
      nome: "Mouse Corsair pp65",
      preco: 30.99,
      img: "./img/logitech_vermelho.png",
    },
  ];

  return (
<div>
            <div>
                <div className='container-produtos-home'>
                    {produtos.map((produto) => {
                        // 💡 Verifica se o produto está curtido no nosso objeto de estado
                        const estaCurtido = curtidos[produto.id];

                        return (
                            <div key={produto.id} className="card">

                                {/* Botão CURTIR com ID ÚNICO */}
                                <button
                                    // Chave (key) não é necessária em elementos diretos no map, exceto o elemento root
                                    id={`btn-curtir-${produto.id}`} // <--- ID ÚNICO
                                    className='btn-curtir'
                                    onClick={() => handleCurtir(produto.id)}
                                >
                                    {estaCurtido ? (
                                        <FaHeart color='#A9A9A9' />
                                    ) : (
                                        <FaRegHeart />
                                    )}
                                </button>
                                
                                <div className='imgBox'>
                                    <img src={produto.img} alt={produto.nome} />
                                </div>
                                <div className='contentBox'>
                                    <h3>{produto.nome}</h3>
                                    <h2 className="price">{produto.preco} R$</h2>
                                    
                                    <button 
                                        id={`btn-comprar-${produto.id}`}
                                        className="buy"
                                        onClick={() => handleSubmit(produto)}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
  );
}
