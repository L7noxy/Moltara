import { useCart } from "../../context/CartContext";

export default function Carrinho() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h1>Carrinho</h1>

      {cart.length === 0 && <p>Seu carrinho está vazio.</p>}

      {cart.map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <h3>{item.nome}</h3>
          <p>Quantidade: {item.quantity}</p>
          <p>Preço: R$ {item.preco}</p>

          <button onClick={() => removeFromCart(item._id)}>
            Remover
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={clearCart}>Limpar Carrinho</button>
      )}
    </div>
  );
}
