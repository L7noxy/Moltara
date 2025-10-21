import React from 'react'
import '../Css/Home.css'
import Navbar from '../../components/Js/Navbar'
import CardProduto from '../../components/Js/CardProduto'
import Carrosel from '../../components/Js/carrosel'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from '../../components/Js/Footer'

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

            <Carrosel />
          </div>
          <CardProduto />

          <div className='banner-produto-home'>
            <a href="https://www.pichau.com.br/marca/benq"><img src="./img/Zowie.jpg" alt="" /></a>
            <a href="https://www.pichau.com.br/regrasintel">  <img src="./img/Banner_900x100.png" alt="" srcset="" /></a>
          </div>

          <CardProduto />
          <Footer />
        </div>


      </div>
    </>
  )
}
