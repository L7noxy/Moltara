import React from 'react'
import Navbar from '../../components/Js/Navbar'
import '../Css/ProdutoDetalhada.css'

export default function ProdutoDetalhada() {
  return (
 
    <div className='container-produto'>
     <Navbar />
      <div className='alinhamento-geral'>

        <div className='alinhamento-1'>
         <h3 className='titulo'>Exemplo produto</h3>

          <div className='alinhamento-2'>
           <h4 className='valor'>Preço: xxx</h4>
           <p className='sub-titulo'>Personalização do produto:</p>

            <div className='alinhamento-checkbox'>
             <h3 className='text-personalizacao'>Cores</h3>
              <div className='check-item'>
               <input type="checkbox" id='check1' />
               <label>Preto</label>
              </div>

              <div className='check-item'>
               <input type="checkbox" id='check2' />
               <label>Branco</label>
              </div>

              <div className='check-item'>
               <input type="checkbox" id='check3' />
               <label>Rosa</label>
              </div>

              <h3 className='text-personalizacao'>Tamanhos</h3>
              <div className='check-item'>
               <input type="checkbox" id='check3' />
               <label>Pequeno</label>
              </div>

              <div className='check-item'>
               <input type="checkbox" id='check3' />
               <label>Médio</label>
              </div>
 
              <div className='check-item'>
               <input type="checkbox" id='check3' />
               <label>Grande</label>
              </div>
            </div>

            <div className='descricao'>
             <h4>Descrição do produto:</h4>
             <p>Descrição aprofundada do Exemplo produto...</p>
            </div>

          </div>

        </div>
    
        <div className='container-valor'>
         <h3 className='titulo-valor'>Preço total: xxx</h3>
         <button className='button-confirmar'>Confirmar compra</button>
         <button className='button-adicionar'>Adicionar ao Carrinnho</button>
        </div>

      </div>

    </div>
  )
}
