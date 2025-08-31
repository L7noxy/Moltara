import React from 'react'
import './Home.css'
import Navbar from '../components/Navbar'
import CardProduto from '../components/CardProduto'

export default function Home() {
  return (
    <>
      <div className='container-home'>
        <Navbar />

        <CardProduto />
      </div>
    </>
  )
}
