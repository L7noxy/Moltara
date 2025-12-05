import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // informações do usuário
  const [isLoggedIn, setIsLoggedIn] = useState(false); // status de login
  const [loadingUser, setLoadingUser] = useState(true);

  // Carrega o usuário automaticamente ao abrir a aplicação
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/usuario/me",
          { withCredentials: true }
        );

        if (response.data) {
          setUser(response.data);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUser();
  }, []);

  // Login usando sessões
  const login = async (email, senha) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuario/login",
        { email, senha },
        { withCredentials: true }
      );

      // Armazena o nome do usuário
      localStorage.setItem("userName", response.data.nome);

      // Atualiza o contexto
      setUser({ nome: response.data.nome, role: response.data.role });
      setIsLoggedIn(true);

      return { success: true, role: response.data.role };
    } catch (error) {
      return { success: false, message: "Credenciais inválidas" };
    }
  };

  // Logout usando sessões
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/usuario/logout",
        {},
        { withCredentials: true }
      );
    } catch {}

    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loadingUser,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext deve ser usado dentro de um GlobalContextProvider"
    );
  }

  return context;
};
