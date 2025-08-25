import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home.jsx';
import Login from "../pages/Login.jsx";

const router = createBrowserRouter([

    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },

])

export default router;