import React, { useState } from 'react'
import '../Css/CardProduto.css'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

export default function CardProduto() {
    const [carouselTrack, setCarouselTrack] = useState("");
    const [prevBtn, setPrevBtn] = useState("");
    const [nextBtn, useNextBtn] = useState("");

    const totalImages = 10;
    const visibleImages = 5;
    const itemWidth = 200;
    const itemGap = 10;

    let currentIndex = 0;

    const produtos = [
        {
            id: 1,
            descricao: 'Cadeira Gamer KBM! GAMING Tempest CG500 Preta e Roxa, Com Almofadas, Descanso Para Pernas Retrátil, Reclinável - KGCG500PTRX',
            preco: 9.99
        },
        {
            id: 2,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 3,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 4,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 5,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 6,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
        {
            id: 7,
            descricao: 'Headset Gamer Sem Fio Logitech G PRO X Wireless LIGHTSPEED 7.1 Dolby Surround, Blue VOICE, Drivers PRO-G 50 mm - 981-000906',
            preco: 19.99
        },
    ]

    function updateCarousel() {
        const offset = currentIndex * (itemWidth + itemGap);
        track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn('click', () => {
        currentIndex++;
        if (currentIndex > totalImages - visibleImages) {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalImages - visibleImages;
        }
        updateCarousel();
    });

    return (
        <div>
            <div className='container-produtos-home'>
                <button class="seta" id="prevBtn"><HiOutlineArrowSmallLeft size={30} /></button>
                {produtos.map((produto) => (
                    <div key={produto.id} className="card-produto">
                        <div className='image-produto'>
                            <img src="./img/cadeira.png" />
                        </div>
                        <p>{produto.descricao}</p>

                        <div className='preco-card'>
                            <p>{produto.preco}</p>
                        </div>

                    </div>
                ))}
                <button class="seta" id="nextBtn"><HiOutlineArrowSmallRight size={30} /></button>
            </div>
        </div>

    )
}
