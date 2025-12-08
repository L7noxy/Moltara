import "../Css/EstoqueProduto.css";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";


export default function EstoqueProduto() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qtyToAdd, setQtyToAdd] = useState(1);

  const handleConfirmIncrease = (produto) => {
    setQtyToAdd(1); // Resetar a quantidade para 1 ao abrir
    setModal({
      isVisible: true,
      type: 'increase', // Novo tipo de modal
      produtoToUpdate: produto, // Usar 'produtoToUpdate' para ser mais claro
      message: `Adicionar estoque ao produto "${produto.nome}"`,
    });
  };

  const handleIncreaseStock = async () => {
    const { produtoToUpdate } = modal;
    if (!produtoToUpdate || qtyToAdd <= 0) return;
    const produtoId = produtoToUpdate._id;

    // 1. Mudar para estado de Loading
    setModal(prev => ({
      ...prev,
      type: 'loading',
      message: `Atualizando estoque de ${produtoToUpdate.nome}...`,
    }));

    const minDurationPromise = new Promise(resolve => setTimeout(resolve, 1500));

    const updateOperationPromise = fetch(
      `http://localhost:3000/api/produto/adicionarEstoque/${produtoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantidade: qtyToAdd }), // Envia a quantidade a ser adicionada
      }
    ).then(async response => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Falha ao adicionar estoque. Código: ${response.status}`);
      }
      return response.json(); // Espera-se que o backend retorne o produto atualizado
    });

    try {
      const [_, updatedProduto] = await Promise.all([minDurationPromise, updateOperationPromise]);

      // 3. Sucesso: Atualiza o estado local 'produtos'
      setProdutos(prevProdutos =>
        prevProdutos.map(p =>
          p._id === updatedProduto._id ? updatedProduto : p
        )
      );

      setModal({
        isVisible: true,
        type: 'success',
        produtoToUpdate: null,
        message: `✅ ${qtyToAdd} unidades adicionadas! Novo estoque: ${updatedProduto.estoque}`,
      });

      setTimeout(() => {
        setModal(prev => ({ ...prev, isVisible: false }));
      }, 2000);

    } catch (erro) {
      // 4. Erro: Mudar para o estado de Erro
      console.error("Ocorreu um erro na atualização:", erro);
    }
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [modal, setModal] = useState({
    isVisible: false,
    type: 'confirm',
    produtoToDelete: null,
    message: ''
  });

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

  const handleConfirmDelete = (produto) => {
    setModal({
      isVisible: true,
      type: 'confirm',
      produtoToDelete: produto,
      message: `Tem certeza que deseja excluir o produto "${produto.nome}"? Esta ação é irreversível.`,
    });
  };

  const handleCloseModal = () => {
    setModal({
      isVisible: false,
      type: 'confirm',
      produtoToDelete: null,
      message: ''
    });
  };

  const handleDelete = async () => {
    const { produtoToDelete } = modal;
    if (!produtoToDelete) return;
    const produtoId = produtoToDelete._id;

    setModal({
      isVisible: true,
      type: 'loading',
      produtoToDelete: produtoToDelete,
      message: 'Excluindo produto...  ',
    });

    const minDurationPromise = new Promise(resolve => setTimeout(resolve, 3000));

    const deleteOperationPromise = fetch(
      `http://localhost:3000/api/produto/deletar/${produtoId}`,
      { method: "DELETE" }
    ).then(response => {
      if (!response.ok) {
        throw new Error(`Falha ao excluir o produto. Código: ${response.status}`);
      }
      return true;
    });

    try {
      await Promise.all([minDurationPromise, deleteOperationPromise]);

      setProdutos((prevProdutos) =>
        prevProdutos.filter((p) => p._id !== produtoId)
      );

      setModal({
        isVisible: true,
        type: 'success',
        produtoToDelete: null,
        message: '✅ Produto excluído com sucesso!',
      });

      setTimeout(() => {
        setModal(prev => ({ ...prev, isVisible: false }));
      }, 1500);

    } catch (erro) {
      // 5. Erro: Mudar para o estado de Erro
      console.error("Ocorreu um erro na exclusão:", erro);
      setModal({
        isVisible: true,
        type: 'error',
        produtoToDelete: produtoToDelete,
        message: `❌ Falha ao excluir produto: ${erro.message || 'Erro desconhecido.'}`,
      });
    }
  };

  // ... (Seu JSX de carregamento e erro permanece o mesmo) ...
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
      {/* ... (Seu JSX da navbar e título permanece o mesmo) ... */}
      <div className="left-section-navbar">
        {/* Usando window.history.back() pois 'navigate' não está definido */}
        <button onClick={() => window.history.back()} className="back-btn">
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
          {/* ... (Seu thead permanece o mesmo) ... */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Preço</th>
              <th>Quantidade em Estoque</th>
              <th>Status</th>
              <th>Ações</th> {/* Certifique-se de que a coluna "Ações" existe */}
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
                      // IMPORTANTE: Chamando a nova função para abrir o modal de confirmação
                      onClick={() => handleConfirmDelete(produto)}
                      title={`Excluir ${produto.nome}`}
                      disabled={modal.isVisible} // Desabilita botões enquanto o modal estiver aberto
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

      {/* NOVO: JSX do Pop-up Customizado */}
      {modal.isVisible && (
        <div className="custom-modal-overlay">
          <div className={`custom-modal-content ${modal.type}`}>
            <div className="modal-body">
              {modal.type === 'loading' && (
                <div className="loading-spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              )}

              <p>{modal.message}</p>
            </div>

            {/* Ações só são visíveis para confirmação e erro */}
            {(modal.type === 'confirm' || modal.type === 'error') && (
              <div className="modal-actions">
                <button
                  onClick={handleCloseModal}
                  className="modal-btn cancel-btn"
                >
                  {modal.type === 'confirm' ? 'Cancelar' : 'Fechar'}
                </button>
                {modal.type === 'confirm' && (
                  <button
                    onClick={handleDelete}
                    className="modal-btn confirm-btn"
                  >
                    Excluir
                  </button>
                )}
              </div>
            )}

            {/* O modal de sucesso e carregamento fecham sozinhos ou não precisam de botões */}
          </div>
        </div>
      )}
    </div>
  );
}