import React, { createContext, useState, useEffect, useContext } from "react";

const TOKEN_KEY = "jwtToken";
const API_URL = "http://localhost:3000/api/auth";

// 1. O Contexto em si
export const GlobalContext = createContext(null);

// 2. O Provedor (GlobalContextProvider)
export const GlobalContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        return { success: true, message: "Login bem-sucedido." };
      } else {
        return {
          success: false,
          error: data.error || "Credenciais inválidas.",
        };
      }
    } catch (error) {
      return { success: false, error: "Erro de conexão com o servidor." };
    }
  };
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        return { success: true, message: "Registro bem-sucedido." };
      } else {
        return {
          success: false,
          error: data.error || "Erro ao registrar usuário.",
        };
      }
    } catch (error) {
      return { success: false, error: "Erro de conexão com o servidor." };
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  const value = {
    token,
    isAuthenticated,
    userId,
    login,
    register,
    logout,
  };

  return (
    <GlobalContext.Provider value={value}> {children} </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);


  if (context === null) {
    throw new Error(
      "useGlobalContext deve ser usado dentro de um GlobalContextProvider"
    );
  }

  return context;
};
