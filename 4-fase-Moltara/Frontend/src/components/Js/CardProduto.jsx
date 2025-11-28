import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

import "../Css/CardProduto.css";

export default function CardProduto() {
  const [curtidos, setCurtidos] = useState({});
  const [produtos, setProdutos] = useState([]);

  // const handleAddToCart = async (produto) => {
  //   const { _id, nome } = produto;

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/carrinho/adicionar",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           produtoId: _id,
  //           quantidade: 1,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(
  //         data.message ||
  //           `Erro ${response.status}: Falha ao adicionar produto ao carrinho.`
  //       );
  //     }

  //     alert(`✅ "${nome}" adicionado ao carrinho!`);
  //   } catch (error) {
  //     console.error("Erro ao adicionar produto ao carrinho:", error);
  //     alert(`⚠️ Não foi possível adicionar ao carrinho: ${error.message}`);
  //   }
  // };

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/produto/buscar"
        );

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
          {produtos.map((produto) => {
            const estaCurtido = curtidos[produto._id];

            return (
              <div>
                <div>
                  <button
                    id={`btn-curtir-${produto._id}`}
                    className="btn-curtir"
                    onClick={() => handleCurtir(produto._id)}
                  >
                    {estaCurtido ? <FaHeart color="#A9A9A9" /> : <FaRegHeart />}
                  </button>
                </div>
                <div key={produto._id} className="card">
                  <div>
                    <Link to={`/produtoDetalhada/${produto._id}`}>
                      <div className="imgBox">
                        <img src={produto.imagemUrl} alt={produto.nome} />
                      </div>
                      <div className="contentBox">
                        <h3 className="card-nome-produto">{produto.nome}</h3>
                        <h2 className="price">{produto.preco} R$</h2>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
