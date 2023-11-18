import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ModalContext = createContext({});

export function useModal() {
  return useContext(ModalContext);
}

function ModalContextProvider({ children }) {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (loginVisible) {
      navigate("/login");
    } else if (registerVisible) {
      navigate("/register");
    } else {
      let pathname = location.pathname;
      let search = location.search;
      navigate(
        pathname === "/login" || pathname === "/register" || !user
          ? "/"
          : pathname + search
      );
    }
  }, [loginVisible, registerVisible]);

  const value = {
    loginVisible,
    setLoginVisible,
    registerVisible,
    setRegisterVisible,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalContextProvider;
