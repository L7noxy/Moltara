import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../Css/PainelDeControle.css";

function PainelDeControle() {
  return (
    <div className="container-painel">
      <div className="container-um">

        <div className="card-adm">
          <Link to="/criarProduto" className="card-link">
            <img src='/img/mais.png' className='img-iconMais' />
            <span className="card-text">Adicionar Produto</span>
          </Link>
        </div>

        <div className="card-adm">
          <Link to="/estoque" className="card-link">
            <img src='/img/GestorEstoque.png' className="img-iconGestor" />
            <span className="card-text">Gestão de Estoque</span>
          </Link>
        </div>

        <div className="card-adm">
          <Link to="/" className="card-link">
            <img src='/img/Saida.png' className='img-iconSaida' />
            <span className="card-text">Sair do modo adm</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PainelDeControle;
