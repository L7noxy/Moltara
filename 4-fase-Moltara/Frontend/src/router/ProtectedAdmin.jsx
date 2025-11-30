import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function ProtectedAdmin({ children }) {
  const [autorizado, setAutorizado] = useState(null);

  useEffect(() => {
    const verificar = async () => {
      try {
        await axios.get("http://localhost:3000/api/admin/perfil");
        setAutorizado(true);
      } catch {
        setAutorizado(false);
      }
    };
    verificar();
  }, []);

  if (autorizado === null) return <p>Carregando...</p>;

  if (autorizado === false) {
    window.location.href = "/loginAdm";
    return null;
  }

  return children;
}
