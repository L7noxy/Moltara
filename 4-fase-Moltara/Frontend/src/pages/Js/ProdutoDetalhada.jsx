import React from 'react'
import Navbar from '../../components/Js/Navbar'
import '../Css/ProdutoDetalhada.css'

import { useState } from 'react'

export default function ProdutoDetalhada() {
  // Estado para a quantidade do produto
  const [quantidade, SetQuantidade]= useState(1)
  const aumentar = () => SetQuantidade(quantidade +1)
  const diminuir = () =>{
    if (quantidade >1) SetQuantidade(quantidade -1)
  }

  // Estado para as opções de personalização selecionadas
  const [personalizacaoSelecionada, setPersonalizacaoSelecionada] = useState({
   cor: null,
   tamanho: null,
   simbolo: null
  });

  const icones = {
    Estrela: {
     contorno: '/imgs/estrela.png',       
     preenchido: '/imgs/estrela_preenchida.png'    
    },
    Casinha: {
      contorno: '/imgs/casinha.png',       
      preenchido: '/imgs/casinha_preenchida.png'     
    },
    Circulo: {
      contorno: '/imgs/circulo.png',  
      preenchido: '/imgs/circulo_preenchido.png'   
    }
  };

  // Função para lidar com a mudança de personalização
  const handlePersonalizacaoChange = (categoria, valor) => {
    setPersonalizacaoSelecionada(prev => ({
     ...prev,
     [categoria]: valor
    }));
  };

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
              <div className="grupo-personalizacao">
                <p className='text-personalizacao'>Cores (Selecionada: {personalizacaoSelecionada.cor || 'Nenhuma'})</p>
                <div className='checkbox-container'>
                  <button 
                    className={`cor-button cor-vermelho ${personalizacaoSelecionada.cor === "Vermelho" ? 'selected' : ''}`}
                    onClick={() => handlePersonalizacaoChange('cor', 'Vermelho')}
                    aria-label="Selecionar cor Vermelha"
                  />

                  <button 
                    className={`cor-button cor-azul ${personalizacaoSelecionada.cor === "Azul" ? 'selected' : ''}`}
                    onClick={() => handlePersonalizacaoChange('cor', 'Azul')}
                    aria-label="Selecionar cor Azul"
                  />

                  <button 
                    className={`cor-button cor-amarelo ${personalizacaoSelecionada.cor === "Amarelo" ? 'selected' : ''}`}
                    onClick={() => handlePersonalizacaoChange('cor', 'Amarelo')}
                    aria-label="Selecionar cor Amarela"
                  />
                  
                </div>
              </div>

              <div className="grupo-personalizacao">
                <p className='text-personalizacao'>Tamanhos (Selecionado: {personalizacaoSelecionada.tamanho || 'Nenhum'})</p>
                
                <div className='checkbox-container'>
                <div className='checkbox-container'>
                  <button 
                    className={`tamanho-button tamanho-pequeno ${personalizacaoSelecionada.tamanho === "Pequeno" ? 'selected' : ''}`}
                    onClick={() => handlePersonalizacaoChange('tamanho', 'Pequeno')}
                  >
                   P
                  </button>

                  <button 
                    className={`tamanho-button tamanho-medio ${personalizacaoSelecionada.tamanho === "Médio" ? 'selected' : ''}`}
                    onClick={() => handlePersonalizacaoChange('tamanho', 'Médio')}
                  >
                   M
                  </button>

                  <button 
                    className={`tamanho-button tamanho-grande ${personalizacaoSelecionada.tamanho === "Grande" ? 'selected' : ''}`}
                    onClick={() => handlePersonalizacaoChange('tamanho', 'Grande')}
                  >
                   G
                  </button>
                 </div>
                </div>

                <div className="grupo-personalizacao">
                  <p className='text-personalizacao'>Símbolos (Selecionado: {personalizacaoSelecionada.simbolo || 'Nenhum'})</p>
                  <div className='checkbox-container'>
                    
                    <button 
                      className={`simbolo-button ${personalizacaoSelecionada.simbolo === "Estrela" ? 'selected' : ''}`}
                      onClick={() => handlePersonalizacaoChange('simbolo', 'Estrela')}
                      aria-label="Selecionar símbolo Estrela"
                    >
                      <img 
                        src={personalizacaoSelecionada.simbolo === "Estrela" ? icones.Estrela.preenchido : icones.Estrela.contorno} 
                        alt="Estrela" 
                      />
                    </button>

                    <button 
                      className={`simbolo-button ${personalizacaoSelecionada.simbolo === "Casa" ? 'selected' : ''}`}
                      onClick={() => handlePersonalizacaoChange('simbolo', 'Casa')}
                      aria-label="Selecionar símbolo Casa"
                    >
                      <img 
                        src={personalizacaoSelecionada.simbolo === "Casa" ? icones.Casinha.preenchido : icones.Casinha.contorno} 
                        alt="Casa" 
                      />
                    </button>
                    
                    <button 
                      className={`simbolo-button ${personalizacaoSelecionada.simbolo === "Circulo" ? 'selected' : ''}`}
                      onClick={() => handlePersonalizacaoChange('simbolo', 'Circulo')}
                      aria-label="Selecionar símbolo Círculo"
                    >
                      <img 
                        src={personalizacaoSelecionada.simbolo === "Circulo" ? icones.Circulo.preenchido : icones.Circulo.contorno} 
                        alt="Círculo" 
                      />
                    </button>
                  </div>
                </div>

              </div>
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