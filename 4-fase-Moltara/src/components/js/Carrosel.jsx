import React, { useState, useEffect } from "react";
import "../Css/Carrosel.css";

const slides = [
  {
    img: "https://picsum.photos/id/1018/900/500",
    title: "Tecnologia",
    desc: "Inovações que transformam o futuro.",
  },
  {
    img: "https://picsum.photos/id/1015/900/500",
    title: "Natureza",
    desc: "A beleza simples da vida ao ar livre.",
  },
  {
    img: "https://picsum.photos/id/1019/900/500",
    title: "Exploração",
    desc: "Descubra novos horizontes todos os dias.",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // autoplay
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`carousel-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="carousel-overlay">
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
          </div>
        </div>
      ))}

      {/* Botões */}
      <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
      <button className="carousel-btn next" onClick={nextSlide}>❯</button>

      {/* Indicadores */}
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
