import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../Css/PainelDeControle.css";

function PainelDeControle() {
  return (
    <div className="container-painel">
      <div className="container-um">

        <div className="card">
          <Link to="/criarProduto" className="card-link">
            <span className="card-text">Adicionar Produto</span>
          </Link>
        </div>

        <div className="card">
          <Link to="/estoque" className="card-link">
            <span className="card-text">Gestão de Estoque</span>
          </Link>
        </div>

        <div className="card">
           <Link to="/" className="card-link"> 
            <span className="card-text">Editar Perfil</span>
          </Link>
        </div>

        <div className="card">
          <Link to="/" className="card-link sair-adm-btn">
            <span className="card-text">Sair do modo adm</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PainelDeControle;
