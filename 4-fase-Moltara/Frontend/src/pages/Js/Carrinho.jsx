import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../../components/Js/Navbar.jsx";
import Nav_carrinho from "../../components/Js/Nav_carrinho.jsx";
import "../Css/Carrinho.css";

// URL base para facilitar futuras mudanças
const API_URL = "http://localhost:3000/api/cart";

// Note: Este componente DEVE ser renderizado em uma rota protegida 
// ou onde o productId (prop) seja fornecido
export default function Carrinho({ produtoId }) {
  
  // 1. Estado para o objeto de carrinho (Order) e para o loading
  // Inicializamos com null para melhor checagem de estado vazio/carregando
  const [carrinho, setCarrinho] = useState(null); 
  const [loading, setLoading] = useState(true); // Começa como true para a busca inicial
  const [error, setError] = useState(null);

  // 2. Simulação Temporária de Autenticação
  // Removido 'produtos' pois não é usado
  // O token deve vir de onde você o armazena (localStorage/Contexto real)
  const token = "SEU_TOKEN_OU_ID_FIXO_DE_TESTE"; 
  const isAuthenticated = true; // Simulação: Assume que o usuário está "logado"

  /* --------------------------------------
     FUNÇÕES DE AÇÃO (BUSCAR, ADICIONAR)
     -------------------------------------- */

  // Função centralizada para buscar o carrinho no Back-end
  const buscarCart = async () => {
    if (!isAuthenticated || !token) {
      // Se não estiver autenticado (mesmo na simulação), para a busca
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
        // O Back-end deve retornar o objeto { user, items, total, ... } ou null/{} se vazio
        setCarrinho(data);
      } else {
        // Trata erros específicos da API (ex: "Carrinho não encontrado")
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

  // Função para adicionar produto (Geralmente chamada de um componente filho/irmão)
  // Certifique-se de passar o productId para este componente onde o botão estiver
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
        // Após adicionar, atualiza o estado do carrinho
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
  
  /* --------------------------------------
     LIFECYCLE HOOKS
     -------------------------------------- */

  // Chama a busca inicial do carrinho
  useEffect(() => {
    buscarCart();
    // Vazio, pois a simulação de token não muda, mas chamar a busca faz sentido
  }, []); 

  /* --------------------------------------
     LÓGICA DE RENDERIZAÇÃO
     -------------------------------------- */

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="loading-message">Carregando carrinho...</p>
      </div>
    );
  }
  
  // Variável para facilitar a renderização, assumindo que o Back-end retorna { items: [...] }
  const itensDoCarrinho = carrinho?.items || [];
  
  // ⚠️ CORREÇÃO: Verifica se o array de itens está vazio ou se carrinho é nulo
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

  // Renderização do Carrinho Preenchido
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
                    // O item.produto está populado pelo Back-end
                    <div className="produto" key={index}>
                      <img src="./img/cadeira.png" alt="" />
                      {/* TODO: Criar função removerProduto e ligar ao botão */}
                      <button className="deletar-produto">Remover</button>
                      
                      {/* ⚠️ CORREÇÃO: Usar item.produto.propriedade */}
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
                {/* Usa o total calculado pelo Back-end */}
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