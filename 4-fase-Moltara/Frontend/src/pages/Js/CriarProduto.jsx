import React, { useState } from "react";
import "../Css/CriarProduto.css";
import Navbar from "../../components/Js/Navbar";
import { useNavigate } from "react-router";

export default function CriarProduto() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    // 🌟 1. NOVO ESTADO: Para armazenar o arquivo de imagem selecionado
    const [imagemFile, setImagemFile] = useState(null); 
    const [Produto, setProduto] = useState(null);
    const navigate = useNavigate();

    // Função para lidar com a seleção do arquivo
    const handleFileChange = (e) => {
        // Pega o primeiro arquivo do input de tipo "file"
        setImagemFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🌟 2. CORREÇÃO: "F" e "D" devem ser maiúsculos
        const formData = new FormData(); 
        formData.append("nome", nome);
        formData.append("descricao", descricao);
        formData.append("preco", preco);
        
        // 🌟 3. ADICIONA O ARQUIVO ao FormData
        if (imagemFile) {
            // 'imageFile' deve CORRESPONDER ao nome do campo usado no Multer do backend
            formData.append("imageFile", imagemFile); 
        }

        try {
            // Quando você envia um FormData que contém um arquivo,
            // o cabeçalho Content-Type é automaticamente definido como 'multipart/form-data' pelo navegador.
            const response = await fetch("http://localhost:3000/api/produto/criar", {
                method: "POST",
                body: formData, // Envia o FormData
                // NÃO adicione o cabeçalho 'Content-Type', deixe o navegador fazer isso.
            });

            const data = await response.json(); // Tenta ler a resposta JSON

            if (!response.ok) {
                // Se a resposta não for OK, lança o erro, possivelmente com a mensagem do backend
                throw new Error(data.message || `Erro ao criar produto: ${response.status}`);
            }

            console.log("Produto criado com sucesso:", data);
            
            // 4. Limpar o formulário e redirecionar
            setNome("");
            setDescricao("");
            setPreco(0);
            setImagemFile(null); // Limpa o estado do arquivo

            // Você pode exibir uma mensagem de sucesso aqui antes de navegar
            
        } catch (erro) {
            console.error("Ocorreu um erro:", erro);
            alert(`Erro ao cadastrar: ${erro.message}`);
            // Removendo o setTimeout de navegação em caso de erro.
            return; 
        }

        // Navega após sucesso
        setTimeout(() => {
            navigate("/");
        }, 1500); // Reduzi o tempo para 1.5s para navegação mais rápida.
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
                            // Garante que o valor seja tratado como string no input, mas o formData o converte corretamente
                            onChange={(e) => setPreco(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label htmlFor="imageFile">Imagem:</label>
                        <input
                            type="file"
                            // Mudei o ID para refletir o 'name' ou para ser mais claro
                            id="imageFile" 
                            name="imageFile" 
                            accept="image/*"
                            required
                            className="img"
                            // 🌟 4. NOVO EVENTO: Captura o arquivo selecionado
                            onChange={handleFileChange} 
                        />
                    </div>
                    <button type="submit" className="cadastrar-produto">Cadastrar Produto</button>
                </form>

                {/* Você pode manter o preview do produto, mas verifique o nome da variável, que está como 'Produto' (maiúsculo) */}
                {/* Produto (com 'P' maiúsculo) pode estar causando confusão. Considere mudar o nome do estado para 'produtoCriado' */}
            </div>
        </div>
    );
}