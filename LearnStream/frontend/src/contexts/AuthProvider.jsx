import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({}); // initially empty

  // Load from localStorage once on app start
  useEffect(() => {
    const storedMeta = localStorage.getItem("userMeta"); // safer than storing accessToken
    if (storedMeta) {
      const parsed = JSON.parse(storedMeta);
      setAuth(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
