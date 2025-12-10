import Navbar from "../../components/Js/Navbar.jsx";
import Footer from "../../components/Js/Footer.jsx";
import "../Css/ProdutoDetalhada.css";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";

export default function ProdutoDetalhada() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidade, SetQuantidade] = useState(1);
  const [confirmarPersonalizacao, setConfirmarPersonalizacao] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const [personalizacaoSelecionada, setPersonalizacaoSelecionada] = useState({
    cor: null,
    tamanho: null,
    simbolo: null,
  });

  const [simbolo, setSimbolo] = useState(null);

  // Comments State
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");

  const buscarComentarios = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/comentarios/${id}`);
      if (response.ok) {
        const data = await response.json();
        setComentarios(data);
      }
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  useEffect(() => {
    if (id) {
      buscarComentarios();
    }
  }, [id]);

  const handleEnviarComentario = async (e) => {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/api/comentarios/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          produtoId: id,
          texto: novoComentario,
        }),
      });

      if (response.ok) {
        setNovoComentario("");
        buscarComentarios();
      } else {
        const err = await response.json();
        alert(err.message || "Erro ao enviar comentário (Talvez precise logar)");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };


  useEffect(() => {
    const buscarProduto = async () => {
      if (!id) {
        setError("ID do produto não fornecido.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/produto/buscar/${id}`);
        if (!response.ok) throw new Error(`Erro ao buscar produto: ${response.status}`);
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


  const handleAddToCart = async () => {
    if (!produto) return;

    setShowAlert(false);

    if (!personalizacaoSelecionada.cor || !personalizacaoSelecionada.tamanho || !personalizacaoSelecionada.simbolo) {
      setAlertMessage('Por favor, selecione a Cor, o Tamanho e o Símbolo para personalizar seu produto.');
      setAlertType('danger');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return; 
    }

    // Opcional: Esconder qualquer alerta anterior
    setShowAlert(false);


    const success = await addToCart(
      produto._id, 
      quantidade, 
      personalizacaoSelecionada 
    );

    if (success) {
      setAlertMessage(`O produto ${produto.nome} foi adicionado ao carrinho!`);
      setAlertType('success');
    } else {
      setAlertMessage('Erro ao adicionar ao carrinho!');
      setAlertType('danger');
    }

    // 2. Mostrar o alerta após a lógica ser concluída
    setShowAlert(true);

    // Opcional: Esconder o alerta automaticamente após X segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // 3000 milissegundos = 3 segundos
  };

  const aumentar = () => SetQuantidade(quantidade + 1);
  const diminuir = () => {
    if (quantidade > 1) SetQuantidade(quantidade - 1);
  };


  const icones = {
    Estrela: { contorno: "/img/estrela.png", preenchido: "/img/estrela_preenchida.png" },
    Casinha: { contorno: "/img/casinha.png", preenchido: "/img/casinha_preenchida.png" },
    Circulo: { contorno: "/img/circulo.png", preenchido: "/img/circulo_preenchido.png" },
  };


  const handlePersonalizacaoChange = (categoria, valor) => {
    setPersonalizacaoSelecionada((prev) => ({ ...prev, [categoria]: valor }));
  };

  const handleConfirmarPagamento = () => {
    //navigate('/pagamento'); 
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!produto) return <div>Produto não encontrado.</div>;

  return (
    <div className="container-produto-detalhada">
      <Navbar />

      {showAlert && (
        <div className="alert-container">
          <div className={`alert alert-${alertType}`}>
            {alertMessage}
          </div>
        </div>
      )}
      <div className="produto-content-wrapper">

        <div className="produto-imagem-section">
          <div className="imagem-principal">
            <img src={produto.imagemUrl} alt={produto.nome} />
          </div>
          <div className="galeria-imagens">
            <img src={produto.imagemUrl} alt="Vista 1" />
            <img src={produto.imagemUrl} alt="Vista 2" />
            <img src={produto.imagemUrl} alt="Vista 3" />
          </div>
        </div>

        {/* Lado Direito: Infos + Ações */}
        <div className="produto-info-section">
          <h1 className="produto-titulo">{produto.nome}</h1>
          <h2 className="produto-preco">R$ {produto.preco.toFixed(2).replace(".", ",")}</h2>

          <p className="produto-subtitulo">Personalize seu produto:</p>

          <div className="opcoes-personalizacao">
            {/* Cores */}
            <div className="grupo-personalizacao">
              <span className="text-personalizacao">Cor: {personalizacaoSelecionada.cor || "Selecione"}</span>
              <div className="checkbox-container">
                {["Vermelho", "Azul", "Amarelo", "Verde"].map((cor) => (
                  <button
                    key={cor}
                    className={`cor-button cor-${cor.toLowerCase()} ${personalizacaoSelecionada.cor === cor ? "selected" : ""}`}
                    onClick={() => handlePersonalizacaoChange("cor", cor)}
                    title={cor}
                  />
                ))}
              </div>
            </div>

            {/* Tamanhos */}
            <div className="grupo-personalizacao">
              <span className="text-personalizacao">Tamanho: {personalizacaoSelecionada.tamanho || "Selecione"}</span>
              <div className="checkbox-container">
                {[
                  { label: "P", value: "Pequeno" },
                  { label: "M", value: "Médio" },
                  { label: "G", value: "Grande" }
                ].map((t) => (
                  <button
                    key={t.value}
                    className={`tamanho-button ${personalizacaoSelecionada.tamanho === t.value ? "selected" : ""}`}
                    onClick={() => handlePersonalizacaoChange("tamanho", t.value)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Símbolos */}
            <div className="grupo-personalizacao">
              <span className="text-personalizacao">Símbolo: {personalizacaoSelecionada.simbolo || "Selecione"}</span>
              <div className="checkbox-container">
                {["Estrela", "Casa", "Circulo"].map((simbolo) => {
                  const mapaIcones = {
                    "Estrela": "Estrela",
                    "Casa": "Casinha",
                    "Circulo": "Circulo"
                  };
                  const key = mapaIcones[simbolo];
                  const iconeObj = icones[key];

                  return (
                    <button
                      key={simbolo}
                      className={`simbolo-button ${personalizacaoSelecionada.simbolo === simbolo ? "selected" : ""}`}
                      onClick={() => handlePersonalizacaoChange("simbolo", simbolo)}
                    >
                      <img
                        src={personalizacaoSelecionada.simbolo === simbolo ? iconeObj.preenchido : iconeObj.contorno}
                        alt={simbolo}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="container-acoes">
            <div className="alinhamento-quantidade-produto">
              <span className="text-personalizacao">Quantidade:</span>
              <div className="grupo-botoes-input">
                <button onClick={diminuir}>-</button>
                <input type="number" value={quantidade} readOnly />
                <button onClick={aumentar}>+</button>
              </div>
            </div>

            <div className="botoes-compra">
              <button className="button-adicionar" onClick={handleAddToCart}>
                Adicionar ao Carrinho - R$ {(produto.preco * quantidade).toFixed(2).replace('.', ',')}
              </button>
            </div>

            <button className='button-confirmar' onClick={handleConfirmarPagamento}>Confirmar Pagamento</button>
          </div>

        </div>
      </div>

      <div className="container-descricao-total">
        <div className="secao-detalhe">
          <h3>Descrição</h3>
          <p>{produto.descricao || "Sem descrição disponível."}</p>
        </div>
      </div>

      <div className="container-descricao-total container-comentarios">
        <div className="secao-detalhe">
          <h3>Avaliações e Comentários</h3>

          <form className="form-comentario" onSubmit={handleEnviarComentario}>
            <textarea
              placeholder="O que você achou deste produto? (Necessário estar logado para comentar)"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              rows="3"
            />
            <button type="submit" className="button-enviar-comentario">
              Avaliar
            </button>
          </form>

          <div className="lista-comentarios">
            {comentarios.length === 0 ? (
              <p className="no-comments">Seja o primeiro a avaliar!</p>
            ) : (
              comentarios.map((c) => (
                <div key={c._id} className="card-comentario">
                  <div className="avatar-comentario">
                    {c.userId?.nome?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="conteudo-comentario">
                    <div className="header-comentario">
                      <strong>{c.userId?.nome || "Usuário Anônimo"}</strong>
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p>{c.texto}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div >

      <Footer />
    </div >
  );
}
