import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { LuChartSpline } from "react-icons/lu";
import { FaGear } from "react-icons/fa6";
import { CgAddR } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";

import "../Css/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [rodar, setRodar] = useState(false);
  const [girado, setGirado] = useState(false);
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType'); // Pega o tipo de usuário: 'investidor' ou 'profissional'

  const girar = () => {
    setRodar(true);

    setTimeout(() => {
      setRodar(false);
      setGirado(!girado);
    }, 300)
  };

  useEffect(() => {
    const checkProfessionalProjects = async () => {
      // AQUI: A condição é para o 'profissional' que cria projetos
      if (userType === 'profissional' && userId) { 
        try {
          const response = await fetch(`http://localhost:5000/api/projetos/${userId}`);
          const data = await response.json();

          if (response.ok && data.hasProjects) {
            setShowEditProjectLink(true);
          } else {
            setShowEditProjectLink(false);
          }
        } catch (error) {
          console.error('Erro ao verificar projetos do profissional:', error);
          setShowEditProjectLink(false);
        }
      } else {
        setShowEditProjectLink(false);
      }
    };

    checkProfessionalProjects();
  }, [userId, userType]); 

  return (
    <>

      <div className={`container-sidebar ${isOpen ? "show" : ""}`}>
        <nav className="sidebar">
          <button
            className="toggle-btn"
            onClick={() => {
              setIsOpen(!isOpen),
                girar();
            }} >
            <IoCloseOutline
              color="white"
              fontSize={30}
              className={
                rodar
                  ? girado
                    ? "fixado"
                    : "rotacao"
                  : girado
                    ? "rotacao-reversa"
                    : ""
              }
            />

          </button>

          <Link to={'/'} className="icon-text "><HiMiniHome color="white" fontSize={18} /><span className="link-text">Home </span></Link>
          <Link to={'/pessoas_chat'} className="icon-text "><FaUserFriends color="white" fontSize={18} /><span className="link-text">Usuarios</span></Link>
          <Link to={'/criarProjeto'} className="icon-text"><CgAddR color="white" fontSize={18} /><span className="link-text">Criar Projeto</span> </Link>
          <Link to={'/projetos'} className="icon-text"><LuChartSpline color="white" fontSize={18} /> <span className="link-text">Projetos </span> </Link>
          <Link to={`/configs/${userId}`} className="icon-text"><FaGear color="white" fontSize={16} /><span className="link-text"> Configurações</span></Link>
          <Link to={`/perfil/${userId}`} className="icon-text"><FaUserAlt color="white" fontSize={18} /><span className="link-text">Perfil</span></Link>

        </nav>
      </div>
    </>
  );
}

export default Sidebar;