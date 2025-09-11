import React from 'react'
import Navbar from '../../components/Js/Navbar'
import '../Css/ProdutoDetalhada.css'

export default function ProdutoDetalhada() {
  return (
 
    <div className='container-produto'>
     <Navbar />

        <div className='container-descricao'>

          <div className='alinhamento-geral'>

           <h2 className='titulo'>Mouse Gamer</h2>

           <div className='alinhamento-2'>
            <h4 className='valor'>Preço: xxx</h4>
            <p className='sub-titulo'>Personalização do produto:</p>

            <div className='alinhamento-checkbox'>
              <div className='check-item'>
               <input type="checkbox" id='check1' />
               <label>Cor: Preto</label>
              </div>

             <div className='check-item'>
              <input type="checkbox" id='check2' />
              <label>Cor: Rosa</label>
              </div>

              <div className='check-item'>
              <input type="checkbox" id='check3' />
              <label>Cor: Roxo</label>
              </div>

              <div className='check-item'>
              <input type="checkbox" id='check3' />
              <label>Tamanho: Pequeno</label>
              </div>

              <div className='check-item'>
              <input type="checkbox" id='check3' />
              <label>Tamanho: Médio</label>
             </div>
 
             <div className='check-item'>
              <input type="checkbox" id='check3' />
              <label>Tamanho: Grande</label>
              </div>
            </div>

           <h3>Descrição do produto</h3>
           <p>Descrição aprofundada do mouse gamer...</p>

          </div>
        </div>
    
        <div className='container-valor'>
         <h2>Preço total: xxx</h2>
         <button>Confirmar compra</button>
         <button>Adicionar ao Carrinnho</button>
        </div>
      </div>
     

    
    </div>
  )
}
