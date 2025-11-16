import react, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const Adicionar = (product) => {
        setCart((prevCart) => {

            const existeItem = prevCart.find((item) => item.id === product.id);

            if(existeItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantidade: 1 }];
            }
        })
    };

    const removerIten = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }

    return (
        <CartContext.Provider value={{ cart, Adicionar, removerIten, getTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);