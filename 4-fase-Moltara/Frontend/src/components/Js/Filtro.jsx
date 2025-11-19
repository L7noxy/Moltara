import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "../Css/Produtos.css"; 

export default function FilterBar({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categorias = ["PC", "Perifericos", "Fiação", "Iluminação", "Promoções"];

  const handleSelect = (categoria) => {
    setSelectedCategory(categoria);
    setIsOpen(false);
    onFilterChange(categoria === "Todos" ? "" : categoria);
  };


   <div className="filtro-busca">
  <input
    type="text"
    placeholder="Buscar produto no carrinho"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button onClick={handleFilter}>Filtrar</button>
<   /div>


  return (
    <div className="filter-bar">
      <div className="filter-select" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedCategory}</span>
        <FaChevronDown className={`arrow ${isOpen ? "open" : ""}`} size={14} />
      </div>

      {isOpen && (
        <div className="filter-dropdown">
          <p onClick={() => handleSelect("Todos")}>Todos</p>
          {categorias.map((cat) => (
            <p key={cat} onClick={() =>handleSelect(cat)}>
              {cat}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  
}
