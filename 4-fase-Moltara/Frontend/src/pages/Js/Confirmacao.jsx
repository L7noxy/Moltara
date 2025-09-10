import React from "react";
import "../Css/Confirmacao.css";
import Navbar from "../../components/Js/Navbar";
import Nav_confirm from "../../components/Js/Nav_confirm";
import { Link } from "react-router";

export default function Confirmacao() {
  const produtos_carrinho = [
    {
      id: 1,
      nome: "Gabinete Gamer Mid Tower",
      preco: 158.89,
      descricao: "Descrição do produto",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="container-carrinho">
        <div className="itens-carrinho">
          <div className="itens-da-compra">
            <Nav_confirm />

            <div>
              <div className="dados-pessoais">
                <p>Nome: </p>
                <p>Endereço: </p>
                <p>Telefone: </p>
                <p>Email: </p>
              </div>
              <div className="container-produtos">
                <div className="lista-produtos">
                  <div className="produtos-carrinho">
                    {produtos_carrinho.map((produtos) => (
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
            </div>

            <div className="resumo-da-compra">
              <div className="infos-resumo-compra">
                <h2>Resumo da compra </h2>
                <p>Quantidade de produtos: 4 </p>
                <p>Valor do subtotal: $723,24 </p>
                <p>valor total: $723,24 </p>
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
