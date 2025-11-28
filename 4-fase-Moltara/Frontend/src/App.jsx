import Home from "./pages/js/Home.css";
import "./pages/Css/GlobalStyle.css";
import { AuthProvider } from "./context/Auth.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </>
  );
};

export default App;
