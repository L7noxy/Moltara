import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "../Css/PerfilAdm.css"

function PerilAdm() {
  const [Nome, SetNome]= useState('')
  const [Email, SetEmail]= useState('')
  const [Senha, SetSenha]= useState('')

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const carregarDadosPerfil = async () => {
      setIsLoading(true); 
      setStatusMessage(null);

      try {
       const response = await axios.get('/api/admin/perfil');
       const dadosAdm = response.data; // Dados recebidos do servidor
        
       SetNome(dadosAdm.Nome);
       SetEmail(dadosAdm.Email);

       } catch (error) {
       console.error("Erro ao carregar o perfil:", error);
       const msg = error.response?.data?.message || 'Não foi possível carregar os dados do perfil. Verifique a conexão.';
       setStatusMessage({ type: 'error', text: msg });
       } finally {
       setIsLoading(false);
      }
    
    };
     carregarDadosPerfil();
    }, [])

    const salvarDados = async () => {
    if (!Nome.trim() || !Email.trim()) {
      setStatusMessage({ type: 'error', text: 'Nome e Email são obrigatórios.' });
      return;
    }
    
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EmailRegex.test(Email)) {
      setStatusMessage({ type: 'error', text: 'O Email fornecido é inválido.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    const dadosAtualizados = { Nome, Email };
    
    if (Senha.trim()) {
      dadosAtualizados.senha = Senha;
    }

    try {
      await axios.put('http://localhost:5173/perilAdm', dadosAtualizados);
      // Sucesso
      setStatusMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      SetSenha(''); 

    } catch (error) {
      // Erro na atualização
      console.error("Erro ao atualizar o perfil:", error);
      const msg = error.response?.data?.message || 'Erro ao salvar. Verifique sua conexão.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

   return (
    <div className='Container-admPerfil'>
      <div className='Container-formulario'>

        <img src='/img/userAdm.png' className='iconPerfilAdm'/>
        <div className='alinhamento-form'>
         <label>Nome</label>
         <input type='text' value={Nome} onChange={handleNomeChange}/>
        </div>
        
        <div className='alinhamento-form'>
         <label>Email</label>
         <input type='email' value= {Email} onChange={handleEmailChange}/>
        </div>

        <div className='alinhamento-form'>
         <label>Senha</label>
         <input type='password' value={Senha} onChange={handleSenhaChange}/>
        </div>

        <button className='button-salvar' onClick={salvarDados}>Salvar</button>
      </div>
    </div>
  )
}

export default PerilAdm