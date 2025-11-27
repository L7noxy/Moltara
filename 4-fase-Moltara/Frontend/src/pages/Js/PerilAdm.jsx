import React from 'react'
import "../Css/PerfilAdm.css"

function PerilAdm() {
  return (
    <div className='Container-adm'>
        <div className='Container-formulario'>
         <label>Nome</label>
         <input type='text' value={nome}/>

         <label>Email</label>
         <input type='email' value={email}/>

         <label>Senha</label>
         <input type='password' value={senha}/>

         <button onClick={SalvarEdicao} className='button-salvar'>Salvar</button>
        </div>
    </div>
  )
}

export default PerilAdm