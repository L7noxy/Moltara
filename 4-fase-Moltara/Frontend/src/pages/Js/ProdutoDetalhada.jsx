import React from 'react'
import Navbar from '../../components/Js/Navbar'
import '../Css/ProdutoDetalhada.css'

export default function ProdutoDetalhada() {
  return (
    
    <div className='container-produto'>
     <Navbar />
    
      <div className='container-produto'>
       <h2>Mouse Gamer</h2>
      </div> 

      <div className='container-descricao'>
        <h3>Descrição do produto</h3>
        <p>Descrição aprofundada do mouse gamer...</p>
      </div>
    
      <div className='container-valor'>
        <h2>Valor do  produto XXX</h2>
        <button>Confirmar compra</button>
        <button>Adicionar ao Carrinnho</button>
      </div>

    </div>
  )
}
