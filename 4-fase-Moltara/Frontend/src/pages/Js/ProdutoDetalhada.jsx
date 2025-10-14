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

  const [personalizacaoEscolhida, SetPersonalzcaoEscolhida] = useState ({
   cor:null,
   tamanho:null,
   símbolo:null
  })

  const handlePersonalizacaoChange = (categoria, valor) =>{
    SetPersonalzcaoEscolhida(prev =>({
     ...prev,
     [categoria]: valor
    }))
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
           <div className='container-img'/>
           <div className='container-img'/>
           <div className='container-img'/>
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
                  <button 
                   className={`cor-button cor-vermelho ${personalizacaoEscolhida.cor === "Vermelho" ? 'selected' : ''}`}
                   onClick={() => handlePersonalizacaoChange('cor', 'Vermelho')}
                    aria-label="Selecionar cor Vermelha"
                  />
            
                  <button
                   className={`cor-button cor-azul ${personalizacaoEscolhida.cor === "Azul" ? 'selected' : ''}`}
                   onClick={() => handlePersonalizacaoChange('cor', 'Azul')}
                  />

                  <button
                   className={`cor-button cor-amarelo ${personalizacaoEscolhida.cor === "Amarelo" ? 'selected' : ''}`}
                   onClick={() => handlePersonalizacaoChange('cor', 'Amarelo')}
                  />
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

                <div class="grupo-personalizacao">
                 <p className='text-personalizacao'>Símbolos</p>
                  <div className='checkbox-container'>
                    <div className='check-item'>
                     <input type="checkbox" id='check3' />
                     <label>Estrela</label>
                    </div>

                    <div className='check-item'>
                     <input type="checkbox" id='check3' />
                     <label>Casa</label>
                    </div>
 
                    <div className='check-item'>
                     <input type="checkbox" id='check3' />
                     <label>Circulo</label>
                    </div>
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
