import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Js/Home";
import Cadastro from "../pages/Js/Cadastro";
import Login from "../pages/Js/Login";
import Perfil from "../pages/Js/Perfil";

const router = createBrowserRouter([

    { path: "/", element: <Home /> },
    { path: "/cadastro", element: <Cadastro /> },
    { path: "/login", element: <Login /> },
    { path: "/perfil", element: <Perfil /> },

])

export default router;