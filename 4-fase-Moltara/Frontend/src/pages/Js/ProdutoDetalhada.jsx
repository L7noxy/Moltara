import Navbar from "../../components/Js/Navbar.jsx";
import Footer from "../../components/Js/Footer.jsx";
import "../Css/ProdutoDetalhada.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProdutoDetalhada() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantidade, SetQuantidade] = useState(1);

  const [personalizacaoSelecionada, setPersonalizacaoSelecionada] = useState({
    cor: null,
    tamanho: null,
    simbolo: null,
  });

  useEffect(() => {
    const buscarProduto = async () => {
      if (!id) {
        setError("ID do produto não fornecido.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/produto/buscar/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar produto: ${response.status}`);
        }

        const data = await response.json();
        setProduto(data);
      } catch (err) {
        setError("Erro ao buscar produto: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    buscarProduto();
  }, [id]);

  const handleAddToCart = async (produto) => {
    const { _id, nome } = produto;

    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/adicionar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produtoId: _id,
            quantidade: 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          `Erro ${response.status}: Falha ao adicionar produto ao carrinho.`
        );
      }

      alert(`✅ "${nome}" adicionado ao carrinho!`);
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      alert(`Não foi possível adicionar ao carrinho: ${error.message}`);
    }

  };

  if (loading) {
    return <div>Carregando detalhes do produto...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  const aumentar = () => SetQuantidade(quantidade + 1);
  const diminuir = () => {
    if (quantidade > 1) SetQuantidade(quantidade - 1);
  };

  // Estado para as opções de personalização selecionadas

  const icones = {
    Estrela: {
      contorno: "/img/estrela.png",
      preenchido: "/img/estrela_preenchida.png",
    },
    Casinha: {
      contorno: "/img/casinha.png",
      preenchido: "/img/casinha_preenchida.png",
    },
    Circulo: {
      contorno: "/img/circulo.png",
      preenchido: "/img/circulo_preenchido.png",
    },
  };

  // Função para lidar com a mudança de personalização
  const handlePersonalizacaoChange = (categoria, valor) => {
    setPersonalizacaoSelecionada((prev) => ({
      ...prev,
      [categoria]: valor,
    }));
  };

  return (
    <div className="container-produto">
      <Navbar />
      <div className="alinhamento-geral">
        <div className="container-imgs-principal">
          <div className="container-item">
            <img src={produto.imagemUrl} alt={produto.nome} />
          </div>

          <div className="alinhamento-imgs">
            <img src={produto.imagemUrl} alt={produto.nome} />
            <img src={produto.imagemUrl} alt={produto.nome} />
            <img src={produto.imagemUrl} alt={produto.nome} />
          </div>
        </div>

        <div className="container-info-item">
          <h3 className="titulo">Exemplo produto</h3>

          <div className="alinhamento-1">
            <h4 className="valor">
              Preço: {produto.preco.toFixed(2).replace(".", ",")}
            </h4>
            <p className="avaliacao">Avaliação do produto:</p>
            <p className="sub-titulo">Personalização do produto:</p>

            <div className="opcoes-personalizacao">
              <div className="grupo-personalizacao">
                <p className="text-personalizacao">
                  Cores (Selecionada:{" "}
                  {personalizacaoSelecionada.cor || "Nenhuma"})
                </p>
                <div className="checkbox-container">
                  <button
                    className={`cor-button cor-vermelho ${personalizacaoSelecionada.cor === "Vermelho"
                      ? "selected"
                      : ""
                      }`}
                    onClick={() =>
                      handlePersonalizacaoChange("cor", "Vermelho")
                    }
                    aria-label="Selecionar cor Vermelha"
                  />

                  <button
                    className={`cor-button cor-azul ${personalizacaoSelecionada.cor === "Azul" ? "selected" : ""
                      }`}
                    onClick={() => handlePersonalizacaoChange("cor", "Azul")}
                    aria-label="Selecionar cor Azul"
                  />

                  <button
                    className={`cor-button cor-amarelo ${personalizacaoSelecionada.cor === "Amarelo"
                      ? "selected"
                      : ""
                      }`}
                    onClick={() => handlePersonalizacaoChange("cor", "Amarelo")}
                    aria-label="Selecionar cor Amarela"
                  />

                  <button
                    className={`cor-button cor-verde ${personalizacaoSelecionada.cor === "Verde"
                      ? "selected"
                      : ""
                      }`}
                    onClick={() => handlePersonalizacaoChange("cor", "Verde")}
                    aria-label="Selecionar cor Verde"
                  />
                </div>
              </div>

              <div className="grupo-personalizacao">
                <p className="text-personalizacao">
                  Tamanhos (Selecionado:{" "}
                  {personalizacaoSelecionada.tamanho || "Nenhum"})
                </p>

                <div className="checkbox-container">
                  <div className="checkbox-container">
                    <button
                      className={`tamanho-button tamanho-pequeno ${personalizacaoSelecionada.tamanho === "Pequeno"
                        ? "selected"
                        : ""
                        }`}
                      onClick={() =>
                        handlePersonalizacaoChange("tamanho", "Pequeno")
                      }
                    >
                      P
                    </button>

                    <button
                      className={`tamanho-button tamanho-medio ${personalizacaoSelecionada.tamanho === "Médio"
                        ? "selected"
                        : ""
                        }`}
                      onClick={() =>
                        handlePersonalizacaoChange("tamanho", "Médio")
                      }
                    >
                      M
                    </button>

                    <button
                      className={`tamanho-button tamanho-grande ${personalizacaoSelecionada.tamanho === "Grande"
                        ? "selected"
                        : ""
                        }`}
                      onClick={() =>
                        handlePersonalizacaoChange("tamanho", "Grande")
                      }
                    >
                      G
                    </button>
                  </div>
                </div>

                <div className="grupo-personalizacao">
                  <p className="text-personalizacao">
                    Símbolos (Selecionado:{" "}
                    {personalizacaoSelecionada.simbolo || "Nenhum"})
                  </p>
                  <div className="checkbox-container">
                    <button
                      className={`simbolo-button ${personalizacaoSelecionada.simbolo === "Estrela"
                        ? "selected"
                        : ""
                        }`}
                      onClick={() =>
                        handlePersonalizacaoChange("simbolo", "Estrela")
                      }
                      aria-label="Selecionar símbolo Estrela"
                    >
                      <img
                        src={
                          personalizacaoSelecionada.simbolo === "Estrela"
                            ? icones.Estrela.preenchido
                            : icones.Estrela.contorno
                        }
                        alt="Estrela"
                      />
                    </button>

                    <button
                      className={`simbolo-button ${personalizacaoSelecionada.simbolo === "Casa"
                        ? "selected"
                        : ""
                        }`}
                      onClick={() =>
                        handlePersonalizacaoChange("simbolo", "Casa")
                      }
                      aria-label="Selecionar símbolo Casa"
                    >
                      <img
                        src={
                          personalizacaoSelecionada.simbolo === "Casa"
                            ? icones.Casinha.preenchido
                            : icones.Casinha.contorno
                        }
                        alt="Casa"
                      />
                    </button>

                    <button
                      className={`simbolo-button ${personalizacaoSelecionada.simbolo === "Circulo"
                        ? "selected"
                        : ""
                        }`}
                      onClick={() =>
                        handlePersonalizacaoChange("simbolo", "Circulo")
                      }
                      aria-label="Selecionar símbolo Círculo"
                    >
                      <img
                        src={
                          personalizacaoSelecionada.simbolo === "Circulo"
                            ? icones.Circulo.preenchido
                            : icones.Circulo.contorno
                        }
                        alt="Círculo"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-valor">
          <h3 className="titulo-valor">
            Preço total: {produto.preco * quantidade}
          </h3>
          <div className="alinhamento-quantidade-produto">
            <label>Quantidade do produto:</label>

            <div className="grupo-botoes-input">
              <button className="diminuir" onClick={diminuir}>
                -
              </button>
              <input type="number" value={quantidade} readOnly></input>
              <button className="aumentar" onClick={aumentar}>
                +
              </button>
            </div>
          </div>

          <div className="botoes-compra">
            <button className="button-adicionar" onClick={handleAddToCart}>
              Adicionar ao Carrinnho
            </button>
            <button className="button-confirmar">Confirmar Compra</button>
          </div>
        </div>
      </div>

      <div className="container-descricao-total">
        <div className="secao-detalhe">
          <h3>Características do produto:</h3>
          <p>Características do produto exemplo...</p>
        </div>

        <hr className="divisor" />

        <div className="secao-detalhe">
          <h3>Detalhes do produto:</h3>
          <p>Detalhes do produto com imagens e etc...</p>
        </div>

        <hr className="divisor" />

        <div className="secao-detalhe">
          <h3>Descrição do produto:</h3>
          <p>{produto.descricao}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
