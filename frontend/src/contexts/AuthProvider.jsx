import { createContext, useState } from "react";

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
  const stored = localStorage.getItem("auth");
  return stored ? JSON.parse(stored) : {};
});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;