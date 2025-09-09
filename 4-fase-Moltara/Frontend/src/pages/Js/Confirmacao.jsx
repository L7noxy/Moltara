import React from 'react'
import '../Css/Confirmacao.css'
import Navbar from "../../components/Js/Navbar";
import Nav_confirm from "../../components/Js/Nav_confirm";


export default function Confirmacao() {

  return (
    <div>
      <Navbar />
      <div className="container-confirmacao">
        <Nav_confirm />
        <div className="produtos-confirmacao">
          
        </div>
      </div>
    </div>
  )
}
