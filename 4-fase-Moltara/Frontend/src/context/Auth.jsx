import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    const usersStorage = localStorage.getItem("user_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("user_db"));
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "Email ou senha incorretos";
      }
    } else {
      return "Usuário nao encontrado";
    }
  };

  const signup = () => {
    const usersStorage = JSON.parse(localStorage.getItem("user_db"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Usuário ja cadastrado";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("user_db", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    localStorage.removeItem("user_token");
    setUser(null);
  };

  return (
    <AuthProvider.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthProvider.Provider>
  );
};
