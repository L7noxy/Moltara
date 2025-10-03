import React, { useEffect, useState } from "react";
import "./LiquidGlass.css";

export default function LiquidGlass() {
  const [data, setData] = useState({ title: "", text: "", button: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="glass">
      <h1>{data.title}</h1>
      <p>{data.text}</p>
      <button>{data.button}</button>
    </div>
  );
}
