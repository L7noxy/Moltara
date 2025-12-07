import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { isLoggedIn } = useGlobalContext();

  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCart([]);
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/api/cart/buscarCompra", {
        withCredentials: true,
      });
      const backendItems = response.data && response.data.items ? response.data.items : [];
      
      const mappedCart = backendItems.map(item => {
        const prod = item.produto || {};
        return {
          ...prod,
          _id: prod._id,
          quantity: item.quantidade
        };
      }).filter(item => item._id);

      const uniqueCart = mappedCart.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t._id === item._id
        ))
      );

      setCart(uniqueCart);
      
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  async function addToCart(productId, quantity = 1) {
    if (!isLoggedIn) {
      alert("Faça login para adicionar ao carrinho.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart/adicionar",
        { produtoId: productId, quantidade: quantity },
        { withCredentials: true }
      );

      // Mapeia os dados do backend (items) para o formato que o frontend espera (flat)
      const backendItems = response.data && response.data.items ? response.data.items : [];
      
      const mappedCart = backendItems.map(item => {
        // item = { _id, produto: { ... }, quantidade }
        // Se produto for null (deletado), tratar
        const prod = item.produto || {};
        return {
          ...prod,
          _id: prod._id, // Garante que o ID principal seja do produto
          quantity: item.quantidade
        };
      }).filter(item => item._id); // Remove itens sem produto associado

      // Remove duplicatas (caso o backend tenha sujado o banco)
      const uniqueCart = mappedCart.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t._id === item._id
        ))
      );

      setCart(uniqueCart);
      return true;
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar ao carrinho");
      return false;
    }
  }

  async function removeFromCart(productId) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/cart/remover/${productId}`,
        { withCredentials: true }
      );
      
      const backendItems = response.data && response.data.items ? response.data.items : [];
      
      const mappedCart = backendItems.map(item => {
        const prod = item.produto || {};
        return {
          ...prod,
          _id: prod._id,
          quantity: item.quantidade
        };
      }).filter(item => item._id);

      const uniqueCart = mappedCart.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t._id === item._id
        ))
      );

      setCart(uniqueCart);
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
    }
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
