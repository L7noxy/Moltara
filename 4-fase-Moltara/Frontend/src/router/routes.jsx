import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Js/Home";
import Cadastro from "../pages/Js/Cadastro";
import Login from "../pages/Js/Login";
import Perfil from "../pages/Js/Perfil";
import Carrinho from "../pages/Js/Carrinho";
import Confirmacao from "../pages/Js/Confirmacao";
import ProdutoDetalhada from "../pages/Js/ProdutoDetalhada";
import Pagamento from "../pages/Js/Pagamento";

const router = createBrowserRouter([

    { path: "/", element: <Home /> },
    { path: "/cadastro", element: <Cadastro /> },
    { path: "/login", element: <Login /> },
    { path: "/perfil", element: <Perfil /> },
    { path: "/carrinho", element: <Carrinho /> },
    { path: "/confirmacao", element: <Confirmacao /> },    
    { path: "/pagamento", element: <Pagamento /> },
    { path: "/produtoDetalhada", element: <ProdutoDetalhada /> },

])

export default router;