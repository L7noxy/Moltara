import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import "../Css/Carrinho.css";
import Navbar from "../../components/Js/Navbar";
import Nav_carrinho from "../../components/Js/Nav_carrinho";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const buscarCart = async () => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/cart");
        } catch (erro) {
          console.error("Ocorreu um erro:", erro);
        }

        const data = await response.json();
        setCarrinho(data);
      };
      fetchData();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-carrinho">
        <div className="itens-carrinho">
          <div className="itens-da-compra">
            <Nav_carrinho />
            <div className="container-produtos">
              <div className="lista-produtos">
                <div className="produtos-carrinho">
                  {carrinho.map((produtos) => (
                    <div className="produto">
                      <img src="./img/cadeira.png" alt="" />
                      <button className="deletar-produto">Remover</button>
                      <p>{produtos.nome}</p>
                      <p>{produtos.preco}</p>

                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="resumo-da-compra">
              <div className="infos-resumo-compra">
                <h2>Resumo da compra </h2>
                <p>Quantidade de produtos: {carrinho.length} </p>
                <p>Valor do subtotal: {carrinho.length} </p>
                <p>valor total: {carrinho.length} </p>
                <p></p>
              </div>
              <div className="botoes-resumo-compra">
                <button className="cupom">Adicionar cupom</button>
                <Link to={"/confirmacao"}>
                  <button className="comprar"> Confirmar compra</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
