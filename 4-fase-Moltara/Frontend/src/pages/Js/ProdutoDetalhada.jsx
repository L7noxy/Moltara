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

            <div className='opcoes-personalizacao'>
              <div class="grupo-personalizacao">
               <p className='text-personalizacao'>Cores</p>
                <div className='checkbox-container'>
                  <div className='check-item'>
                   <input type="checkbox" id='check1'/>
                   <label>Preto</label>
                  </div>

                  <div className='check-item'>
                   <input type="checkbox" id='check2'/>
                   <label>Branco</label>
                  </div>

                  <div className='check-item'>
                   <input type="checkbox" id='check3'/>
                   <label>Rosa</label>
                  </div>
                </div>
              </div>

              <div class="grupo-personalizacao">
               <p className='text-personalizacao'>Tamanhos</p>
                <div className='checkbox-container'>
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
              </div>
            </div>

            <div className='descricao'>
             <h3>Sob o produto:</h3>
             <p>Descrição breve do Exemplo produto...</p>
            </div>
          </div>
        </div>
      
        <div className='container-valor'>
         <h3 className='titulo-valor'>Preço total: xxx</h3>
          <div className='botoes-compra'>
           <button className='button-confirmar'>Adicionar ao Carrinnho</button>
           <button className='button-adicionar'>Confirmar Compra</button>
          </div>
        </div>
      </div>
    </div>
  )
}
