import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalContext = createContext({});

export function useModal() {
  return useContext(ModalContext);
}

function ModalContextProvider({ children }) {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginVisible) {
      navigate("/login");
    } else if (registerVisible) {
      navigate("/register");
    } else {
      navigate("/");
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
