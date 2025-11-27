import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Js/Home.jsx";
import Cadastro from "../pages/Js/Cadastro.jsx";
import Login from "../pages/Js/Login.jsx";
import Perfil from "../pages/Js/Perfil.jsx";
import Carrinho from "../pages/Js/Carrinho.jsx";
import Confirmacao from "../pages/Js/Confirmacao.jsx";
import ProdutoDetalhada from "../pages/Js/ProdutoDetalhada.jsx";
import Pagamento from "../pages/Js/Pagamento.jsx";
import CriarProduto from "../pages/Js/CriarProduto.jsx";
import EstoqueProduto from "../pages/Js/EstoqueProduto.jsx";
import PerilAdm from "../pages/Js/PerilAdm.jsx";

import PainelDeControle from "../pages/Js/PainelDeControle.jsx";

const router = createBrowserRouter([

    { path: "/", element: <Home />},

    { path: "/cadastro", element: <Cadastro /> },
    { path: "/login", element: <Login /> },
    { path: "/perfil", element: <Perfil /> },

    { path: "/carrinho", element: <Carrinho /> },
    { path: "/confirmacao", element: <Confirmacao /> },
    { path: "/pagamento", element: <Pagamento /> },

    { path: "/produtoDetalhada", element: <ProdutoDetalhada /> },
    { path: "/produtoDetalhada/:id", element: <ProdutoDetalhada /> },

    { path: "/criarProduto", element: <CriarProduto /> },
    { path: "/estoque", element: <EstoqueProduto /> },
    { path: "/perilAdm", element: <PerilAdm/>},
    { path: "/painelDeControle", element: <PainelDeControle/> },

])

export default router;