import React, { use, useEffect, useState } from "react";
import "../Css/CriarProduto.css";
import Navbar from "../../components/Js/Navbar";

export default function CriarProduto() {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/produto/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco
        }),
      });

      setNome("");
      setDescricao("");
      setPreco(0);
    } catch (erro) {
      console.error("Ocorreu um erro:", erro);
    }
  };

  return (
    <div className="container-criarProduto">
      <Navbar />
      <div className="criar-produto">
        <h1>CRIAR PRODUTO</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required className="preco"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              name="descricao"
              required
              className="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="preco">Preço:</label>
            <input
              type="number"
              id="preco"
              name="preco"
              required
              className="preco"
              min={1}
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <button type="submit" className="cadastrar-produto">Cadastrar Produto</button>
        </form>
      </div>
    </div>
  );
}
