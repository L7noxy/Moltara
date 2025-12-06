import { createBrowserRouter } from "react-router-dom";

// Imports de páginas de usuários
import Home from "../pages/Js/Home.jsx";
import Cadastro from "../pages/Js/Cadastro.jsx";
import Login from "../pages/Js/Login.jsx";
import Perfil from "../pages/Js/Perfil.jsx";
import PaginaResultados from "../pages/Js/PaginaResultados.jsx";

// imports de páginas relacionadas com o carrinho
import Carrinho from "../pages/Js/Carrinho.jsx";
import Confirmacao from "../pages/Js/Confirmacao.jsx";
import ProdutoDetalhada from "../pages/Js/ProdutoDetalhada.jsx";
import Pagamento from "../pages/Js/Pagamento.jsx";

// Imports de páginas de administrador
import CriarProduto from "../pages/Js/CriarProduto.jsx";
import EstoqueProduto from "../pages/Js/EstoqueProduto.jsx";
import PerilAdm from "../pages/Js/PerilAdm.jsx";
import PainelDeControle from "../pages/Js/PainelDeControle.jsx";
import ProtectedAdmin from "./ProtectedAdmin.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/pesquisa", element: <PaginaResultados /> },

  // Páginas do usuário
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/login", element: <Login /> },
  { path: "/perfil", element: <Perfil /> },

  // Páginas do carrinho
  { path: "/carrinho", element: <Carrinho /> },
  { path: "/confirmacao", element: <Confirmacao /> },
  { path: "/pagamento", element: <Pagamento /> },

  // Páginas do produto
  { path: "/produtoDetalhada", element: <ProdutoDetalhada /> },
  { path: "/produtoDetalhada/:id", element: <ProdutoDetalhada /> },

  // Páginas do administrador
  {
    path: "/criarProduto",
    element: (
      <ProtectedAdmin>
        <CriarProduto />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/estoque",
    element: (
      <ProtectedAdmin>
        <EstoqueProduto />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/perfilAdm",
    element: (
      <ProtectedAdmin>
        <PerilAdm />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/painelDeControle",
    element: (
      <ProtectedAdmin>
        <PainelDeControle />
      </ProtectedAdmin>
    ),
  },
]);

export default router;
