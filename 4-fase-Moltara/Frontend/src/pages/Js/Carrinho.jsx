import React from 'react'
import "../Css/Carrinho.css"
import Navbar from '../../components/Js/Navbar'

export default function Carrinho() {

  const produtos_carrinho = [
    {
      id: 1,
      nome: "Gabinete Gamer Mid Tower",
      preco: 158.89,
      descricao: "Descrição do produto",
    },
    {
      id: 2,
      nome: "teclado Mecanico Gamer",
      preco: 405.69,
      descricao: "Descrição do produto",
    },
    {
      id: 3,
      nome: "Mouse Gamer",
      preco: 155.66,
      descricao: "Descrição do produto",
    },
    {
      id: 4,
      nome: "Mouse Gamer",
      preco: 155.66,
      descricao: "Descrição do produto",
    },
    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 155.66,
      descricao: "Descrição do produto",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className='container-carrinho'>
        <div className='itens-carrinho'>
          <div className='nav-carrinho'>

          </div>
          <div className='itens-da-compra'>

            <div className='produtos'>
              <div className='lista-produtos'>
                {produtos_carrinho.map((produtos) => (
                  <div className='produto'>
                    <img src="./img/cadeira.png" alt="" />
                    <p>{produtos.nome}</p>
                    <p>{produtos.preco}</p>
                    <hr />
                  </div>
                ))}
              </div>
            </div>

            <div className='resumo-da-compra'>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
