import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

import "../Css/CardProduto.css";

export default function CardProduto() {
  const [curtidos, setCurtidos] = useState({});
  const [produtos, setProdutos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3000/api/produto/buscar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price,
          nome,
          productId,
        }),
      });
    } catch (error) {
      console.error("Erro ao criar nova compra:", error);
    }
  };



  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/produto/buscar");

        if (!response.ok) {
          throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        const dados = await response.json();
        setProdutos(dados);
      } catch (erro) {
        console.error("Ocorreu um erro:", erro);
      }
    };

    buscarProdutos();
  }, []);

  const handleCurtir = (idProduto) => {
    setCurtidos((prevCurtidos) => ({
      ...prevCurtidos,
      [idProduto]: !prevCurtidos[idProduto],
    }));
  };

  return (
    <div>
      <div>
        <div className="container-produtos-home">
          {produtos.map(produto => {
            const estaCurtido = curtidos[produto._id];

            return (
              <div key={produto._id} className="card">
                <button
                id={`btn-curtir-${produto._id}`}
                  className="btn-curtir"
                  onClick={() => handleCurtir(produto._id)}
                >
                  {estaCurtido ? <FaHeart color="#A9A9A9" /> : <FaRegHeart />}
                </button>

                <div className="imgBox">
                  <img src={produto.imagemUrl} alt={produto.nome} />
                </div>
                <div className="contentBox">
                  <h3 className="card-nome-produto">{produto.nome}</h3>
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
