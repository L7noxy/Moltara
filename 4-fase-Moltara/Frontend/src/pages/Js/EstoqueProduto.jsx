import "../Css/EstoqueProduto.css";
import { useEffect, useState } from "react";

export default function EstoqueProduto() {
  // Adicionando estados para loading e erro
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/produto/buscar");

        if (!response.ok) {
          throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        const dados = await response.json();
        setProdutos(dados);
        setError(null); // Limpa qualquer erro anterior
      } catch (erro) {
        console.error("Ocorreu um erro:", erro);
        setError("Não foi possível carregar os dados do estoque.");
      } finally {
        setIsLoading(false); // Garante que o estado de loading seja desativado
      }
    };

    buscarProdutos();
  }, []);

  // 1. Indicadores de Estado (Melhor UX)
  if (isLoading) {
    return (
      <div className="estoque-container">
        <p className="loading-message">Carregando dados do estoque...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estoque-container">
        <h2 className="error-title">Erro de Conexão</h2>
        <p className="error-message">⚠️ {error} Por favor, verifique o servidor.</p>
      </div>
    );
  }

  return (
    <div className="estoque-container">
      <h2>Gerenciamento de Estoque</h2>

      {produtos.length === 0 ? (
        <p className="no-products-message">Nenhum produto encontrado no estoque.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Preço</th>
              <th>Quantidade em Estoque</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => {

              const estoqueBaixo = produto.quantidade <= 10;
              
              return (
                <tr key={produto._id} className={estoqueBaixo ? 'estoque-baixo-alerta' : ''}>
                  
                  <td className="id-col">{produto._id || produto.id}</td> 
                  <td>{produto.nome}</td>
                  
                  <td className="price-col">R$ {produto.preco ? produto.preco.toFixed(2).replace(".", ",") : 'N/A'}</td>
                  
                  <td className="qty-col">{produto.quantidade || 0}</td> 
                  
                  <td className="status-col">
                    {estoqueBaixo ? 
                      <span className="alerta-tag">⚠️ Baixo</span> :
                      <span className="ok-tag">✅ Ok</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}