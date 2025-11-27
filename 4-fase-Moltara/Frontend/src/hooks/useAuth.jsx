import React, { useState, useEffect, useContext, createContext } from 'react';

const TOKEN_KEY = 'jwtToken'; 
const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    // Endpoint base
    const API_URL = 'http://localhost:3000/api/auth';

    useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem(TOKEN_KEY);
            setIsAuthenticated(false);
        }
    }, [token]);

    // Funções de Ação

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                return { success: true, message: 'Login bem-sucedido.' };
            } else {
                return { success: false, error: data.error || 'Credenciais inválidas.' };
            }
        } catch (error) {
            return { success: false, error: 'Erro de conexão com o servidor.' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token); 
                return { success: true, message: 'Registro bem-sucedido.' };
            } else {
                return { success: false, error: data.error || 'Erro ao registrar usuário.' };
            }
        } catch (error) {
            return { success: false, error: 'Erro de conexão com o servidor.' };
        }
    };

    const logout = () => {
        setToken(null);
    };

    const value = {
        token,
        isAuthenticated,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};