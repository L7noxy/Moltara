import "../Css/EstoqueProduto.css";
import { useEffect, useState } from "react";

export default function EstoqueProduto() {
  const [produtos, setProducts] = useState([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/produto/buscar");

        if (!response.ok) {
          throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        const dados = await response.json();
        setProdutos(dados);
      } catch (erro) {
        console.error("Ocorreu um erro:", erro);
      }
    };

    buscarProdutos();
  }, []);
  
  return (
    <div>
      <div className="container-estoque">
        <h2>produtos no estoqueqsqsqsqsqsq: </h2>
        <table className="tabela-estoque">
          <tbody>
            <thead>
              {produtos.map((produto) => {
                <tr>
                  <th>ID{produto.id}</th>
                  <th>Nome{produto.nome}</th>
                  <th>Estoque{produto.estoque}</th>
                  <th>Preço {produto.preco}(R$)</th>
                </tr>;
              })}
            </thead>
          </tbody>
        </table>
      </div>
    </div>
  );
}