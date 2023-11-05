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
      role: "USER",
    });

    setLoaded(true);
  }, []);

  async function login(email, password) {
    return new Promise((resolve, reject) => {
      // Make API call for login 
      fetch('api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email,
              password: password,
          }),
      })
      .then(response => {
          const contentType = response.headers.get('content-type');

          if (contentType && contentType.includes('application/json')) {
              return response.json(); // Parse JSON response
          } else {
              return response.text(); // Get text response
          }
      })
      .then(data => {
          let messages = [];

          if (Array.isArray(data.errors)) {
              const errorMessages = data.errors.map(error => error.msg);
              messages = errorMessages;
          } else if (data.message || data.error) {
              const messageArray = [data.message, data.error].filter(Boolean);
              messages = messageArray;
          }

          if (data.user) {
              const u = data.user;
              setUser({ id: u._id, name: u.name + " " + u.surname, role: 'USER' });
          }

          resolve(messages);
      })
      .catch(error => {
          console.error('ERR:', error);
          reject(['An error occurred.']); // Return an error message
      })
  });
  }

  const value = {
    isLoaded,
    user,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
