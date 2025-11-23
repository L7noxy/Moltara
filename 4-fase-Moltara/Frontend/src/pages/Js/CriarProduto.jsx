import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Js/Navbar.jsx";
import "../Css/CriarProduto.css";

export default function CriarProduto() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [imagemFile, setImagemFile] = useState(null); 
    const [Produto, setProduto] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImagemFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(); 
        formData.append("nome", nome);
        formData.append("descricao", descricao);
        formData.append("preco", preco);
        
        if (imagemFile) {
            formData.append("imageFile", imagemFile); 
        }

        try {
            const response = await fetch("http://localhost:3000/api/produto/criar", {
                method: "POST",
                body: formData, 
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Erro ao criar produto: ${response.status}`);
            }

            console.log("Produto criado com sucesso:", data);
            
            setNome("");
            setDescricao("");
            setPreco(0);
            setImagemFile(null); 

            
        } catch (erro) {
            console.error("Ocorreu um erro:", erro);
            alert(`Erro ao cadastrar: ${erro.message}`);
            return; 
        }

        setTimeout(() => {
            navigate("/");
        }, 1500);
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

                    <div>
                        <label htmlFor="imageFile">Imagem:</label>
                        <input
                            type="file"
                            id="imageFile" 
                            name="imageFile" 
                            accept="image/*"
                            required
                            className="img"
                            onChange={handleFileChange} 
                        />
                    </div>
                    <button type="submit" className="cadastrar-produto">Cadastrar Produto</button>
                </form>
            </div>
        </div>
    );
}