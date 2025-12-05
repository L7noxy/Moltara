
import Navbar from "../../components/Js/Navbar.jsx";
import CardProduto from "../../components/Js/CardProduto.jsx";
import Carrosel from "../../components/Js/Carrosel.jsx";
import Footer from "../../components/Js/Footer.jsx";
import "../Css/Home.css";
import "../Css/GlobalStyle.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="container-home">
        <Navbar />
        <div>
          <div>


            <Carrosel />
          </div>
          <CardProduto />
          <Footer />
        </div>
      </div>
    </>
  );
}
