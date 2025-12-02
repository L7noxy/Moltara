import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Css/PaginaResultados.css'; // Crie este CSS para estilização

function PaginaResultados() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  const getSearchTerm = () => {
    const params = new URLSearchParams(location.search);
    return params.get('q');
  };

  useEffect(() => {
    const searchTerm = getSearchTerm();

    if (!searchTerm) {
      setError('Nenhum termo de pesquisa fornecido.');
      setIsLoading(false);
      setProdutos([]);
      return;
    }

    const buscarProdutos = async () => {
      setIsLoading(true);
      setError(null);
      setProdutos([]);

      try {
        const response = await axios.get(`http://localhost:3000/api/produtos/pesquisa?q=${searchTerm}`);
        
        if (response.data && response.data.length > 0) {
          setProdutos(response.data);
        } else {
          setError(`Nenhum resultado encontrado para "${searchTerm}".`);
          setProdutos([]);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError('Ocorreu um erro ao conectar com o servidor.');
      } finally {
        setIsLoading(false);
      }
    };

    buscarProdutos();
  }, [location.search]); 

  return (
    <div className="container-resultados">
      <h2>Resultados da Pesquisa para: "{currentSearchTerm}"</h2>
      
      {isLoading && <p className="status-message loading">Carregando produtos...</p>}

      {error && <p className="status-message error">{error}</p>}

      {!isLoading && !error && produtos.length > 0 && (
        <div className="lista-produtos">
          {produtos.map(produto => (
            <div key={produto._id} className="card-produto">
              {produto.imagemUrl && (
                <img 
                  src={produto.imagemUrl} 
                  alt={`Imagem de ${produto.nome}`} 
                  className="produto-imagem" 
                />
              )}
              
              <div className="produto-info">
                <h3>{produto.nome}</h3> 

                <p className="produto-descricao">{produto.descricao}</p>
                
                <button className="btn-comprar">Ver Detalhes</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && !error && produtos.length === 0 && !currentSearchTerm && (
         <p className="status-message">Use a barra de pesquisa para encontrar produtos.</p>
      )}
    </div>
  );
}

export default PaginaResultados;