import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../../components/Js/Navbar.jsx";
import Nav_carrinho from "../../components/Js/Nav_carrinho.jsx";
import "../Css/Carrinho.css";

const API_URL = "http://localhost:3000/api/cart";

export default function Carrinho({ produtoId }) {
  
  const [carrinho, setCarrinho] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const token = "60a123b4c5d6e7f8g9h0i1j2";
  const isAuthenticated = true;

  const buscarCart = async () => {
    if (!isAuthenticated || !token) {
      setLoading(false); 
      return; 
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {   
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();

      if (response.ok) {
  
        setCarrinho(data);
      } else {

        setError(data.error || "Erro desconhecido ao buscar o carrinho.");
        setCarrinho(null);
      }
    } catch (erro) {
      console.error("Erro na requisição GET:", erro);
      setError("Não foi possível conectar ao servidor.");
      setCarrinho(null);
    } finally {
      setLoading(false);
    }
  };

  const adicionarAoCarrinho = async () => {
    if (!isAuthenticated || !token || !produtoId) {
      alert("Erro: ID do produto ou autenticação ausente.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: produtoId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Produto adicionado com sucesso!");

        await buscarCart(); 
      } else {
        alert(`Erro ao adicionar: ${data.error}`);
      }
    } catch (error) {
      console.error("Erro na requisição POST:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    buscarCart();
  }, []); 

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="loading-message">Carregando carrinho...</p>
      </div>
    );
  }
  
  const itensDoCarrinho = carrinho?.items || [];
  
  if (!carrinho || itensDoCarrinho.length === 0) {
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
                    <p>Seu carrinho está vazio</p>
                    {error && <p className="error-message">Erro: {error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  {itensDoCarrinho.map((item, index) => (
                    <div className="produto" key={index}>
                      <img src="./img/cadeira.png" alt="" />
                      <button className="deletar-produto">Remover</button>
                      
                      <p>Nome: {item.produto?.nome || 'Produto Indefinido'}</p>{" "}
                      <p>Preço: R$ {item.produto?.price ? item.produto.price.toFixed(2) : '0.00'}</p>{" "}
                      <p>Quantidade: {item.quantidade}</p> <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="resumo-da-compra">
              <h2>Resumo da compra </h2>
              <p>Quantidade de produtos: {itensDoCarrinho.length} </p>
              <p>
                Valor total: R${" "}
                {carrinho.total ? carrinho.total.toFixed(2) : "0.00"}{" "}
              </p>
              <div className="botoes-resumo-compra">
                <button className="cupom">Adicionar cupom</button>
                <Link to={"/confirmacao"}>
                  <button className="comprar">Confirmar compra</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}