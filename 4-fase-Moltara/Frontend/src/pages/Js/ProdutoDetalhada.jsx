import React from 'react'
import Navbar from '../../components/Js/Navbar'
import '../Css/ProdutoDetalhada.css'
import { useState } from 'react'

export default function ProdutoDetalhada() {
 const [quantidade, SetQuantidade]= useState(1)
 const aumentar = () => SetQuantidade(quantidade +1)
  const diminuir = () =>{
   if (quantidade >1) SetQuantidade(quantidade -1)
  }

  return (
    <div className='container-produto'>
     <Navbar />
      <div className='alinhamento-geral'>
        <div className='container-imgs-principal'>
          <div className='container-item'>
           <h1>IMG produto</h1>
          </div>
    
          <div className='alinhamento-imgs'>
            <div className='container-img'>
             <p>Img 1</p>
            </div>
            <div className='container-img'>
             <p>Img 2</p>
            </div>
            <div className='container-img'>
             <p>Img 3</p>
            </div>
          </div>
        </div>

        <div className='container-info-item'>
         <h3 className='titulo'>Exemplo produto</h3>

          <div className='alinhamento-1'>
           <h4 className='valor'>Preço: xxx</h4>
           <p className='avaliacao'>Avaliação do produto:</p>
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
          <div className='alinhamento-quantidade-produto'>
           <label>Quantidade do produto:</label>

            <div className='grupo-botoes-input'>  
             <button className='diminuir' onClick={diminuir}>-</button> 
             <input type='number' value={quantidade} readOnly></input>
             <button className='aumentar' onClick={aumentar}>+</button>
            </div>
          </div>
          
          <div className='botoes-compra'>
           <button className='button-adicionar'>Adicionar ao Carrinnho</button>
           <button className='button-confirmar'>Confirmar Compra</button>
          </div>
        </div>
      </div>
    </div>
  )
}
