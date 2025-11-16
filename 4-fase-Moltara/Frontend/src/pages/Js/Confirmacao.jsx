import { Link } from "react-router";
import Navbar from "../../components/Js/Navbar.jsx";
import Nav_confirm from "../../components/Js/Nav_confirm.jsx";
import "../Css/Confirmacao.css";
import { FaClipboardUser } from "react-icons/fa6";
import { BsBasket2Fill } from "react-icons/bs";

export default function Confirmacao() {

  const produtos_confirmacao = [
    { 
      id: 1, 
      nome: "Produto 1", 
      preco: 100.00 
    },
    { 
      id: 2, 
      nome: "Produto 2", 
      preco: 200.00 
    },
    { 
      id: 3, 
      nome: "Produto 3", 
      preco: 150.00 
    },
    { 
      id: 4, 
      nome: "Produto 4", 
      preco: 273.24 
    }
  ]

  return (
    <div>
      <Navbar />
      <div className="container-confirm">
        <div className="produtos-confirm">
          <Nav_confirm />
          <div className="container-itens-produtos-confirm">
            <div className="itens-confirm">
              <div className="dados-cliente">
                <h2><FaClipboardUser color="#BB2630" />Dados Pessoais</h2>
                <p>Nome: Gabriel Castanhel</p>
                <p>Endereço: Rua Exemplo, 123</p>
                <p>Telefone: (11) 91234-5678</p>
                <p>Email: gabriel@example.com</p>
              </div>

              <div className="lista-compras">
                <h2><BsBasket2Fill color="#BB2630" />Lista de Compras</h2>
                <div className="itens-compras">
                  <ul>
                    {produtos_confirmacao.map((produtos) => (
                      <div className="produto">
                        <img src="./img/cadeira.png" alt="" />
                        <button className="deletar-produto">Remover</button>
                        <p>{produtos.nome}</p>
                        <p>{produtos.preco}</p>

                        <hr />
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
            <div className="resumo-compra">
              <div className="infos-compra">
                <h2> Resumo da compra </h2>
                <p>Quantidade de produtos: 4 </p>
                <p>Valor do subtotal: $723,24 </p>
                <p>valor total: $723,24 </p>
                <p></p>
              </div>
              <div className="botoes-compra">
                <Link to="/pagamento"><button className="pagamento">Forma de pagamento</button></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="">

        </div>

      </div>
    </div>
  );
}
