import React from 'react'
import "../Css/PerfilAdm.css"

function PerilAdm() {
  return (
    <div className='Container-admPerfil'>
      <div className='Container-formulario'>

        <img src='/img/userAdm.png' className='iconPerfilAdm'/>
        <div className='alinhamento-form'>
         <label>Nome</label>
         <input type='text' value=''/>
        </div>
        
        <div className='alinhamento-form'>
         <label>Email</label>
         <input type='email' value=''/>
        </div>

        <div className='alinhamento-form'>
         <label>Senha</label>
         <input type='password' value=''/>
        </div>

        <button className='button-salvar'>Salvar</button>
      </div>
    </div>
  )
}

export default PerilAdm