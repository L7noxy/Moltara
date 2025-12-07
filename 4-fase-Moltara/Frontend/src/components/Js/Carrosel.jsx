import React, { useState, useEffect } from "react";
import { HiOutlineArrowSmallLeft, HiOutlineArrowSmallRight } from "react-icons/hi2";
import "../Css/Carrosel.css"; // Alterei o caminho para relativo

const slides = [
  {
    img: "/img/banner.webp",
    title: "Promo do Dia Gamer",
    caption: "Descontos incríveis por tempo limitado!",
    cta: "Ver Oferta"
  },
  {
    img: "/img/banner2.webp",
    title: "Promoções gamer",
    caption: "Potência e desempenho pra você dominar o jogo!",
    cta: "Confira"
  },
  {
    img: "/img/banner3.webp",
    title: "Intel Gamer Days",
    caption: "Ganhe o Battlefield 6 ao comprar produtos da Intel!",
    cta: "Saiba Mais"
  }
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${index * 100}%)`
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="carousel-slide">
            <img src={slide.img} alt={slide.title} className="carousel-image" />
            <div className="carousel-caption">
              <h2 className="carousel-title">{slide.title}</h2>
              <p className="carousel-text">{slide.caption}</p>
              <button className="carousel-cta">{slide.cta}</button>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-btn prev" onClick={prev} aria-label="Slide anterior">
        <HiOutlineArrowSmallLeft size={30} />
      </button>
      <button className="carousel-btn next" onClick={next} aria-label="Próximo slide">
        <HiOutlineArrowSmallRight size={30} />
      </button>

      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}