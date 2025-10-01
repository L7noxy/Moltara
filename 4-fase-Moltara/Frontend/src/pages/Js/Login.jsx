import React, { useState } from "react";
// 1. Importe os ícones do olho
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Css/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // 2. Adicione o estado para controlar a visibilidade
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login:", { username, password });
    };

    return (
        <div className="container-login">
            <div className="login-wrapper">
                <h2>Welcome</h2>
                <div className="login-avatar"></div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* 3. Bloco da senha modificado */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"} // Muda o tipo dinamicamente
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* Ícone que alterna a visibilidade */}
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit" className="btn-login">
                        LOGIN
                    </button>
                </form>

                <div className="login-links">
                    <Link to="/forgot-password">Forgot Username / Password?</Link>
                    <Link to="/signup">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;