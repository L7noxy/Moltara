import "../Css/Confirmacao.css";
import { FaClipboardUser } from "react-icons/fa6";
import Navbar from "../../components/Js/Navbar";
import Nav_confirm from "../../components/Js/Nav_confirm";
import { Link } from "react-router";

export default function Confirmacao() {

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

              </div>

            </div>
            <div className="resumo-compra">
              <div className="infos-compra">
                <h2>Resumo da compra </h2>
                <p>Quantidade de produtos: 4 </p>
                <p>Valor do subtotal: $723,24 </p>
                <p>valor total: $723,24 </p>
                <p></p>
              </div>
              <div className="botoes-compra">
                <button className="pagamento">Forma de pagamento</button>
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
