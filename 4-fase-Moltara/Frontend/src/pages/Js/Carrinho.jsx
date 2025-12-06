import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Js/Navbar";
import Footer from "../../components/Js/Footer";
import "../Css/Carrinho.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function Carrinho() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalValue = cart.reduce((acc, item) => {
    return acc + (item.preco || 0) * item.quantity;
  }, 0);

  return (
    <div className="container-carrinho">
      <Navbar />
      
      {cart.length === 0 ? (
          <div className="empty-cart-message">
              <h2>Seu carrinho está vazio.</h2>
              <Link to="/" className="back-to-shop">Voltar as compras</Link>
          </div>
      ) : (
      <div className="itens-da-compra">
        <div className="lista-produtos">
          <h1>Carrinho</h1>
          <hr />
          
          <div className="produtos-carrinho">
            {cart.map((item) => (
              <div key={item._id} className="produto">
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <img src={item.imagemUrl} alt={item.nome} />
                    <div className="info-produto">
                        <h3>{item.nome}</h3>
                        <p>Quantidade: {item.quantity}</p>
                        <p className="preco-produto">R$ {(item.preco || 0).toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="deletar-produto-btn"
                >
                    <FaTrash />
                </button>
                <hr />
              </div>
            ))}
          </div>
          
           <div className="actions-carrinho">
                <button onClick={clearCart} className="limpar-carrinho-btn">Limpar Carrinho</button>
           </div>
        </div>

        <div className="resumo-da-compra">
          <div className="infos-resumo-compra">
            <h2>Resumo do Pedido</h2>
            <br />
            <p>
              <span>Subtotal:</span>
              <span>R$ {totalValue.toFixed(2).replace('.', ',')}</span>
            </p>
            <p>
              <span>Frete:</span>
              <span>Grátis</span>
            </p>
            <hr />
            <p style={{fontWeight: 'bold', fontSize: '1.2em'}}>
               <span>Total:</span>
               <span>R$ {totalValue.toFixed(2).replace('.', ',')}</span>
            </p>
          </div>

          <div className="botoes-resumo-compra">
              <button className="comprar" style={{backgroundColor: '#000', cursor: 'pointer'}}>Finalizar Compra</button>
              <Link to="/" style={{textAlign: 'center', display: 'block', textDecoration: 'none', color: '#000', border: '1px solid #000', backgroundColor: 'transparent'}}>
                  Continuar comprando
              </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
