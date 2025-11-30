import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/PerfilAdm.css";

function PerilAdm() {
  const [nome, setNome]= useState('')
  const [email, setEmail]= useState('')
  const [senha, setSenha]= useState('')

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const carregarDadosPerfil = async () => {
      setIsLoading(true);
      setStatusMessage(null);

      try {
       const response = await axios.get('');
       const dadosAdm = response.data;
        
       setNome(dadosAdm.nome);
       setEmail(dadosAdm.email);

      } catch (error) {
        console.error("Erro ao carregar o perfil:", error);
        const msg = error.response?.data?.message || "Não foi possível carregar o perfil.";
        setStatusMessage({ type: "error", text: msg });
      } finally {
        setIsLoading(false);
      }
    };

    carregarDadosPerfil(); 
  }, []);

    const salvarDados = async () => {
    if (!nome.trim() || !email.trim()) {
      setStatusMessage({ type: 'error', text: 'Nome e Email são obrigatórios.' });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage({ type: 'error', text: 'O Email fornecido é inválido.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    const dadosAtualizados = { nome, email };
    
    if (senha.trim()) {
      dadosAtualizados.senha = senha;
    }

    try {
      await axios.put('', dadosAtualizados);
      setStatusMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setSenha(''); 

    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      const msg = error.response?.data?.message || 'Erro ao salvar. Verifique sua conexão.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Container-admPerfil">
      <div className="Container-formulario">

        <img src='/img/userAdm.png' className='iconPerfilAdm'/>
        
        {statusMessage && (
          <p className={`message message-${statusMessage.type}`}>
           {statusMessage.text}
          </p>
        )}
        <div className='alinhamento-form'>
         <label>Nome</label>
          <input type='text' value={nome} 
           onChange={(e) => setNome(e.target.value)} 
           disabled={isLoading}
          />
        </div>
        
        <div className='alinhamento-form'>
         <label>Email</label>
          <input type='email' value={email} 
           onChange={(e) => setEmail(e.target.value)}
           disabled={isLoading}
          />
        </div>

        <div className='alinhamento-form'>
         <label>Senha</label>
          <input type='password' value={senha} 
           onChange={(e) => setSenha(e.target.value)}
           placeholder='Preencha para alterar a senha'
           disabled={isLoading}
          />
        </div>

        <button className='button-salvar' onClick={salvarDados} disabled={isLoading}>
         {isLoading ? 'Aguarde...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}

export default PerilAdm;
