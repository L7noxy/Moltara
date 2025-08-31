import React, { useState, useEffect } from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

import "../../components/Css/Carrosel.css";

const slides = [
  {
    img: "./img/banner.webp",
    title: "Mega Oferta Tech",
    caption: "Descontos incríveis por tempo limitado!",
    cta: "Ver Oferta"
  },
  {
    img: "./img/banner2.webp",
    title: "Hardware Gamer",
    caption: "Potência e desempenho pra você dominar o jogo.",
    cta: "Confira"
  },
  {
    img: "./img/banner3.webp  ",
    title: "Lançamento Notebook",
    caption: "Leve, rápido e moderno — começando agora!",
    cta: "Saiba Mais"
  }
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="kb-carousel">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`kb-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.img})` }}
        >
          <div className="kb-content">
            <h2>{s.title}</h2>
            <p>{s.caption}</p>
            <button className="kb-cta">{s.cta}</button>
          </div>
        </div>
      ))}

      <button className="kb-btn prev" onClick={prev}><HiOutlineArrowSmallLeft size={30}/></button>
      <button className="kb-btn next" onClick={next}><HiOutlineArrowSmallRight size={30}/></button>

      <div className="kb-indicators">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`kb-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
