
import { createContext, useState, useEffect } from "react";
import { fetchNewAccessToken } from "../api/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true); // wait for refresh token check

  useEffect(() => {
    const rehydrate = async () => {
      try {
        const {accessToken,role} = await fetchNewAccessToken(); // 👈 call your function
        const user_id = JSON.parse(atob(accessToken.split('.')[1]))?._id;
        const name = JSON.parse(atob(accessToken.split('.')[1]))?.name;

        setAuth({ user_id, accessToken, role, name });
      } catch (err) {
        console.log("No valid refresh token found.");
        setAuth({}); // empty auth
      } finally {
        setLoading(false);
      }
    };

    rehydrate();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
