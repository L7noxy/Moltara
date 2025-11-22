import "../Css/EstoqueProduto.css";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function EstoqueProduto() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(null);
      } catch (erro) {
        console.error("Ocorreu um erro:", erro);
        setError("Não foi possível carregar os dados do estoque.");
      } finally {
        setIsLoading(false);
      }
    };

    buscarProdutos();
  }, []);

  const handleDelete = async (produtoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/produto/deletar/${produtoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Falha ao excluir o produto.`);
      }
      setProdutos((prevProdutos) =>
        prevProdutos.filter((p) => p._id !== produtoId)
      );

      alert("Produto excluído com sucesso!");
    } catch (erro) {
      console.error("Ocorreu um erro na exclusão:", erro.message);
      alert(`Falha ao excluir produto: ${erro.message}`);
    }
  };

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
        <p className="error-message">
          ⚠️ {error} Por favor, verifique o servidor.
        </p>
      </div>
    );
  }

  return (
    <div className="estoque-container">
      <div className="left-section-navbar">
        <button onClick={() => navigate(-1)} className="back-btn">
          <IoIosArrowRoundBack size={40} color="#000000ff" />
        </button>
      </div>
      <h2>Gerenciamento de Estoque</h2>

      {produtos.length === 0 ? (
        <p className="no-products-message">
          Nenhum produto encontrado no estoque.
        </p>
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
              const estoqueBaixo = produto.estoque <= 10;

              return (
                <tr
                  key={produto._id}
                  className={estoqueBaixo ? "estoque-baixo-alerta" : ""}
                >
                  <td className="id-col">{produto._id}</td>
                  <td>{produto.nome}</td>

                  <td className="price-col">
                    R${" "}
                    {produto.preco
                      ? produto.preco.toFixed(2).replace(".", ",")
                      : "N/A"}
                  </td>

                  <td className="qty-col">{produto.estoque || 0}</td>

                  <td className="status-col">
                    {estoqueBaixo ? (
                      <span className="alerta-tag">⚠️ Baixo</span>
                    ) : (
                      <span className="ok-tag">✅ Ok</span>
                    )}
                  </td>

                  <td className="actions-col">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(produto._id)}
                      title={`Excluir ${produto.nome}`}
                    >
                      Excluir
                    </button>
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
