
import Navbar from "../../components/Js/Navbar.jsx";
import CardProduto from "../../components/Js/CardProduto.jsx";
import Carrosel from "../../components/Js/Carrosel.jsx";
import Footer from "../../components/Js/Footer.jsx";
import "../Css/GlobalStyle.css";

export default function Home() {
  return (
    <>
      <div className="container-home">
        <Navbar />
        <div>
          <Carrosel />
        </div>
        <div>
          <CardProduto />
        </div>
        <Footer />
      </div>
    </>
  );
}
