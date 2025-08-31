import React from 'react'
import '../Css/Home.css'
import Navbar from '../../components/js/Navbar'
import CardProduto from '../../components/js/CardProduto'
// import Carrosel from '../../components/js/Carrosel'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className='container-home'>

        <Navbar />
        <div>
          <div>
            <div className='botoes-carrosel'>
              <button className='botao-carrosel-esquerdo'><FaArrowLeftLong color='#ffffffff' size={20} /></button>
              <button className='botao-carrosel-direito'><FaArrowRightLong color='#ffffffff' size={20} /></button>
            </div>

            
              {/* <Carrosel /> */}
          </div>
          <CardProduto />
        </div>

      </div>
    </>
  )
}
