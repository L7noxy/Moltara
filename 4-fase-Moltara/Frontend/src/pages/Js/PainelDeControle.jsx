import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../Css/PainelDeControle.css";

function PainelDeControle() {
  return (
    <div className="container-painel">
      <div className="container-um">

        <div className="card">
          <Link to="/criarProduto">Adicionar Produto</Link>
        </div>

        <div className="card">
          <Link to="/estoque">Adicionar Produto</Link>
        </div>

        <div className="card">
         <p>Editar Perfil</p>
        </div>

        <div className="card">
         <p>Sair do Modo ADM</p>
        </div>

      </div>
    </div>
  );
}

export default PainelDeControle;
