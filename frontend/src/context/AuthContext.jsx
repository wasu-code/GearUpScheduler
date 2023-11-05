import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      id: 1,
      name: "Test",
      roles: ["ADMIN", "USER"],
    });

    setLoaded(true);
  }, []);

  const value = {
    isLoaded,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
